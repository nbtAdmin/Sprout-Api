let NODE_ENV = "dev";
let MONGO_URI =
  "mongodb://okarimdev:1234qwer@ds161285.mlab.com:61285/backend-api-dev";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "develop"
) {
  console.log(`loading config for environment: ${process.env.NODE_ENV}`);
  NODE_ENV = process.env.NODE_ENV;
  MONGO_URI = process.env.MONGO_URI;
}

export const PROPERTIES = {
  NODE_ENV: NODE_ENV,
  MONGO_URI: MONGO_URI,
  PORT: process.env.PORT || 8080
};
