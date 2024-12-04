export interface CatsRepository {
  get(): Promise<string[]>;

  add(cat: string): Promise<void>;
}

export const CatsRepositoryToken = 'CatsRepositoryToken';
