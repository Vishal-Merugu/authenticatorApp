import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_URL: str(),
  SESSION_SECRET_KEY: str(),
});
