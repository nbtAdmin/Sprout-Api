import {
  controller,
  httpPost,
  request,
  response,
  httpGet,
  requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import {
  TYPES_SERVICE,
  TYPES_PROCESSORS
} from "../config/ioc/Inversify.type.defs";
import { Request, Response } from "express";
import { IEventDTO } from "../data/domain/IEventDTO";
import { HTTP_STATUS } from "../util/HttpStatus";
import { Event } from "../data/entities/Event";
import { EventProcessor } from "../processors/EventProcessor";

@controller("/events")
export class EventController {
  @inject(TYPES_PROCESSORS.EventProcessor)
  private readonly _eventProcessor: EventProcessor;

  @httpPost("/create-new-event")
  public async createNewEvent(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const newEvent: IEventDTO = { name: req.body.eventName };
      const createdEvent = await this._eventProcessor.createNewEvent(newEvent);
      return res.status(HTTP_STATUS.OK).json(createdEvent);
    } catch (err) {
      console.log(err);
    }
  }

  @httpGet("/get-all-events-db")
  public async getAllEvents(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const events: Event[] = await this._eventProcessor.getAllEventsDB();
      return res.status(HTTP_STATUS.OK).json(events);
    } catch (err) {
      console.log(err);
    }
  }

  @httpGet("/get-events-location/:location/:limit")
  public async getEventsByLocations(
      @request() req: Request, @requestParam("location") location: String, 
      @requestParam("limit") limit: String, @response() res: Response
  ) {
    try {
      const events = await this._eventProcessor.getEventsByLocation(
        location,
        limit
      );
      return res.status(HTTP_STATUS.OK).json(events);
    } catch (err) {
      console.log(err);
    }
  }

  @httpGet("/get-events-location-time/:location/:start/:limit")
  public async getEventsByLocationTime(
    @request() req: Request,
    @requestParam("location") location: String,
    @requestParam("start") startTimeISO: String,
    @requestParam("limit") limit: String,
    @response() res: Response
  ) {
    try {
      const events = await this._eventProcessor.getEventsByLocationStartDate(
        location,
        startTimeISO,
        limit
      );
      return res.status(HTTP_STATUS.OK).json({events: events.events});
    } catch (err) {
      console.log(err);
    }
  }
}
