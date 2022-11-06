import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from '../../movie/models/movie.model';
import { Company } from './company.models';

@ObjectType()
export class CompaniesOnMovies {
  @Field()
  movieId: string;

  @Field()
  companyId: string;

  @Field(() => Movie)
  movie: Movie;

  @Field(() => Company)
  company: Company;
}
