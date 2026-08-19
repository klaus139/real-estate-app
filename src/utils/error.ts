// 1. Extend the global Error interface so TypeScript globally recognizes these optional properties
declare global {
  interface Error {
    statusCode?: number;
    formatErrors?: () => Array<{ message: string }>;
  }
}
export interface PageCustomError extends Error {
  statusCode: number;
  formatErrors: () => Array<{ message: string }>; 
}

export function createError(message: string, statusCode: number = 400): PageCustomError {
  const error = new Error(message) as PageCustomError;

  error.statusCode = statusCode;
  error.formatErrors = function () { 
    return [{ message: this.message }];
  };
  
  return error;
}
