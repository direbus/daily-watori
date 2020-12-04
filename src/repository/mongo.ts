import { Collection, Db } from 'mongodb';

export abstract class MongoRepository<T> {
  public constructor(
    protected readonly collectionName: string,
    protected readonly db: Db,
  ) {}

  protected get collection(): Collection<T> {
    return this.db.collection<T>(this.collectionName);
  }
}
