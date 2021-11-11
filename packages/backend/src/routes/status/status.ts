import { RouteShorthandOptions } from "fastify";
import { FastifyRoutesService } from "../../services/fastify-routes-service";

const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          backendVersion: {
            type: "string",
          },
        },
      },
    },
  },
};

export const status = () => {
  FastifyRoutesService.get("/status", options, async (request, reply) => {
    reply
      .status(200)
      .send({ status: "OK", backendVersion: process.env.npm_package_version });
  });
};
