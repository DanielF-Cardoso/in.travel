import fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./middlewares/error-handler";
import { env } from "./config/env";
import { tripRoutes } from "./routes/v1/tripRoutes";
import { participantsRoutes } from "./routes/v1/participantsRoutes";
import { activitiesRoutes } from "./routes/v1/activitiesRoutes";
import { linksRoutes } from "./routes/v1/linksRoutes";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(tripRoutes);
app.register(participantsRoutes);
app.register(activitiesRoutes);
app.register(linksRoutes);

app.listen({ port: env.API_PORT }).then(() => {
  console.log("Server is running on port " + env.API_PORT);
});
