import "reflect-metadata";
import {
  controller,
  httpGet,
  request,
  response,
  httpPost
} from "inversify-express-utils";
import { Request, Response } from "express";

@controller("/health")
export class HealthCheckController {
  @httpGet("/version")
  public getApiVersion() {
    const apiversion = {
      version: "1.0.0"
    };
    return apiversion;
  }

  @httpGet("/heartbeat")
  public getHeartBeat(@request() req: Request, @response() res: Response) {
    const data = {
      headers: req.headers,
      address: req.connection.remoteAddress
    };
    return data;
  }
}
