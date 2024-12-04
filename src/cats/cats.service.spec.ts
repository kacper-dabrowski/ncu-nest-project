import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

import { InMemoryCatsRepository } from './repository/cats.repository';
import { CatsRepository, CatsRepositoryToken } from './cats.types';

describe('CatsService', () => {
  let service: CatsService;
  let repository: CatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: CatsRepositoryToken, useClass: InMemoryCatsRepository },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<CatsRepository>(CatsRepositoryToken);
  });

  it('should get all cats', async () => {
    repository.add('Puszek');
    repository.add('Filemon');

    const cats = await service.getAllCats();

    expect(cats).toEqual(['Puszek', 'Filemon']);
  });
});
