import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma.service';

const mappedJob = {
  DIRECTOR: '監督',
  WRITER: '脚本',
  PHOTOGRAPHER: '撮影',
  PRODUCER: '製作',
} as const;

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async findAllJobs() {
    return await this.prisma.job.findMany();
  }

  async createJobs() {
    const jobsData = [
      { name: mappedJob.DIRECTOR },
      { name: mappedJob.WRITER },
      { name: mappedJob.PHOTOGRAPHER },
      { name: mappedJob.PRODUCER },
    ];

    const jobs = [];
    for (const { name } of jobsData) {
      const newJobs = this.prisma.job.create({
        data: {
          id: uuidV4(),
          name,
        },
      });
      jobs.push(newJobs);
    }
    return await this.prisma.$transaction(jobs);
  }
}
