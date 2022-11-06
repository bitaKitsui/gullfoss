import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCrewInput {
  @Field()
  name: string;
}
