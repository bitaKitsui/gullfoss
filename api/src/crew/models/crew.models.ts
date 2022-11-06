import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';

@ObjectType()
export class Crew {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  job: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [Movie], { nullable: true })
  movies: Movie[] | null;
}
