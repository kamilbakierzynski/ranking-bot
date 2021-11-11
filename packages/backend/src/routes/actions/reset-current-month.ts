import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { ActionsService } from "../../services/actions-service";

export const resetCurrentMonth = () => {
  FastifyRoutesService.get("/actions/reset/month", async (request, reply) => {
    await ActionsService.handleResetCurrentMonth();
    return reply.status(200).send({ status: "OK" });
  });
};
