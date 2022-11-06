import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Country } from './country.models';

@ObjectType()
export class CountriesOnMovies {
  @Field()
  moviesId: string;

  @Field()
  countryId: string;

  @Field(() => Movie)
  movie: Movie;

  @Field(() => Country)
  country: Country;
}
