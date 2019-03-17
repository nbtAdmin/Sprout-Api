import * as mongoose from "mongoose";
import { PROPERTIES } from "../properties/Properties";

export class DatabaseConnection {
  constructor() {}

  public async initConnection(): Promise<void> {
    mongoose.connect(
      PROPERTIES.MONGO_URI,
      { useNewUrlParser: true },
      (err: any) => {
        if (err) console.log(err);
        else console.log(`Successfully Connected to Database`);
      }
    );
  }
}
