import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrewService } from './crew.service';
import { Crew } from './models/crew.models';
import { CreateCrewInput } from './models/create-crew-input';
import { UpdateCrewInput } from './models/update-crew-input';

@Resolver()
export class CrewResolver {
  constructor(private crewService: CrewService) {}

  @Query(() => [Crew])
  async findAllCrew() {
    return this.crewService.findAllCrew();
  }

  @Mutation(() => Crew)
  async createCrew(
    @Args('createCrewInput', { type: () => CreateCrewInput })
    createCrewInput: CreateCrewInput,
  ) {
    return this.crewService.createCrew(createCrewInput);
  }

  @Mutation(() => [Crew])
  async createCrewSeeds() {
    return this.crewService.createCrewSeeds();
  }

  @Mutation(() => Crew)
  async updateCrewById(
    @Args('id') id: string,
    @Args('updateCrewInput') updateCrewInput: UpdateCrewInput,
  ) {
    return this.crewService.updateCrewById(id, updateCrewInput);
  }

  @Mutation(() => Boolean)
  async deleteCrewById(@Args('id') id: string) {
    return this.crewService.deleteCrewById(id);
  }

  @Mutation(() => Boolean)
  async deleteAllCrews() {
    return this.crewService.deleteAllCrews();
  }
}
