import { NodeSdk } from "@effect/opentelemetry";
import {
  ConsoleSpanExporter,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
// TODO: Implement example with Jaeger
// import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

export const OpenTelemetryLive = NodeSdk.layer(() => ({
  resource: { serviceName: "hello-world-2" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
}));
