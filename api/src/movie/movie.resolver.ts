import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { CreateMovieInput } from './models/create-movie-input';
import { CreateCrewInput } from '../crew/models/create-crew-input';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async findAll() {
    return this.movieService.findAll();
  }

  @Query(() => Movie)
  async findOneById(
    @Args('id')
    id: string,
  ) {
    return this.movieService.findOneById(id);
  }

  @Mutation(() => Movie)
  async create(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
    @Args({ name: 'crews', type: () => [CreateCrewInput] })
    crews: CreateCrewInput[],
  ) {
    return await this.movieService.create(createMovieInput, crews);
  }

  @Mutation(() => [Movie])
  async createSeeds() {
    return this.movieService.createSeeds();
  }

  @Mutation(() => Movie)
  async createDummy() {
    return await this.movieService.createDummy();
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id') id: string,
    @Args({ name: 'title', nullable: true }) title?: string,
    @Args({ name: 'year', nullable: true }) year?: string,
    @Args({ name: 'country', nullable: true }) country?: string,
  ) {
    return this.movieService.updateMovie(id, title, year, country);
  }

  @Mutation(() => Movie)
  async setCrew(
    @Args('movieId') movieId: string,
    @Args('crewId') crewId: string,
  ) {
    return await this.movieService.setCrew(movieId, crewId);
  }

  @Mutation(() => Movie)
  async setCast(
    @Args('movieId') movieId: string,
    @Args('castId') castId: string,
  ) {
    return await this.movieService.setCast(movieId, castId);
  }

  @Mutation(() => Movie)
  async likeMovie(
    @Args('movieId') movieId: string,
    @Args('likeId') likeId: string,
  ) {
    return await this.movieService.likeMovie(movieId, likeId);
  }

  @Mutation(() => Boolean)
  async deleteAll() {
    return this.movieService.deleteAll();
  }

  @Mutation(() => Boolean)
  async deleteOneById(@Args('id') id: string) {
    return this.movieService.deleteOneById(id);
  }
}
