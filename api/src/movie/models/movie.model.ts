import { Field, ObjectType } from '@nestjs/graphql';
import { Crew } from '../../crew/models/crew.models';

@ObjectType()
export class Movie {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  year: string;

  @Field()
  country: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field((type) => [Crew], { nullable: true })
  crews: [Crew];
}