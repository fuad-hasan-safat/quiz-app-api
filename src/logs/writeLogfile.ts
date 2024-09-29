import { writeFile, appendFile, existsSync } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const appendFileAsync = promisify(appendFile);

export default async function logmessage(message: string) {
  const logFilePath = 'src/logs/logs/access.log'; // Replace with your desired log file path

  try {
    if (!existsSync(logFilePath)) {
      await writeFileAsync(logFilePath, ''); // Create the file if it doesn't exist
    }

    await appendFileAsync(logFilePath, `${message}\n`, { encoding: 'utf8' });
    console.log('Message logged successfully.');
  } catch (error) {
    console.error('Error logging message:', error);
  }
}