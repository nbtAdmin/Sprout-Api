import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { PROPERTIES } from "../properties/Properties";

export const initDatabaseConnnection = async () => {
  const conn: Connection = await createConnection({
    type: "mongodb",
    useNewUrlParser: true,
    url: PROPERTIES.MONGO_URI,
    ssl: true,
    authSource: "admin",
    entities: [PROPERTIES.DB.DB_ENTITIES],
    subscribers: [PROPERTIES.DB.DB_SUBSCRIBERS],
    migrations: [PROPERTIES.DB.DB_MIGRATIONS]
  });
  if (conn.isConnected) {
    console.log(`Successfully Connected to Database: ${conn.name}`);
  }
  return conn;
};
