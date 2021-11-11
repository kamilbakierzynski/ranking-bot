import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { ActionsService } from "../../services/actions-service";

export const resetCurrentWeek = () => {
  FastifyRoutesService.get("/actions/reset/week", async (request, reply) => {
    await ActionsService.handleResetCurrentWeek();
    return reply.status(200).send({ status: "OK" });
  });
};
