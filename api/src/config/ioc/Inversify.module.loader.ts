import { interfaces } from "inversify";
import {
    TYPES_REPOSITORY,
    TYPES_SERVICE,
    TYPES_EXTERNAL_API,
    TYPES_PROCESSORS
} from "./Inversify.type.defs";
import {
    EventRepository,
    UserRepository
} from "../../data/repositories/RepositoryManager";
import { MongoRepository } from "typeorm";
import { Event } from "../../data/entities/Event";
import { EventService } from "../../data/services/EventService";
import { YelpApiConsumer } from "../../data/external/YelpApiConsumer";
import { EventProcessor } from "../../processors/EventProcessor";
import { EventbriteApiConsumer } from "../../data/external/EventbriteApiConsumer";
import { AuthProcessor } from "../../processors/AuthProcessor";
import { User } from "../../data/entities/User";
import { UserService } from "../../data/services/UserService";
import { UserProcessor } from "../../processors/UserProcessor";
import { DataAggregationProcessor } from "../../processors/data/DataAggregationProcessor";
import { RenderProcessor } from "../../processors/templates/RenderProcessor";

export const asyncLoadControllers = async (): Promise<void> => {
    await require("../../controllers/HealthCheckController");
    await require("../../controllers/EventController");
    await require("../../controllers/AuthenticationController");
    await require("../../controllers/UserController");
    await require("../../controllers/SearchController");
    await require("../../controllers/TemplateController");
};

export const loadRepositories = (bind: interfaces.Bind) => {
    bind<MongoRepository<Event>>(TYPES_REPOSITORY.EventRepository)
        .toDynamicValue(() => {
            return EventRepository();
        })
        .inRequestScope();

    bind<MongoRepository<User>>(TYPES_REPOSITORY.UserRepository)
        .toDynamicValue(() => {
            return UserRepository();
        })
        .inRequestScope();
};

export const loadServices = (bind: interfaces.Bind) => {
    bind<EventService>(TYPES_SERVICE.EventService).to(EventService);
    bind<UserService>(TYPES_SERVICE.UserService).to(UserService);
};

export const loadExternalApiConsumers = (bind: interfaces.Bind) => {
    bind<YelpApiConsumer>(TYPES_EXTERNAL_API.YelpApiConsumer).to(
        YelpApiConsumer
    );
    bind<EventbriteApiConsumer>(TYPES_EXTERNAL_API.EventbriteApiConsumer).to(
        EventbriteApiConsumer
    );
};

export const loadProcessors = (bind: interfaces.Bind) => {
    bind<AuthProcessor>(TYPES_PROCESSORS.AuthProcessor).to(AuthProcessor);
    bind<EventProcessor>(TYPES_PROCESSORS.EventProcessor).to(EventProcessor);
    bind<UserProcessor>(TYPES_PROCESSORS.UserProcessor).to(UserProcessor);
    bind<DataAggregationProcessor>(
        TYPES_PROCESSORS.DataAggregationProcessor
    ).to(DataAggregationProcessor);
    bind<RenderProcessor>(TYPES_PROCESSORS.RenderProcessor).to(RenderProcessor);
};
