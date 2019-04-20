import { getMongoRepository, MongoRepository } from "typeorm";

import { Event } from "../entities/Event";
import { User } from "../entities/User";

export const EventRepository = (): MongoRepository<Event> => {
  return getMongoRepository(Event);
};

export const UserRepository = ():MongoRepository<User> => {
  return getMongoRepository(User);
}