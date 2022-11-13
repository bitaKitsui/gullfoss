import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findAllCompanies() {
    return await this.prisma.company.findMany();
  }

  async createCompany(name: string) {
    return await this.prisma.company.create({
      data: {
        id: uuidV4(),
        name,
      },
    });
  }

  async createCompanySeeds() {
    const seedsData = [{ name: '東映' }, { name: 'Fox' }, { name: 'ゴーモン' }];

    const companies = [];
    for (const seed of seedsData) {
      const newCompanies = this.prisma.company.create({
        data: {
          id: uuidV4(),
          name: seed.name,
        },
      });
      companies.push(newCompanies);
    }
    return await this.prisma.$transaction(companies);
  }
}
