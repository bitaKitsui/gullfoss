import { Module } from '@nestjs/common';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [MovieResolver, MovieService, PrismaService],
})
export class MovieModule {}
