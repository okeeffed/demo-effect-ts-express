import { Layer, Effect, Console } from "effect";
import * as Http from "@effect/platform/HttpClient";
import { get } from "@/services/express";

// Define the main route, IndexRouteLive, as a Layer
export const UsersRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    yield* get("/users/:id", (_, res) =>
      Effect.gen(function* () {
        yield* Console.log("Inside");
        const result = yield* Http.request
          .get(`http://localhost:3002/users/1`)
          .pipe(Http.client.fetchOk, Http.response.json, Effect.timeout(1000));
        return res.json(result);
      }).pipe(Effect.withSpan("span-1"))
    );
  })
);
