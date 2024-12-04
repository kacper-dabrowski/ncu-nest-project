import { Injectable } from '@nestjs/common';
import { CatsRepository } from '../cats.types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InMemoryCatsRepository implements CatsRepository {
  private collection: string[] = [];

  async get(): Promise<string[]> {
    return this.collection;
  }

  async add(cat: string) {
    this.collection.push(cat);
  }
}

@Injectable()
export class MongodbCatsRepository implements CatsRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}
  async add(cat: string): Promise<void> {
    await this.prismaSerivce.cat.create({
      data: {
        name: cat,
      },
    });
  }

  async get(): Promise<string[]> {
    const cats = await this.prismaSerivce.cat.findMany();

    console.log(cats);

    return cats.map((c) => c.name);
  }
}
