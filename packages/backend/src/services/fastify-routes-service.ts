import {
  FastifyInstance,
  RouteHandlerMethod,
  RouteOptions,
  RouteShorthandOptions,
} from "fastify";
import { FastifyServerService } from "./fastify-server-service";

export class FastifyRoutesService {
  private static instance: FastifyRoutesService;
  private fastifyInstance: FastifyInstance;
  private delcaredRoutes: Record<string, string>[];

  private constructor(fastifyInstance: FastifyInstance) {
    this.fastifyInstance = fastifyInstance;
    this.delcaredRoutes = [];
  }

  public static getInstance(): FastifyRoutesService {
    if (!FastifyRoutesService.instance) {
      const fastifyInstance = FastifyServerService.getInstance().getServer();
      FastifyRoutesService.instance = new FastifyRoutesService(fastifyInstance);
    }
    return FastifyRoutesService.instance;
  }

  public static getDeclaredRoutes(): Record<string, string>[] {
    return FastifyRoutesService.getInstance().delcaredRoutes;
  }

  public static route(routeDeclaration: RouteOptions): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    instance.fastifyInstance.route(routeDeclaration);
    instance.delcaredRoutes.push({
      method: JSON.stringify(routeDeclaration.method),
      path: routeDeclaration.url,
    });
    return instance;
  }

  public static get(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static get(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static get(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.get(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.get(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "GET", path });
    return instance;
  }

  public static head(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static head(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static head(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.head(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.head(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "HEAD", path });
    return instance;
  }

  public static post(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static post(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static post(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.post(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.post(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "POST", path });
    return instance;
  }

  public static put(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static put(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static put(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.put(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.put(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "PUT", path });
    return instance;
  }

  public static delete(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static delete(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static delete(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.delete(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.delete(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "DELETE", path });
    return instance;
  }

  public static options(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static options(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static options(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.options(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.options(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "OPTIONS", path });
    return instance;
  }

  public static patch(
    path: string,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static patch(
    path: string,
    opts: RouteShorthandOptions,
    handler: RouteHandlerMethod
  ): FastifyRoutesService;
  public static patch(
    path: string,
    paramTwo?: RouteShorthandOptions | RouteHandlerMethod,
    paramThree?: RouteHandlerMethod
  ): FastifyRoutesService {
    const instance = FastifyRoutesService.getInstance();
    if (!paramThree) {
      instance.fastifyInstance.patch(path, paramTwo as RouteHandlerMethod);
    } else {
      instance.fastifyInstance.patch(
        path,
        paramTwo as RouteShorthandOptions,
        paramThree
      );
    }
    instance.delcaredRoutes.push({ method: "PATCH", path });
    return instance;
  }
}
