import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  year: string;

  @Field(() => Int)
  runtime: number;
}
