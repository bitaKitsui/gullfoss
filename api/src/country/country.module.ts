import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CountryService, CountryResolver, PrismaService],
})
export class CountryModule {}
