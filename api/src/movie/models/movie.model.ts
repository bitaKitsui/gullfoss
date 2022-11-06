import { Field, Int, ObjectType } from '@nestjs/graphql';
import { List } from '../../list/models/list.models';
import { CrewsOnMovies } from '../../crew/models/crewsOnMovies.models';
import { CastsOnMovies } from '../../cast/models/castsOnMovies.models';
import { CompaniesOnMovies } from '../../company/models/companiesOnMovies.models';
import { CountriesOnMovies } from '../../country/models/countriesOnMovies.models';

@ObjectType()
export class Movie {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  year: string;

  @Field(() => Int)
  runtime: number;

  @Field(() => Boolean)
  isWatched: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [CrewsOnMovies], { nullable: true })
  crews: [CrewsOnMovies] | null;

  @Field(() => [CastsOnMovies], { nullable: true })
  casts: [CastsOnMovies] | null;

  @Field(() => [List], { nullable: true })
  lists: [List] | null;

  @Field(() => [CompaniesOnMovies], { nullable: true })
  companies: [CompaniesOnMovies] | null;

  @Field(() => [CountriesOnMovies], { nullable: true })
  countries: [CountriesOnMovies] | null;
}
