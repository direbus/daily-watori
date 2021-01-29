import { Db, MongoClient } from 'mongodb';

/**
 * Utility function to connect to a MongoDB server
 * and return the corresponding database.
 *
 * Note: Environment variables should be populated before calling this function!
 * @return {Db} MongoDB database
 */
export async function getDb(): Promise<Db> {
  if (
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_HOST ||
    !process.env.DB_PORT
  ) {
    throw new Error('Database information has not been set');
  }

  const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

  const dbClient = await MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  return dbClient.db(process.env.DB_NAME);
}
