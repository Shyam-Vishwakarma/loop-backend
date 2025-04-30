import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { validateEnv } from "./utils/validateEnv";

try {
  validateEnv(["TMDB_API_KEY", "ALLOWED_ORIGINS"]);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
