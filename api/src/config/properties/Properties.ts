let NODE_ENV = "dev";
let MONGO_URI =
  "mongodb://okarimdev:1234qwer@ds161285.mlab.com:61285/backend-api-dev";
let INSTANCE_ID: any = -1;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  NODE_ENV = process.env.NODE_ENV;
  MONGO_URI = process.env.MONGO_URI;
  INSTANCE_ID = process.env.INSTANCE;
}

export const PROPERTIES = {
  NODE_ENV: NODE_ENV,
  MONGO_URI: MONGO_URI,
  INSTANCE_ID: INSTANCE_ID,
  PORT: process.env.PORT || 8080
};
