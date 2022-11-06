import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateMovieInput } from './models/create-movie-input';
import { UpdateMovieInput } from './models/update-movie-input';
import { count } from 'rxjs';

const INCLUDE = {
  crews: {
    include: { crew: { include: { jobs: { include: { job: true } } } } },
  },
  casts: { include: { cast: true } },
  companies: { include: { company: true } },
  countries: { include: { country: true } },
};

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.movie.findMany({
      include: INCLUDE,
    });
  }

  async findWatchedMovies() {
    return await this.prisma.movie.findMany({
      where: { isWatched: true },
      include: INCLUDE,
    });
  }

  async findUnWatchedMovies() {
    return await this.prisma.movie.findMany({
      where: { isWatched: false },
      include: INCLUDE,
    });
  }

  async findOneById(id: string) {
    const result = this.prisma.movie.findUnique({
      where: { id },
      include: { crews: true, casts: true },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async create(createMovieInput: CreateMovieInput) {
    const { title, year, runtime } = createMovieInput;
    return this.prisma.movie.create({
      data: {
        id: uuidV4(),
        title,
        year,
        runtime,
        isWatched: true,
      },
    });
  }

  async createSeeds() {
    const seedsData = [
      { title: '東京物語', year: '1956', runtime: 98, isWatched: true },
      { title: '駅馬車', year: '1939', runtime: 100, isWatched: false },
      {
        title: 'ゲームの規則',
        year: '1939',
        runtime: 120,
        isWatched: true,
      },
      {
        title: 'ドライブマイカー',
        year: '2022',
        runtime: 180,
        isWatched: true,
      },
      { title: 'スリ', year: '1965', runtime: 90, isWatched: false },
    ];

    const movies = [];
    for (const seed of seedsData) {
      const newMovies = this.prisma.movie.create({
        data: {
          id: uuidV4(),
          title: seed.title,
          year: seed.year,
          runtime: seed.runtime,
          isWatched: seed.isWatched,
        },
      });
      movies.push(newMovies);
    }
    return await this.prisma.$transaction(movies);
  }

  async updateMovie(id: string, updateMovieInput: UpdateMovieInput) {
    const { title, year, runtime } = updateMovieInput;
    return await this.prisma.movie.update({
      where: { id },
      data: {
        title: title ? title : undefined,
        year: year ? year : undefined,
        runtime: runtime ? runtime : undefined,
      },
    });
  }

  async setCrew(movieId: string, crewId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    const crew = await this.prisma.crew.findUnique({
      where: { id: crewId },
    });

    if (!movie || !crew) throw new NotFoundException();

    return await this.prisma.crewsOnMovies.create({
      data: {
        crewId: crew.id,
        movieId: movie.id,
      },
      include: { movie: true, crew: true },
    });
  }

  async setCast(movieId: string, castId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    const cast = await this.prisma.cast.findUnique({
      where: { id: castId },
    });

    if (!movie || !cast) throw new NotFoundException();

    return await this.prisma.castsOnMovies.create({
      data: {
        castId: cast.id,
        movieId: movie.id,
      },
      include: { movie: true, cast: true },
    });
  }

  async addList(movieId: string, listId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    const list = await this.prisma.list.findUnique({
      where: { id: listId },
    });

    if (!movie || !list) throw new NotFoundException();

    return await this.prisma.listsOnMovies.create({
      data: {
        listId: list.id,
        movieId: movie.id,
      },
      include: { movie: true, list: true },
    });
  }

  async setCompany(movieId: string, companyId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!movie || !company) throw new NotFoundException();

    return await this.prisma.companiesOnMovies.create({
      data: {
        movieId: movie.id,
        companyId: company.id,
      },
      include: { movie: true, company: true },
    });
  }

  async setCountry(movieId: string, countryId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    });

    if (!movie || !country) throw new NotFoundException();

    return await this.prisma.countriesOnMovies.create({
      data: {
        movieId: movie.id,
        countryId: country.id,
      },
      include: { movie: true, country: true },
    });
  }

  async deleteOneById(id: string) {
    await this.prisma.movie.delete({ where: { id } });
    return true;
  }

  async deleteAll() {
    await this.prisma.movie.deleteMany();
    return true;
  }
}
