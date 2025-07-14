/**
 * @file appConfig.ts
 * @description Central configuration file for application-wide constants and settings.
 * Contains version information, branding, and other global constants.
 */

// Import version from package.json to ensure it's always in sync
import packageJson from '../package.json';

/**
 * Application version, imported from package.json
 * Updates automatically when version is bumped with npm version command
 */
export const APP_VERSION = packageJson.version;

/**
 * Application branding and metadata constants
 * Used throughout the application for consistent display of company information
 */
export const APP_NAME = 'NicheVendor CRM';
export const COPYRIGHT_YEAR = '2025';
export const COMPANY_NAME = 'RocketMobster Software';
