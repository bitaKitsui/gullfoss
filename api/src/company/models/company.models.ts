import { Field, ObjectType } from '@nestjs/graphql';
import { CompaniesOnMovies } from './companiesOnMovies.models';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [CompaniesOnMovies], { nullable: true })
  movies: [CompaniesOnMovies] | null;
}
