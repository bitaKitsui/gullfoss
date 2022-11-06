import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CastService } from './cast.service';
import { Cast } from './models/cast.models';

@Resolver()
export class CastResolver {
  constructor(private castService: CastService) {}

  @Query(() => [Cast])
  async findAllCasts() {
    return await this.castService.findAllCasts();
  }

  @Mutation(() => [Cast])
  async createCastSeeds() {
    return await this.castService.createCastSeeds();
  }

  @Mutation(() => Cast)
  async likeCast(
    @Args('castId') castId: string,
    @Args('likeId') likeId: string,
  ) {
    return await this.castService.likeCast(castId, likeId);
  }
}
