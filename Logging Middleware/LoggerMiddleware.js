// LoggerMiddleware.js
const logger = (message, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    ...data,
  };
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('logs', JSON.stringify(logs));
};

export default logger;
