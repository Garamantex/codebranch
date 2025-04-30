/**
 * @file FiltersBar.test.tsx
 * @description Test suite for the FiltersBar component
 * @module FiltersBar.test
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FiltersBar } from './FiltersBar';

/**
 * @description Test suite for FiltersBar component
 * Tests the component's filtering and sorting capabilities
 */
describe('FiltersBar', () => {
  /**
   * @test Tests the status filter selection functionality
   */
  it('calls setStatusFilter when a status is selected', async () => {
    const setStatusFilter = vi.fn();
    render(
      <FiltersBar
        statusFilter="ALL"
        setStatusFilter={setStatusFilter}
        sortOrder="asc"
        setSortOrder={vi.fn()}
      />
    );
    const pendingButton = screen.getByRole('option', { name: /pending/i });
    await userEvent.click(pendingButton);
    expect(setStatusFilter).toHaveBeenCalledWith('PENDING');
  });

  it('calls setSortOrder when sort button is clicked', async () => {
    const setSortOrder = vi.fn();
    render(
      <FiltersBar
        statusFilter="ALL"
        setStatusFilter={vi.fn()}
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );
    const sortButton = screen.getByLabelText(/sort by date requested/i);
    await userEvent.click(sortButton);
    expect(setSortOrder).toHaveBeenCalledWith('desc');
  });
}); 