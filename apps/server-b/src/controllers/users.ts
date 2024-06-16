import { Layer, Effect, Console } from "effect";
import { get } from "@/services/express";

// Define the main route, IndexRouteLive, as a Layer
export const UsersRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    yield* get("/users/:id", (_, res) =>
      Effect.gen(function* () {
        yield* Console.log("Inside");
        yield* Effect.sleep(5);
        res.json({ message: "Hello World!" });
      }).pipe(Effect.withSpan("span-2"))
    );
  })
);
