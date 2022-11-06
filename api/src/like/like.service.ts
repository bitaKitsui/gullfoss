import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async findAllLikes() {
    return await this.prisma.like.findMany();
  }

  async findLikeById(id: string) {
    const result = await this.prisma.like.findUnique({
      where: { id },
      include: { movies: true, crews: true, casts: true },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async createLike() {
    return await this.prisma.like.create({
      data: {
        id: uuidV4(),
      },
    });
  }
}
