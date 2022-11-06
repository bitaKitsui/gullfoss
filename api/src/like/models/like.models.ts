import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Crew } from '../../crew/models/crew.models';
import { Cast } from '../../cast/models/cast.models';

@ObjectType()
export class Like {
  @Field()
  id: string;

  @Field(() => [Movie], { nullable: true })
  movies: Movie[];

  @Field(() => [Crew], { nullable: true })
  crews: Crew[];

  @Field(() => [Cast], { nullable: true })
  casts: Cast[];
}
