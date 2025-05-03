/**
 * @file ui5.config.ts
 * @description SAPUI5 Web Components global configuration file
 * Sets language and theme for all UI5 components in the app.
 * @module ui5.config
 */
import { setLanguage } from '@ui5/webcomponents-base/dist/config/Language.js';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';

// Configure SAP UI5
setLanguage('en');
setTheme('sap_horizon'); 