import { Context } from 'elysia';
import { writeFile, appendFile, existsSync } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const appendFileAsync = promisify(appendFile);

export async function logmessage(message: string) {
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

export async function errorLogmessage(message: string) {
  const logFilePath = 'src/logs/logs/error.log'; // Replace with your desired log file path

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

export function saveErrorMessage(headers: any, error: any, code: any, request: any){
  
  const currentDate = new Date();

  console.log('before error log')
  const host = headers?.host || 'unknown host'; // Fallback if headers or host is undefined
    const userAgent = headers?.["user-agent"] || 'unknown user-agent'; // Fallback if user-agent is undefined

    errorLogmessage(
      `${currentDate.toDateString()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${request.url} HOST: ${host} User-Agent: ${userAgent} ErrorMessage: ${error.message}`,
    );
  console.log('after error log')

  if (code === 'NOT_FOUND') return {
    messege: 'Your requested path  is not found',
  }

  return {
    message: error.message
  }

}