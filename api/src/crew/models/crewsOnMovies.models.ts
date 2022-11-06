import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Crew } from './crew.models';

@ObjectType()
export class CrewsOnMovies {
  @Field()
  movieId: string;

  @Field()
  crewId: string;

  @Field(() => Movie)
  movie: Movie;

  @Field(() => Crew)
  crew: Crew;
}
