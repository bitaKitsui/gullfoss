import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field()
  id: string;

  @Field()
  name: string;
}
