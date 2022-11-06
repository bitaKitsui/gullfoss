import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';

@ObjectType()
export class Cast {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [Movie], { nullable: true })
  movies: Movie[] | null;
}
