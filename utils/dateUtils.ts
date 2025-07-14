/**
 * Formats a date object or string to a readable format
 * @param date - The date to format
 * @param format - The format to use ('short', 'long', or 'relative')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(dateObj);
      
    case 'long':
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(dateObj);
      
    case 'relative':
      const now = new Date();
      const diffInDays = Math.floor(
        (dateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Tomorrow';
      if (diffInDays === -1) return 'Yesterday';
      if (diffInDays > 0 && diffInDays < 7) return `In ${diffInDays} days`;
      if (diffInDays < 0 && diffInDays > -7) return `${Math.abs(diffInDays)} days ago`;
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(dateObj);
  }
}
