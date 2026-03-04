import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  // Base recommended config
  js.configs.recommended,
  
  // Main configuration
  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"],
    ignores: [
      "dist/**",
      "node_modules/**",
      "test-results/**",
      "coverage/**",
      "*.config.js",
      "build.js",
      "dev.js"
    ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"]
        }
      },
      globals: {
        // Browser extension globals
        ...globals.browser,
        ...globals.webextensions,
        // Node.js globals for build scripts
        ...globals.node,
        // Jest globals for tests
        ...globals.jest,
        // Additional WebExtension specific
        chrome: "readonly",
        browser: "readonly",
      }
    },
    plugins: {
      prettier: prettier
    },
    rules: {
      // Prettier integration
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      
      // Custom rules
      "no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-var": "error",
      "prefer-const": "error"
    }
  },
  
  // Test files configuration
  {
    files: ["tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        page: "readonly",
        browser: "readonly",
        context: "readonly"
      }
    },
    rules: {
      "no-console": "off" // Allow console in tests
    }
  },
  
  // Configuration files (using CommonJS)
  {
    files: ["*.config.js", "build.js", "dev.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        module: "writable",
        require: "readonly",
        __dirname: "readonly"
      },
      parserOptions: {
        sourceType: "script"
      }
    },
    rules: {
      "no-undef": "off" // Node.js globals are already included
    }
  },
  
  // Prettier's recommended rules (must be last)
  eslintConfigPrettier
]);