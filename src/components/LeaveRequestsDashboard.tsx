/**
 * LeaveRequestsDashboard.tsx
 *
 * Main dashboard component for managing leave requests.
 * Features filtering, sorting, pagination, and approval/rejection actions.
 * Built with SAPUI5 Web Components and React.
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
        const res = await fetch(`/api/hello?page=${page}&limit=${limit}`);
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
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, sortOrder]);

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const filteredRequests = statusFilter === 'ALL'
    ? leaveRequests
    : leaveRequests.filter((req) => req.status === statusFilter);

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  if (error) {
    return (
      <FlexBox direction={FlexBoxDirection.Column} style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f3f6fa' }} role="alert" aria-live="assertive">
        <Card style={{ padding: 40, background: '#fff', color: '#bb0000', fontWeight: 600, fontSize: 20 }} aria-label="Error message">
          {error}
        </Card>
      </FlexBox>
    );
  }

  if (loading) {
    return (
      <FlexBox
        direction={FlexBoxDirection.Column}
        style={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f3f6fa'
        }}
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
      style={{ minHeight: '100vh', background: '#f3f6fa', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
      role="main"
      aria-label="Leave Requests Dashboard"
    >
      <Card style={{ maxWidth: 1440, width: '100%', padding: 0, boxShadow: '0 4px 24px #0001', background: '#fff' }} aria-label="Leave Requests Section">
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
        <div className="leave-dashboard-list" style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16, padding: '0 40px 40px 40px' }} role="region" aria-label="Leave Requests List">
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
      <style jsx global>{`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .leave-dashboard-card {
    padding: 16px 4vw !important;
    border-radius: 12px !important;
    max-width: 98vw !important;
    margin-left: auto;
    margin-right: auto;
  }
  .leave-dashboard-main {
    padding: 8px 0 0 0 !important;
  }
  .leave-dashboard-list {
    padding: 0 2vw 16px 2vw !important;
    gap: 12px !important;
  }
  .leave-dashboard-filters {
    flex-direction: column !important;
    gap: 8px !important;
    align-items: stretch !important;
    padding-bottom: 12px !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  }
  .leave-dashboard-filters button {
    width: 100% !important;
    margin-top: 4px;
  }
  .leave-dashboard-pagination {
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 20px !important;
  }
  .leave-dashboard-card-content {
    flex-direction: column !important;
    gap: 6px !important;
    min-width: 0 !important;
    overflow-x: auto;
  }
  .leave-dashboard-card-content > div {
    padding: 4px 0 !important;
  }
}
`}</style>
    </FlexBox>
  );
}; 