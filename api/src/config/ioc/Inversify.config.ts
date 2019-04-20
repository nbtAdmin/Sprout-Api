import { AsyncContainerModule, interfaces } from "inversify";
import {
  asyncLoadControllers,
  loadRepositories,
  loadServices,
  loadExternalApiConsumers,
  loadProcessors
} from "./Inversify.module.loader";
import { initDatabaseConnnection } from "../database/DatabaseConnection";

export const bindings = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    try {
      await initDatabaseConnnection();
      await asyncLoadControllers();
      loadRepositories(bind);
      loadServices(bind);
      loadExternalApiConsumers(bind);
      loadProcessors(bind);
    } catch (err) {
      console.log(err);
    }
  }
);
