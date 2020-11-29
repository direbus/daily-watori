import { EntityManager, EntityRepository } from 'typeorm';
import { User } from '../entity/user';

@EntityRepository()
export class UserRepository {
  public constructor(private readonly manager: EntityManager) {}

  public getUsersOfInterest = async (): Promise<User[]> => {
    return this.manager.connection
      .createQueryBuilder()
      .select('name')
      .from(User, 'user')
      .execute();
  }
}
