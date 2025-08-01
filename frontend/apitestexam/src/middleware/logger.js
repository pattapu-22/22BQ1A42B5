import axios from 'axios';

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = [
  'api', 'component', 'hook', 'page', 'state', 'style', // Frontend
  'auth', 'config', 'middleware', 'utils' // Shared
];

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'your_bearer_token'; // Replace with actual token from auth API

async function Log(stack, level, pkg, message) {
  // Validate inputs
  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}. Must be one of ${VALID_STACKS.join(', ')}`);
  }
  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}. Must be one of ${VALID_LEVELS.join(', ')}`);
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg}. Must be one of ${VALID_PACKAGES.join(', ')}`);
  }
  if (!message || typeof message !== 'string') {
    throw new Error('Message must be a non-empty string');
  }

  try {
    const response = await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );
    console.log('Log created:', response.data);
  } catch (error) {
    console.error('Logging failed:', error.message);
    throw error;
  }
}

export default Log;