import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MovieModule } from './movie/movie.module';
import { CrewModule } from './crew/crew.module';
import { CastModule } from './cast/cast.module';
import { ListModule } from './list/list.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MovieModule,
    CrewModule,
    CastModule,
    ListModule,
    JobModule,
    CompanyModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
