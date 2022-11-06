import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async findAllLists() {
    return await this.prisma.listsOnMovies.findMany({
      include: { movie: true, list: true },
    });
  }

  async findListById(id: string) {
    return await this.prisma.list.findUnique({
      where: { id },
      include: { movies: true },
    });
  }

  async createList(title: string) {
    return await this.prisma.list.create({ data: { id: uuidV4(), title } });
  }
}
