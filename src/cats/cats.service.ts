import { Inject, Injectable } from '@nestjs/common';
import { CatsRepository, CatsRepositoryToken } from './cats.types';

@Injectable()
export class CatsService {
  constructor(
    @Inject(CatsRepositoryToken)
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllCats() {
    const cats = await this.catsRepository.get();

    return cats;
  }

  async addCat(cat: string) {
    return this.catsRepository.add(cat);
  }
}
