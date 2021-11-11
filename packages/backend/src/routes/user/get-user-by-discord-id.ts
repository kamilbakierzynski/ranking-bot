import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { DatabaseService } from "../../services/database-service";
import { removeMongoFields } from "@ranking-bot/common/src";

export const getUserByDiscordId = () => {
  FastifyRoutesService.get("/user/info/:discordId", async (request, reply) => {
    const { discordId } = request.params as { discordId: string };
    const userEither = await DatabaseService.findUserByDiscordId(discordId);
    if (userEither.isLeft()) {
      return reply
        .status(404)
        .send({ status: "ERROR", error: userEither.left().message });
    }
    const userObject = userEither.right().toJSON();
    const filteredObject = removeMongoFields(userObject, [
      "history",
      "ranking",
    ]);
    return reply.status(200).send({ status: "OK", user: filteredObject });
  });
};
