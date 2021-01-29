import { Collection, Db } from 'mongodb';

/**
 * Repository base class for mongodb
 */
export abstract class MongoRepository<T> {
  public constructor(
    protected readonly collectionName: string,
    protected readonly db: Db,
  ) {}

  /**
   * Returns the corresponding collection for this repository
   *
   * @returns {Collection<T>} Database collection, which you interact with
   */
  protected get collection(): Collection<T> {
    return this.db.collection<T>(this.collectionName);
  }
}
