/**
 * @file LeaveRequestCard.test.tsx
 * @description Test suite for the LeaveRequestCard component
 * @module LeaveRequestCard.test
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LeaveRequestCard } from './LeaveRequestCard';

/**
 * @description Test suite for LeaveRequestCard component
 * Tests the component's rendering and interaction capabilities
 */
describe('LeaveRequestCard', () => {
  const request = {
    id: '1',
    name: 'Alice',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    type_of_leave: 'Vacation',
    date_from: '',
    date_to: '',
    reason: '',
  };

  /**
   * @test Tests the approve and reject button click handlers
   */
  it('calls onApprove and onReject when buttons are clicked', async () => {
    const onApprove = vi.fn();
    const onReject = vi.fn();
    render(<LeaveRequestCard request={request} onApprove={onApprove} onReject={onReject} />);

    await userEvent.click(screen.getByLabelText(/approve/i));
    expect(onApprove).toHaveBeenCalledWith('1');

    await userEvent.click(screen.getByLabelText(/reject/i));
    expect(onReject).toHaveBeenCalledWith('1');
  });

  it('disables approve button if already approved', () => {
    render(
      <LeaveRequestCard
        request={{ ...request, status: 'APPROVED' }}
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />
    );
    expect((screen.getByLabelText(/approve/i) as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables reject button if already rejected', () => {
    render(
      <LeaveRequestCard
        request={{ ...request, status: 'REJECTED' }}
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />
    );
    expect((screen.getByLabelText(/reject/i) as HTMLButtonElement).disabled).toBe(true);
  });
}); 