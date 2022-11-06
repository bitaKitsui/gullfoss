import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CastService {
  constructor(private prisma: PrismaService) {}

  async findAllCasts() {
    return await this.prisma.castsOnMovies.findMany({
      include: { movie: true, cast: true },
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
