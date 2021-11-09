import { FastifyServerService } from "./services/fastify-server-service";
import { FastifyRoutesService } from "./services/fastify-routes-service";
import { DatabaseService } from "./services/database-service";
import { initializeRoutes } from "./routes";

const main = async () => {
  await DatabaseService.connect();
  const fastifyService = FastifyServerService.getInstance();

  initializeRoutes();

  await fastifyService.startServer();
  console.log(FastifyRoutesService.getDeclaredRoutes());
};

main();
