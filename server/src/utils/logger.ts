
// logger.ts

const logger = {
    info: (...args: any[]) => {
      if (process.env.NODE_ENV !== 'test') {
        console.info(...args);
      }
    },
    error: (...args: any[]) => {
      if (process.env.NODE_ENV !== 'test') {
        console.error(...args);
      }
    }
  };
  
  export default logger;
  