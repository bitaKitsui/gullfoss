import { Field, ObjectType } from '@nestjs/graphql';
import { CrewsOnMovies } from './crewsOnMovies.models';
import { JobsOnCrews } from '../../job/models/jobsOnCrews.models';

@ObjectType()
export class Crew {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [CrewsOnMovies], { nullable: true })
  movies: CrewsOnMovies[] | null;

  @Field(() => [JobsOnCrews], { nullable: true })
  jobs: JobsOnCrews[] | null;
}
