import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { ActionsService } from "../../services/actions-service";

export const saveCurrentDay = () => {
  FastifyRoutesService.get("/actions/save/day", async (request, reply) => {
    await ActionsService.handleSaveCurrentDay();
    return reply.status(200).send({ status: "OK" });
  });
};
