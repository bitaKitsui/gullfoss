import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './models/country.models';

@Resolver()
export class CountryResolver {
  constructor(private countryService: CountryService) {}

  @Query(() => [Country])
  async findAllCountries() {
    return await this.countryService.findAllCountries();
  }

  @Mutation(() => [Country])
  async createCountrySeeds() {
    return await this.countryService.createCountrySeeds();
  }
}
