import "reflect-metadata";
import { PROPERTIES } from "./config/properties/Properties";
import { Server } from "./application/Server";

(async () => {
  try {
    const server: Server = new Server();
    server.start(PROPERTIES.PORT, PROPERTIES.NODE_ENV, PROPERTIES.INSTANCE_ID);
  } catch (err) {
    console.log(err);
  }
})();
