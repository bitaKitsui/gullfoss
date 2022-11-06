import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './models/like.models';

@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Query(() => [Like])
  async findAllLikes() {
    return await this.likeService.findAllLikes();
  }

  @Query(() => Like)
  async findLikeById(@Args('id') id: string) {
    return await this.likeService.findLikeById(id);
  }

  @Mutation(() => Like)
  async createLike() {
    return await this.likeService.createLike();
  }
}
