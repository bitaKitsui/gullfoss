import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CastService {
  constructor(private prisma: PrismaService) {}

  async findAllCasts() {
    return await this.prisma.cast.findMany();
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

  async likeCast(castId: string, likeId: string) {
    const cast = await this.prisma.cast.findUnique({ where: { id: castId } });
    const like = await this.prisma.like.findUnique({
      where: { id: likeId },
    });

    if (!cast || !like) throw new NotFoundException();

    return await this.prisma.cast.update({
      where: { id: castId },
      data: {
        likes: { set: [{ id: likeId }] },
      },
    });
  }
}
