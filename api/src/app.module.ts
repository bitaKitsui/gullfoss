import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MovieModule } from './movie/movie.module';
import { CrewModule } from './crew/crew.module';
import { CastModule } from './cast/cast.module';
import { LikeModule } from './like/like.module';

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
    LikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
