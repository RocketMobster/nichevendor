/**
 * @file linkUtils.ts
 * @description Helper functions for working with links in the application.
 * Handles path prefixing for GitHub Pages deployment.
 */

/**
 * Returns a path with the correct base path for the current environment
 * In production (GitHub Pages), this prepends '/nichevendor'
 * In development, it leaves the path unchanged
 * 
 * @param path The path to format
 * @returns The formatted path with appropriate base path
 */
export function getPath(path: string): string {
  // In development or when not specified, use the path as is
  const basePath = process.env.NODE_ENV === 'production' ? '/nichevendor' : '';
  
  // Ensure path starts with / for consistent concatenation
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}

/**
 * Checks if a URL is external (absolute)
 * 
 * @param url The URL to check
 * @returns True if the URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || 
         url.startsWith('https://') || 
         url.startsWith('//');
}
