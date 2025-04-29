import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock CSS modules
vi.mock('@/styles/leave-requests.css', () => ({})); 