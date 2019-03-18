import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { Application } from "express";
import { App } from "./App";
import { bindings } from "../config/ioc/Inversify.config";
import { DatabaseConnection } from "../config/database/DatabaseConnection";

export class Server {
  private _instance: InversifyExpressServer;
  private _di_container: Container;
  private _app: Application;
  private _db: DatabaseConnection;

  constructor() {
    this._app = new App().getApp();
    this._di_container = new Container();
    this._db = new DatabaseConnection();
  }

  private async _initServer(): Promise<void> {
    await this._di_container.loadAsync(bindings);
    this._instance = new InversifyExpressServer(
      this._di_container,
      null,
      { rootPath: "/api/v1" },
      this._app
    );
  }

  public async start(PORT, NODE_ENV): Promise<void> {
    await this._initServer();
    await this._db.initConnection();
    this._instance.build().listen(PORT, () => {
      console.log(`Application initialized with env: ${NODE_ENV}`);
      console.log(`Server listening on port ${PORT}`);
    });
  }
}
