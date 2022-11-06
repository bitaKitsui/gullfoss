import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './models/job.models';

@Resolver()
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Query(() => [Job])
  async findAllJobs() {
    return await this.jobService.findAllJobs();
  }

  @Mutation(() => [Job])
  async createJobs() {
    return await this.jobService.createJobs();
  }
}
