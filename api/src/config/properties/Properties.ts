let NODE_ENV = "dev";
let MONGO_URI =
    "mongodb+srv://nbtadmin:1234qwer@sproutdev-relu8.mongodb.net/test?retryWrites=true";
let DB_PATHS = {
    entitiesPathTS: "src/data/entities/**/*.ts",
    subscribersPathTS: "src/data/meta/subscribers/**/*.ts",
    migrationsPathTS: "src/data/meta/migrations/**/*.ts",
    entitiesPathJS: "dist/data/entities/**/*.js",
    subscribersPathJS: "dist/data/meta/subscribers/**/*.js",
    migrationsPathJS: "dist/data/meta/migrations/**/*.js"
};

let DB_ENTITIES = DB_PATHS.entitiesPathTS;
let DB_SUBSCRIBERS = DB_PATHS.subscribersPathTS;
let DB_MIGRATIONS = DB_PATHS.migrationsPathTS;

export const DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

export let JWT = {
    ISSUER: process.env.JWT_ISSUER || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXP: process.env.JWT_EXP || 3600000
};

if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
) {
    console.log(`loading config for ${process.env.NODE_ENV} environment`);
    NODE_ENV = process.env.NODE_ENV;
    MONGO_URI = process.env.MONGO_URI;
    DB_ENTITIES = DB_PATHS.entitiesPathJS;
    DB_SUBSCRIBERS = DB_PATHS.subscribersPathJS;
    DB_MIGRATIONS = DB_PATHS.migrationsPathJS;
}

export const PROPERTIES = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: MONGO_URI,
    NODE_ENV: NODE_ENV,
    APP_ROOT_CONTEXT: { rootPath: "/api/v1" },
    DB: {
        DB_ENTITIES: DB_ENTITIES,
        DB_SUBSCRIBERS: DB_SUBSCRIBERS,
        DB_MIGRATIONS: DB_MIGRATIONS
    }
};

//TODO: REMOVE FROM SOURCE BEFORE COMMIT
export const YELP_CONFIG = {
    API_BASE_URL: "",
    CLIENT_ID: process.env.YELP_CLIENT_ID || "",
    API_KEY: process.env.YELP_API_KEY || ""
};

export const EVENTBRITE_CONFIG = {
    API_BASE_URL: "",
    CLIENT_SECRET: process.env.EVENTBRITE_CLIENT_SECRET || "",
    APP_OAUTH_TOKEN: process.env.EVENTBRITE_APP_OAUTH_TOKEN || "",
    ANONYMOUS_OAUTH_TOKEN: process.env.EVENTBRITE_ANONYMOUS_OAUTH_TOKEN || ""
};

export const ZOMATO_CONFIG = {
    API_BASE_URL: "",
    API_KEY: process.env.ZOMATO_API_KEY || ""
};