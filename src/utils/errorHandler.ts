import { toast } from '@/hooks/use-toast';

export class ErrorHandler {
  static handle(error: any, context: string) {
    console.error(`Error in ${context}:`, error);
    
    const errorMessage = this.getErrorMessage(error);
    
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
    
    // Log error for debugging
    this.logError(error, context);
  }

  private static getErrorMessage(error: any): string {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  }

  private static logError(error: any, context: string) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      context,
      error: error.message || 'Unknown error',
      stack: error.stack,
    };
    
    const existingErrors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    existingErrors.push(errorLog);
    localStorage.setItem('errorLogs', JSON.stringify(existingErrors));
  }
}