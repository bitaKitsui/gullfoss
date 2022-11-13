import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { CreateMovieInput } from './models/create-movie-input';
import { UpdateMovieInput } from './models/update-movie-input';
import { ListsOnMovies } from '../list/models/listsOnMovies.models';
import { CrewsOnMovies } from '../crew/models/crewsOnMovies.models';
import { CastsOnMovies } from '../cast/models/castsOnMovies.models';
import { CompaniesOnMovies } from '../company/models/companiesOnMovies.models';
import { CountriesOnMovies } from '../country/models/countriesOnMovies.models';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async findAll() {
    return await this.movieService.findAll();
  }

  @Query(() => [Movie])
  async findWatchedMovies() {
    return await this.movieService.findWatchedMovies();
  }

  @Query(() => [Movie])
  async findUnWatchedMovies() {
    return await this.movieService.findUnWatchedMovies();
  }

  @Query(() => Movie)
  async findOneById(
    @Args('id')
    id: string,
  ) {
    return this.movieService.findOneById(id);
  }

  @Mutation(() => Movie)
  async create(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return await this.movieService.create(createMovieInput);
  }

  @Mutation(() => [Movie])
  async createSeeds() {
    return this.movieService.createSeeds();
  }

  @Mutation(() => Movie)
  async voteMovie(@Args('id') id: string, @Args('vote') vote: number) {
    return await this.movieService.voteMovie(id, vote);
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id') id: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    return this.movieService.updateMovie(id, updateMovieInput);
  }

  @Mutation(() => CrewsOnMovies)
  async setCrew(
    @Args('movieId') movieId: string,
    @Args('crewId') crewId: string,
  ) {
    return await this.movieService.setCrew(movieId, crewId);
  }

  @Mutation(() => CastsOnMovies)
  async setCast(
    @Args('movieId') movieId: string,
    @Args('castId') castId: string,
  ) {
    return await this.movieService.setCast(movieId, castId);
  }

  @Mutation(() => CastsOnMovies)
  async setCasts(
    @Args('movieId') movieId: string,
    @Args('castIds', { type: () => [String] }) castIds: string[],
  ) {
    return await this.movieService.setCasts(movieId, castIds);
  }

  @Mutation(() => ListsOnMovies)
  async addList(
    @Args('movieId') movieId: string,
    @Args('listId') listId: string,
  ) {
    return await this.movieService.addList(movieId, listId);
  }

  @Mutation(() => CompaniesOnMovies)
  async setCompany(
    @Args('movieId') movieId: string,
    @Args('companyId') companyId: string,
  ) {
    return await this.movieService.setCompany(movieId, companyId);
  }

  @Mutation(() => CountriesOnMovies)
  async setCountry(
    @Args('movieId') movieId: string,
    @Args('countryId') countryId: string,
  ) {
    return await this.movieService.setCountry(movieId, countryId);
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
