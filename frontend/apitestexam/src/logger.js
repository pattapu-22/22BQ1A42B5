import axios from 'axios';

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = [
  'api', 'component', 'hook', 'page', 'state', 'style', // Frontend
  'auth', 'config', 'middleware', 'utils' // Shared
];

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmJxMWE0MmI1QHZ2aXQubmV0IiwiZXhwIjoxNzU0MDI4NDcwLCJpYXQiOjE3NTQwMjc1NzAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0ZmZkZmI5Zi0xMDk5LTQ3MjItYTIwYy04OTQwY2I2ZDBiZTUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwYXR0YXB1IHZlbmthdGVzd2FyYW1tYSIsInN1YiI6Ijc3MWQyYzgzLTc2NjQtNDZjNi1hNjNhLTkyNmI1MzhkMWRlYSJ9LCJlbWFpbCI6IjIyYnExYTQyYjVAdnZpdC5uZXQiLCJuYW1lIjoicGF0dGFwdSB2ZW5rYXRlc3dhcmFtbWEiLCJyb2xsTm8iOiIyMmJxMWE0MmI1IiwiYWNjZXNzQ29kZSI6IlBuVkJGViIsImNsaWVudElEIjoiNzcxZDJjODMtNzY2NC00NmM2LWE2M2EtOTI2YjUzOGQxZGVhIiwiY2xpZW50U2VjcmV0IjoiS0hFQnZVSGpFZ1hwcERoeSJ9.PBKOOXalpvVoGaZW0I7mMw2sWF2ozgxqaE7Dv69n0ls'; // Replace with actual token from auth API

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