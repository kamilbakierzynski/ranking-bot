import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { ActionsService } from "../../services/actions-service";

export const resetCurrentYear = () => {
  FastifyRoutesService.get("/actions/reset/year", async (request, reply) => {
    await ActionsService.handleResetCurrentYear();
    return reply.status(200).send({ status: "OK" });
  });
};
