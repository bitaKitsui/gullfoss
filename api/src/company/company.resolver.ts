import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './models/company.models';

@Resolver()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query(() => [Company])
  async findAllCompanies() {
    return await this.companyService.findAllCompanies();
  }

  @Mutation(() => Company)
  async createCompany(@Args('name') name: string) {
    return await this.companyService.createCompany(name);
  }

  @Mutation(() => [Company])
  async createCompanySeeds() {
    return await this.companyService.createCompanySeeds();
  }
}
