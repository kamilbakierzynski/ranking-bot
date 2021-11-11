import { RouteShorthandOptions } from "fastify";
import {
  UserPOST,
  UsersUpdatePost,
} from "@ranking-bot/types/api/users-update-post";
import { FastifyRoutesService } from "../../services/fastify-routes-service";
import { DatabaseService } from "../../services/database-service";
import { User } from "@ranking-bot/types/database/user";
import { Either } from "monet";
import { isPromiseFulfilled } from "@ranking-bot/common/src";

const options: RouteShorthandOptions = {
  schema: {
    body: {
      required: ["users"],
      properties: {
        users: {
          type: "array",
          items: {
            type: "object",
            required: ["discordId", "username", "connected", "onMute"],
            properties: {
              discordId: {
                type: "string",
              },
              username: {
                type: "string",
              },
              connected: {
                type: "number",
              },
              onMute: {
                type: "number",
              },
            },
          },
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
        },
      },
      500: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          error: {
            type: "string",
          },
        },
      },
    },
  },
};
const updateDatabaseUser = (databaseUser: User) => (requestUser: UserPOST) => {
  return {
    ...databaseUser,
    username: requestUser.username,
    avatarUrl: requestUser.avatarUrl,
    lastSeen: Date.now(),
    connected: {
      thisDay: databaseUser.connected.thisDay + requestUser.connected,
      thisWeek: databaseUser.connected.thisWeek + requestUser.connected,
      thisMonth: databaseUser.connected.thisMonth + requestUser.connected,
      thisYear: databaseUser.connected.thisYear + requestUser.connected,
      allTime: databaseUser.connected.allTime + requestUser.connected,
    },
    onMute: {
      thisDay: databaseUser.onMute.thisDay + requestUser.onMute,
      thisWeek: databaseUser.onMute.thisWeek + requestUser.onMute,
      thisMonth: databaseUser.onMute.thisMonth + requestUser.onMute,
      thisYear: databaseUser.onMute.thisYear + requestUser.onMute,
      allTime: databaseUser.onMute.allTime + requestUser.onMute,
    },
  };
};

export const usersUpdate = () => {
  FastifyRoutesService.post(
    "/users/update",
    options,
    async (request, reply) => {
      const { users } = request.body as UsersUpdatePost;
      const resultPromiseMap = users.map(async (requestUser) => {
        const user = await DatabaseService.findOrCreateUser(
          requestUser.discordId
        );
        if (user.isLeft()) {
          return user;
        }
        const databaseUser = user.right();
        const updatedUser = updateDatabaseUser(databaseUser.toObject() as User)(
          requestUser
        );
        databaseUser.set(updatedUser);
        try {
          await databaseUser.save();
          return Either.right(databaseUser);
        } catch (error) {
          return Either.left(
            new Error(
              `Unable to update user with DiscordId: ${requestUser.discordId}`
            )
          );
        }
      });
      const resultMap = (await Promise.allSettled(resultPromiseMap)).filter(
        isPromiseFulfilled
      );
      const errors = resultMap.filter((promise) => promise.value.isLeft());
      if (errors.length > 0) {
        reply
          .status(500)
          .send({ status: "ERROR", error: JSON.stringify(errors) });
      }

      reply.status(200).send({ status: "OK" });
    }
  );
};
