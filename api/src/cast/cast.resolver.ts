import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CastService } from './cast.service';
import { Cast } from './models/cast.models';
import { CastsOnMovies } from './models/castsOnMovies.models';

@Resolver()
export class CastResolver {
  constructor(private castService: CastService) {}

  @Query(() => [CastsOnMovies])
  async findAllCasts() {
    return await this.castService.findAllCasts();
  }

  @Mutation(() => [Cast])
  async createCastSeeds() {
    return await this.castService.createCastSeeds();
  }
}
