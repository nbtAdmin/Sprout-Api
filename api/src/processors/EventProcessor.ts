import { injectable, inject } from "inversify";
import {
  TYPES_SERVICE,
  TYPES_EXTERNAL_API
} from "../config/ioc/Inversify.type.defs";
import { EventService } from "../data/services/EventService";
import { YelpApiConsumer } from "../data/external/YelpApiConsumer";
import { IEventDTO } from "../data/domain/IEventDTO";
import { Event } from "../data/entities/Event";
import { Request, Response } from "express";

@injectable()
export class EventProcessor {
  @inject(TYPES_SERVICE.EventService)
  private readonly _eventService: EventService;

  @inject(TYPES_EXTERNAL_API.YelpApiConsumer)
  private readonly _yelpApiConsumer: YelpApiConsumer;

  public async getAllEventsDB(): Promise<Event[]> {
    return await this._eventService.getAllEvents();
  }

  public async createNewEvent(newEvent: IEventDTO) {
    return await this._eventService.createNewEvent(newEvent);
  }

  public async getEventsByLocation(
    location: String,
    limit: String
  ): Promise<any> {
    return await this._yelpApiConsumer.getEventsByLocation(location, limit);
  }

  public async getEventsByLocationStartDate(
    location: String,
    startTimeISO: String,
    limit: String
  ) {
    return await this._yelpApiConsumer.getEventsByLocationStartTime(
      location,
      startTimeISO,
      limit
    );
  }
}
