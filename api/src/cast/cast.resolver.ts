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

  @Query(() => [Cast])
  async findCastsNoMovies() {
    return await this.castService.findCastsNoMovies();
  }

  @Mutation(() => Cast)
  async createCast(@Args('name') name: string) {
    return await this.castService.createCast(name);
  }

  @Mutation(() => [Cast])
  async createCastSeeds() {
    return await this.castService.createCastSeeds();
  }
}
