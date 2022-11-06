import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Crew } from '../../crew/models/crew.models';
import { Cast } from '../../cast/models/cast.models';

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

  @Field(() => Int)
  runtime: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [Crew], { nullable: true })
  crews: [Crew] | null;

  @Field(() => [Cast], { nullable: true })
  casts: Cast[] | null;
}
