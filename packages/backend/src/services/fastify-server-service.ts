/* eslint-disable no-use-before-define */

import Fastify, { FastifyInstance } from "fastify";

export class FastifyServerService {
  private static instance: FastifyServerService;
  private fastifyInstance: FastifyInstance;
  private readonly port: number;

  private constructor(port: number) {
    this.port = port;
  }

  public static getInstance(port = 3000): FastifyServerService {
    if (!FastifyServerService.instance) {
      FastifyServerService.instance = new FastifyServerService(port);
      FastifyServerService.instance.createFastifyInstance();
    }
    return FastifyServerService.instance;
  }

  private createFastifyInstance() {
    this.fastifyInstance = Fastify({});
  }

  public async startServer() {
    try {
      await this.fastifyInstance.listen(this.port);
      console.log(`Server running on port ${this.port}`);
    } catch (error) {
      this.fastifyInstance.log.error(error);
      process.exitCode = 1;
    }
  }

  public getServer(): FastifyInstance {
    return this.fastifyInstance;
  }
}
