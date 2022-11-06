import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastResolver } from './cast.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CastService, CastResolver, PrismaService],
})
export class CastModule {}
