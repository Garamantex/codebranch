import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock CSS modules
vi.mock('@/styles/leave-requests.css', () => ({})); 