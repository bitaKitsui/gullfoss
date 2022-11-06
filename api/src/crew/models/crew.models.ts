import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Crew {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  job: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
