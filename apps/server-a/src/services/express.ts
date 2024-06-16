import { Context, Effect, FiberSet } from "effect";
import express from "express";

// Define Express as a service
export class ExpressService extends Context.Tag("Express")<
  ExpressService,
  express.Application
>() {}

export const get = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* ExpressService;
    const run = yield* FiberSet.makeRuntime<R>();
    app.get(path, (req, res) => run(body(req, res)));
  });
