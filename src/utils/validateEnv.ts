import dotenv from "dotenv";

/**
 * Validates that all required environment variables are present
 * @param requiredVars Array of required environment variable names
 * @throws Error if any required variables are missing
 */
export function validateEnv(requiredVars: string[]): void {
  dotenv.config();

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(
      ", "
    )}`;
    throw new Error(errorMessage);
  }
}
