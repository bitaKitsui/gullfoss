import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  year: string;

  @Field()
  country: string;
}
