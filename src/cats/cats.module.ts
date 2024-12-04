import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepositoryToken } from './cats.types';
import { MongodbCatsRepository } from './repository/cats.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CatsService,
    { provide: CatsRepositoryToken, useClass: MongodbCatsRepository },
  ],
  controllers: [CatsController],
})
export class CatsModule {}
