import { Db } from 'mongodb';
import { User } from '../../entity/user';
import { MongoRepository } from './mongo';

/**
 * Repository for handling anything related with tweet objects
 * which is stored on our database. Exclusively implemented
 * for MongoDB.
 */
export class UserRepository extends MongoRepository<User> {
  public constructor(db: Db) {
    super('user', db);
  }

  /**
   * Get all users of interests from the database
   *
   * @returns {Promise<User[]>} List of users of interests
   */
  public getUsersOfInterest = async (): Promise<User[]> => {
    return this.collection
      .find()
      .toArray();
  };

  /**
   * Add a Twitter user to the database, adding it to the watchlist
   *
   * @param {User} user User of interest
   * @returns {Promise<boolean>} A boolean which indicates if insertion is commited successfully
   */
  public addUser = async (user: User): Promise<boolean> => {
    const result = await this.collection
      .insertOne(user);

    return result.result.ok === 1;
  };

  /**
   * Deletes a user from the database, removing them from the watchlist
   *
   * @param {string} name Twitter user's handle
   * @returns {Promise<boolean>} A boolean which indicates if removal is commited succesfully
   */
  public deleteUser = async (name: string): Promise<boolean> => {
    const result = await this.collection
      .deleteOne({ name });

    return result.result.ok === 1;
  };

  /**
   * Check whether a user already exist on the database, or the watchlist
   *
   * @param {string} name Twitter user's handle
   * @returns {Promise<boolean>} A boolean which indicates whether the user already exist
   */
  public isUserExist = async (name: string): Promise<boolean> => {
    const result = await this.collection
      .countDocuments({ name });

    return result === 1;
  };
}
