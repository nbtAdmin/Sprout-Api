export const TYPES = {};

export const TYPES_REPOSITORY = {
    EventRepository: Symbol("EventRepository"),
    UserRepository: Symbol("UserRepository")
};

export const TYPES_SERVICE = {
    EventService: Symbol("EventService"),
    UserService: Symbol("UserService")
};

export const TYPES_PROCESSORS = {
    EventProcessor: Symbol("EventProcessor"),
    AuthProcessor: Symbol("AuthProcessor"),
    UserProcessor: Symbol("UserProcessor"),
    DataAggregationProcessor: Symbol("DataAggregation"),
    RenderProcessor:Symbol("RenderProcessor")
};

export const TYPES_EXTERNAL_API = {
    YelpApiConsumer: Symbol("YelpApiConsumer"),
    EventbriteApiConsumer: Symbol("EventApiConsumer")
};
