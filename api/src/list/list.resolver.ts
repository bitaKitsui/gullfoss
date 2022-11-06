import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListService } from './list.service';
import { List } from './models/list.models';
import { ListsOnMovies } from './models/listsOnMovies.models';

@Resolver()
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query(() => [ListsOnMovies])
  async findAllLists() {
    return await this.listService.findAllLists();
  }

  @Query(() => List)
  async findListById(@Args('id') id: string) {
    return await this.listService.findListById(id);
  }

  @Mutation(() => List)
  async createList(@Args('title') title: string) {
    return await this.listService.createList(title);
  }
}
