import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateMovieInput } from './models/create-movie-input';
import { CreateCrewInput } from '../crew/models/create-crew-input';

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
    const { title, year, country } = createMovieInput;
    return this.prisma.movie.create({
      data: {
        id: uuidV4(),
        title,
        year,
        country,
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
      { title: '東京物語', year: '1956', country: '日本' },
      { title: '駅馬車', year: '1939', country: 'アメリカ' },
      { title: 'ゲームの規則', year: '1939', country: 'フランス' },
    ];

    const movies = [];
    for (const seed of seedsData) {
      const newMovies = this.prisma.movie.create({
        data: {
          id: uuidV4(),
          title: seed.title,
          year: seed.year,
          country: seed.country,
        },
      });
      movies.push(newMovies);
    }
    return await this.prisma.$transaction(movies);
  }

  async createDummy() {
    const crews = [
      { name: '濱口竜介', job: '監督' },
      { name: '佐々木靖之', job: '撮影' },
    ];

    return await this.prisma.movie.create({
      data: {
        id: uuidV4(),
        title: 'ドライブマイカー',
        year: '2022',
        country: '日本',
        crews: {
          create: crews.map((crew) => ({
            id: uuidV4(),
            name: crew.name,
            job: crew.job,
          })),
        },
      },
      include: {
        crews: true,
      },
    });
  }

  async updateMovie(
    id: string,
    title?: string,
    year?: string,
    country?: string,
  ) {
    return await this.prisma.movie.update({
      where: { id },
      data: {
        title: title ? title : undefined,
        year: year ? year : undefined,
        country: country ? country : undefined,
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
