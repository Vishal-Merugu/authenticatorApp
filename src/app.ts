import express, { Request, Response } from "express";
import session from "express-session";
import MonogoStore from "connect-mongo";

import UserRoutes from "./modules/user/routes";

import ENV from "./utils/validateEnv";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: ENV.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MonogoStore.create({
      mongoUrl: ENV.MONGO_URL,
      collectionName: "usersessions",
    }),
  })
);

app.use("/api/user", UserRoutes);

export default app;
