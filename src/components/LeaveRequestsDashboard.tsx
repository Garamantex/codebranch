/**
 * @component LeaveRequestsDashboard
 * @description Main dashboard component for managing leave requests. Features filtering, sorting, pagination, and approval/rejection actions.
 * @returns {React.FC} A React functional component that renders the leave requests dashboard
 */
import React, { useEffect, useState } from 'react';
import {
  FlexBox,
  FlexBoxDirection,
  Card,
  Title,
  BusyIndicator,
} from '@ui5/webcomponents-react';
import { LeaveRequestCard } from './LeaveRequestCard';
import { LeaveRequest } from './leave-requests.types';
import { PaginationControls } from './PaginationControls';
import { FiltersBar } from './FiltersBar';
import '@/styles/leave-requests.css';

const STATUS_OPTIONS = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' }
];

const statusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return '#107e3e';
    case 'REJECTED':
      return '#bb0000';
    case 'PENDING':
    default:
      return '#e9730c';
  }
};

export const LeaveRequestsDashboard: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/hello?page=${page}&limit=${limit}&status=${statusFilter}`);
        const result = await res.json();
        if (res.ok) {
          setLeaveRequests(result.data);
          setTotal(result.total);
        } else {
          setError(result.error || 'Error fetching data');
          setLeaveRequests([]);
          setTotal(0);
        }
      } catch (error) {
        setLeaveRequests([]);
        setTotal(0);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, sortOrder]);

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );

    if (statusFilter !== 'ALL' && statusFilter !== newStatus) {
      setLeaveRequests((prev) => prev.filter((req) => req.id !== id));
    }

    setPage(1);
  };

  const sortedRequests = [...leaveRequests].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  if (error) {
    return (
      <FlexBox direction={FlexBoxDirection.Column} className="leave-dashboard-main" role="alert" aria-live="assertive">
        <Card className="error-card" aria-label="Error message">
          {error}
        </Card>
      </FlexBox>
    );
  }

  if (loading) {
    return (
      <FlexBox
        direction={FlexBoxDirection.Column}
        className="leave-dashboard-main"
        role="status"
        aria-live="polite"
        aria-label="Loading leave requests"
      >
        <BusyIndicator active aria-label="Loading" />
      </FlexBox>
    );
  }

  return (
    <FlexBox
      direction={FlexBoxDirection.Column}
      className="leave-dashboard-main"
      role="main"
      aria-label="Leave Requests Dashboard"
    >
      <Card className="leave-dashboard-card" aria-label="Leave Requests Section">
        <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 24, padding: '32px 40px 0 40px' }}>
          <Title level="H2" aria-label="Leave Requests Dashboard">Leave Requests Dashboard</Title>
          <div className="leave-dashboard-filters">
            <FiltersBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </FlexBox>
        <div className="leave-dashboard-list" role="region" aria-label="Leave Requests List">
          {sortedRequests.map((req) => (
            <div className="leave-dashboard-card" key={req.id} role="listitem" aria-label={`Leave request for ${req.name}`}>
              <LeaveRequestCard
                request={req}
                onApprove={(id) => handleStatusChange(id, 'APPROVED')}
                onReject={(id) => handleStatusChange(id, 'REJECTED')}
                className="leave-dashboard-card-content"
              />
            </div>
          ))}
          <div className="leave-dashboard-pagination">
            <PaginationControls
              page={page}
              total={total}
              limit={limit}
              loading={loading}
              onPageChange={setPage}
            />
          </div>
        </div>
      </Card>
    </FlexBox>
  );
}; 