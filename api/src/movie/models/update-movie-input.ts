import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  year: string;

  @Field({ nullable: true })
  country: string;

  @Field(() => Int, { nullable: true })
  runtime: number;
}
