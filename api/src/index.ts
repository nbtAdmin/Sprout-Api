import "reflect-metadata";
import { Server } from "./application/Server";

(async () => {
  try {
    const server: Server = new Server();
    server.start();
  } catch (err) {
    console.log(err);
  }
})();
