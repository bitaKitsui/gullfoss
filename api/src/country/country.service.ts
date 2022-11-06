import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async findAllCountries() {
    return await this.prisma.country.findMany();
  }

  async createCountrySeeds() {
    const seedsData = [
      { name: '日本' },
      { name: 'フランス' },
      { name: 'アメリカ' },
    ];

    const countries = [];
    for (const seed of seedsData) {
      const newCountries = this.prisma.country.create({
        data: {
          id: uuidV4(),
          name: seed.name,
        },
      });
      countries.push(newCountries);
    }
    return await this.prisma.$transaction(countries);
  }
}
