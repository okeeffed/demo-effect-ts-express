import { Layer, Effect } from "effect";
import { ExpressService } from "@/services/express";
import * as usersController from "@/controllers/users";
import express from "express";
import { OpenTelemetryLive } from "@/config/opentelemetry";

// Server Setup
const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const port = 3002;
    const app = yield* ExpressService;
    yield* Effect.acquireRelease(
      Effect.sync(() =>
        app.listen(port, () =>
          console.log(`Example app listening on port ${port}`)
        )
      ),
      (server) => Effect.sync(() => server.close())
    );
  })
);
// Setting Up Express
const ExpressLive = Layer.sync(ExpressService, () => express());

// Combine the layers
const AppLive = ServerLive.pipe(
  Layer.provide(usersController.UsersRouteLive),
  Layer.provide(ExpressLive),
  Layer.provide(OpenTelemetryLive)
);
// Run the program
Effect.runFork(Layer.launch(AppLive));
