import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { DatabaseService } from "../../services/database-service";
import { removeMongoFields } from "@ranking-bot/common/src";

export const getUserHistory = () => {
  FastifyRoutesService.get(
    "/user/history/:discordId",
    async (request, reply) => {
      const { discordId } = request.params as { discordId: string };
      const userEither = await DatabaseService.getUserHistory(discordId);
      if (userEither.isLeft()) {
        return reply
          .status(404)
          .send({ status: "ERROR", error: userEither.left().message });
      }
      const history = userEither
        .right()
        .map((historyItem) => removeMongoFields(historyItem));
      return reply.status(200).send({ status: "OK", history });
    }
  );
};
