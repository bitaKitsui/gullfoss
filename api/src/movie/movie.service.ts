import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateMovieInput } from './models/create-movie-input';
import { CreateCrewInput } from '../crew/models/create-crew-input';
import { UpdateMovieInput } from './models/update-movie-input';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.movie.findMany();
  }

  async findOneById(id: string) {
    const result = this.prisma.movie.findUnique({
      where: { id },
      include: { crews: true, casts: true },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async create(createMovieInput: CreateMovieInput, crews: CreateCrewInput[]) {
    const { title, year, country, runtime } = createMovieInput;
    return this.prisma.movie.create({
      data: {
        id: uuidV4(),
        title,
        year,
        country,
        runtime,
        crews: {
          create: crews.map(({ name, job }) => ({
            id: uuidV4(),
            name,
            job,
          })),
        },
      },
      include: { crews: true },
    });
  }

  async createSeeds() {
    const seedsData = [
      { title: '東京物語', year: '1956', country: '日本', runtime: 98 },
      { title: '駅馬車', year: '1939', country: 'アメリカ', runtime: 100 },
      {
        title: 'ゲームの規則',
        year: '1939',
        country: 'フランス',
        runtime: 120,
      },
    ];

    const movies = [];
    for (const seed of seedsData) {
      const newMovies = this.prisma.movie.create({
        data: {
          id: uuidV4(),
          title: seed.title,
          year: seed.year,
          country: seed.country,
          runtime: seed.runtime,
        },
      });
      movies.push(newMovies);
    }
    return await this.prisma.$transaction(movies);
  }

  async updateMovie(id: string, updateMovieInput: UpdateMovieInput) {
    const { title, year, country, runtime } = updateMovieInput;
    return await this.prisma.movie.update({
      where: { id },
      data: {
        title: title ? title : undefined,
        year: year ? year : undefined,
        country: country ? country : undefined,
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

    return await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        crews: { set: [{ id: crewId }] },
      },
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

    return await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        casts: { set: [{ id: castId }] },
      },
    });
  }

  async likeMovie(movieId: string, likeId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    const like = await this.prisma.like.findUnique({
      where: { id: likeId },
    });

    if (!movie || !like) throw new NotFoundException();

    return await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        likes: { set: [{ id: likeId }] },
      },
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
