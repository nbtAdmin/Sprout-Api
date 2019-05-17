import { injectable, inject } from "inversify";
import { TYPES_REPOSITORY } from "../../config/ioc/Inversify.type.defs";
import { MongoRepository } from "typeorm";
import { Event } from "../entities/Event";
import { IEventDTO } from "../domain/IEventDTO";

@injectable()
export class EventService {
  
  @inject(TYPES_REPOSITORY.EventRepository)
  private readonly _eventRepository: MongoRepository<Event>;

  public async getAllEvents(): Promise<Event[]> {
    return this._eventRepository.find({});
  }

  public async createNewEvent(newEvent: IEventDTO): Promise<Event> {
    const event = new Event();
    event.name = newEvent.name;

    return this._eventRepository.save(event);
  }
}
