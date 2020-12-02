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

  public addUser = async (user: User): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();

    return result.generatedMaps.length === 1;
  }

  public deleteUser = async (name: string): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('name = :name', { name })
      .execute();

    return result.affected === 1;
  }

  public isUserExist = async (name: string): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .select('name')
      .from(User, 'user')
      .where('name = :name', { name })
      .getCount();

    return result === 1;
  }
}
