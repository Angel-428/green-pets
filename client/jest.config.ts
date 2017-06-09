

import { defaults as tsjPreset } from 'ts-jest/presets';

export default {
  ...tsjPreset,
  testEnvironment: 'jsdom', // alternative? 'node'
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
  },
};