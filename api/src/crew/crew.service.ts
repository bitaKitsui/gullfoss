import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateCrewInput } from './models/create-crew-input';
import { UpdateCrewInput } from './models/update-crew-input';

const mappedJob = {
  DIRECTOR: '監督',
  WRITER: '脚本',
  PHOTOGRAPHER: '撮影',
  PRODUCER: '製作',
} as const;

@Injectable()
export class CrewService {
  constructor(private prisma: PrismaService) {}

  async findAllCrew() {
    return await this.prisma.crew.findMany();
  }

  async createCrew(createCrewInput: CreateCrewInput) {
    const { name, job } = createCrewInput;

    const valid = this.isJob(job);

    if (valid) {
      return await this.prisma.crew.create({
        data: {
          id: uuidV4(),
          name,
          job,
        },
      });
    } else {
      throw new BadRequestException();
    }
  }

  async createCrewSeeds() {
    const seedsData = [
      { name: '小津安二郎', job: mappedJob.DIRECTOR },
      { name: 'ジョン・フォード', job: mappedJob.DIRECTOR },
      { name: 'ジャン・ルノワール', job: mappedJob.DIRECTOR },
    ];

    const crews = [];
    for (const seed of seedsData) {
      const newCrews = this.prisma.crew.create({
        data: {
          id: uuidV4(),
          name: seed.name,
          job: seed.job,
        },
      });
      crews.push(newCrews);
    }
    return await this.prisma.$transaction(crews);
  }

  async updateCrewById(id: string, updateCrewInput: UpdateCrewInput) {
    const { name, job } = updateCrewInput;

    const valid = this.isJob(job);

    if (valid) {
      return await this.prisma.crew.update({
        where: { id },
        data: { name: name ? name : undefined, job: job ? job : undefined },
      });
    } else {
      throw new BadRequestException();
    }
  }

  async deleteCrewById(id: string) {
    await this.prisma.crew.delete({ where: { id } });
    return true;
  }

  async deleteAllCrews() {
    await this.prisma.crew.deleteMany();
    return true;
  }

  isJob(job: string | undefined): boolean {
    if (!job) return true;
    return (
      job === mappedJob.DIRECTOR ||
      job === mappedJob.WRITER ||
      job === mappedJob.PHOTOGRAPHER ||
      job === mappedJob.PRODUCER
    );
  }
}
