import { Field, ObjectType } from '@nestjs/graphql';
import { Crew } from '../../crew/models/crew.models';
import { Job } from './job.models';

@ObjectType()
export class JobsOnCrews {
  @Field()
  crewId: string;

  @Field()
  jobId: string;

  @Field(() => Crew)
  crew: Crew;

  @Field(() => Job)
  job: Job;
}
