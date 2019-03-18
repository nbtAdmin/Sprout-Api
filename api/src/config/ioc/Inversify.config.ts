import { AsyncContainerModule, interfaces } from "inversify";
import { asyncLoadControllers } from "./Inversify.module.loader";

export const bindings = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    try {
      await asyncLoadControllers();
    } catch (err) {
      console.log(err);
    }
  }
);
