export const asyncLoadControllers = async (): Promise<void> => {
  await require("../../controllers/HealthCheck/HealthCheckController");
};
