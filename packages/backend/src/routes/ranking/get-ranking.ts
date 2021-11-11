import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { RankingService } from "../../services/ranking-service";
import { RankingRange } from "@ranking-bot/types/api/ranking-range";

export const getRanking = () => {
  FastifyRoutesService.get("/ranking", async (request, reply) => {
    const { range } = request.query as { range: string };
    const ranking = await RankingService.getRanking(range as RankingRange);
    return reply.status(200).send({ status: "OK", ranking });
  });
};
