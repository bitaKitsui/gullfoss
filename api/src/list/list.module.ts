import { Module } from '@nestjs/common';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ListResolver, ListService, PrismaService],
})
export class ListModule {}
