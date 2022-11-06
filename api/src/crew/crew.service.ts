import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateCrewInput } from './models/create-crew-input';
import { UpdateCrewInput } from './models/update-crew-input';

@Injectable()
export class CrewService {
  constructor(private prisma: PrismaService) {}

  async findAllCrew() {
    return await this.prisma.crew.findMany({
      include: {
        movies: { include: { movie: true } },
        jobs: { include: { job: true } },
      },
    });
  }

  async createCrew(createCrewInput: CreateCrewInput) {
    const { name } = createCrewInput;

    return await this.prisma.crew.create({
      data: {
        id: uuidV4(),
        name,
      },
    });
  }

  async createCrewSeeds() {
    const seedsData = [
      { name: '小津安二郎' },
      { name: 'ジョン・フォード' },
      { name: 'ジャン・ルノワール' },
    ];

    const crews = [];
    for (const seed of seedsData) {
      const newCrews = this.prisma.crew.create({
        data: {
          id: uuidV4(),
          name: seed.name,
        },
      });
      crews.push(newCrews);
    }
    return await this.prisma.$transaction(crews);
  }

  async updateCrewById(id: string, updateCrewInput: UpdateCrewInput) {
    const { name } = updateCrewInput;
    return await this.prisma.crew.update({
      where: { id },
      data: { name: name ? name : undefined },
    });
  }

  async setJob(crewId: string, jobId: string) {
    const crew = await this.prisma.crew.findUnique({ where: { id: crewId } });
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });

    if (!crew || !job) throw new NotFoundException();

    return await this.prisma.jobsOnCrews.create({
      data: {
        crewId: crew.id,
        jobId: job.id,
      },
      include: { crew: true, job: true },
    });
  }

  async deleteCrewById(id: string) {
    await this.prisma.crew.delete({ where: { id } });
    return true;
  }

  async deleteAllCrews() {
    await this.prisma.crew.deleteMany();
    return true;
  }
}
