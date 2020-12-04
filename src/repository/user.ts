import { Db } from 'mongodb';
import { User } from '../entity/user';
import { MongoRepository } from './mongo';

export class UserRepository extends MongoRepository<User> {
  public constructor(db: Db) {
    super('user', db);
  }

  public getUsersOfInterest = async (): Promise<User[]> => {
    return this.collection
      .find()
      .toArray();
  }

  public addUser = async (user: User): Promise<boolean> => {
    const result = await this.collection
      .insertOne(user);

    return result.result.ok === 1;
  }

  public deleteUser = async (name: string): Promise<boolean> => {
    const result = await this.collection
      .deleteOne({ name });

    return result.result.ok === 1;
  }

  public isUserExist = async (name: string): Promise<boolean> => {
    const result = await this.collection
      .countDocuments({ name });

    return result === 1;
  }
}
