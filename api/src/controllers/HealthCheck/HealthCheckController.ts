import {
  controller,
  httpGet,
  request,
  response
} from "inversify-express-utils";
import { Request, Response } from "express";
import { PROPERTIES } from "../../config/properties/Properties";

@controller("/health")
export class HealthCheckController {
  @httpGet("/version")
  public getApiVersion() {
    const apiversion = {
      version: "1.0.0"
    };
    return apiversion;
  }

  @httpGet("/hearthbeat")
  public getHeartBeat(@request() req: Request, @response() res: Response) {
    const data = {
      headers: req.headers,
      address: req.connection.remoteAddress
    };
    return data;
  }
}
