import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  year: string;

  @Field(() => Int)
  runtime: number;

  @Field(() => Float, { nullable: true })
  vote: number;
}
