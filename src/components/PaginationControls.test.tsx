/**
 * @file PaginationControls.test.tsx
 * @description Test suite for the PaginationControls component
 * @module PaginationControls.test
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PaginationControls } from './PaginationControls';

/**
 * @description Test suite for PaginationControls component
 * Tests the component's navigation and state management
 */
describe('PaginationControls', () => {
  /**
   * @test Tests the page change functionality
   */
  it('calls onPageChange when next/prev is clicked', async () => {
    const onPageChange = vi.fn();
    render(<PaginationControls page={2} total={20} limit={5} loading={false} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText(/previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    await userEvent.click(screen.getByLabelText(/next page/i));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  /**
   * @test Tests the disabled state of the previous button on first page
   */
  it('disables previous button on first page', () => {
    render(<PaginationControls page={1} total={20} limit={5} loading={false} onPageChange={vi.fn()} />);
    expect((screen.getByLabelText(/previous page/i) as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables next button on last page', () => {
    render(<PaginationControls page={4} total={20} limit={5} loading={false} onPageChange={vi.fn()} />);
    expect((screen.getByLabelText(/next page/i) as HTMLButtonElement).disabled).toBe(true);
  });
}); 