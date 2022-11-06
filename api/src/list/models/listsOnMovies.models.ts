import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { List } from './list.models';

@ObjectType()
export class ListsOnMovies {
  @Field()
  movieId: string;

  @Field()
  listId: string;

  @Field(() => Movie)
  movie: Movie;

  @Field(() => List)
  list: List;
}
