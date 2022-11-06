import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CompanyResolver, CompanyService, PrismaService],
})
export class CompanyModule {}
