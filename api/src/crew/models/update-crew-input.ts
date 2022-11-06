import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCrewInput {
  @Field({ nullable: true })
  name?: string;
}
