import { FastifyRoutesService } from "../services/fastify-routes-service";

export const usersUpdate = () => {
  FastifyRoutesService.post("/users/update", (request, reply) => {
    console.log(request.body);
    reply.status(200).send({ status: "OK" });
  });
};
