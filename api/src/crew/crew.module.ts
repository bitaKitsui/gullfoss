import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';
import { CrewResolver } from './crew.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CrewService, CrewResolver, PrismaService],
})
export class CrewModule {}
