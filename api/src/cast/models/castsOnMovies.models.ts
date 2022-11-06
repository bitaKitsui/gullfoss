import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Cast } from './cast.models';

@ObjectType()
export class CastsOnMovies {
  @Field()
  movieId: string;

  @Field()
  castId: string;

  @Field(() => Movie)
  movie: Movie;

  @Field(() => Cast)
  cast: Cast;
}
