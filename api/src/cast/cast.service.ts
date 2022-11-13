import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

const INCLUDE = { movies: { include: { movie: true } } };

@Injectable()
export class CastService {
  constructor(private prisma: PrismaService) {}

  async findAllCasts() {
    return await this.prisma.cast.findMany({
      include: INCLUDE,
    });
  }

  async findCastsNoMovies() {
    return await this.prisma.cast.findMany({
      where: {
        movies: {
          none: {},
        },
      },
      include: INCLUDE,
    });
  }

  async createCast(name: string) {
    return await this.prisma.cast.create({
      data: {
        id: uuidV4(),
        name,
      },
    });
  }

  async createCastSeeds() {
    const seedsData = [{ name: '役所広司' }, { name: 'ジョン・ウェイン' }];

    const casts = [];
    for (const seed of seedsData) {
      const newCasts = this.prisma.cast.create({
        data: {
          id: uuidV4(),
          name: seed.name,
        },
      });
      casts.push(newCasts);
    }
    return await this.prisma.$transaction(casts);
  }
}
