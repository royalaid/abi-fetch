import fs from "fs";
import path from "path";
import logger from "./logger";

/**
 * Saves data to a JSON file
 * @param data The data to save
 * @param filename The name of the file (without extension)
 * @param directory The directory to save the file in (defaults to current directory)
 * @returns The full path to the saved file
 */
export function saveToJsonFile(data: any, filename: string, directory: string = "."): string {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Sanitize filename (remove invalid characters)
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, "_");
    const filePath = path.join(directory, `${sanitizedFilename}.json`);

    // Write the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    logger.info(`Saved ABI to ${filePath}`);
    return filePath;
  } catch (error) {
    logger.error(`Failed to save file: ${error instanceof Error ? error.message : "Unknown error"}`);
    throw error;
  }
}

/**
 * Prompts the user to select from a list of options
 * @param options Array of options to choose from
 * @param prompt The prompt message to display
 * @returns The selected option
 */
export async function promptUserChoice<T>(options: T[], prompt: string): Promise<T> {
  // For now, we'll use a simple console-based approach
  // In a real application, you might want to use a more sophisticated prompt library

  if (options.length === 0) {
    throw new Error("No options provided to choose from");
  }

  logger.info(prompt);

  options.forEach((option, index) => {
    const optionStr = typeof option === "object" && option !== null ? JSON.stringify(option) : String(option);

    logger.info(`${index + 1}. ${optionStr}`);
  });

  // In a real implementation, you would use a proper prompt library
  // For now, we'll just return the first option
  logger.info("Selected first option by default");
  return options[0]!;
}
