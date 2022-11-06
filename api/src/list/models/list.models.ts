import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';

@ObjectType()
export class List {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => [Movie], { nullable: true })
  movies: Movie[] | null;
}
