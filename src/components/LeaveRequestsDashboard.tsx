/**
 * @component LeaveRequestsDashboard
 * @description Main dashboard component for managing leave requests. Features filtering, sorting, and pagination.
 * All data operations (filtering, sorting, pagination) are handled on the client side.
 * Uses a global context to maintain request state and local changes.
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
import { PaginationControls } from './PaginationControls';
import { FiltersBar } from './FiltersBar';
import { useLeaveRequests } from '@/context/LeaveRequestsContext';
import '@/styles/leave-requests.css';

export const LeaveRequestsDashboard: React.FC = () => {
  const { allRequests, setAllRequests, updateRequestStatus, localChanges } = useLeaveRequests();
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const limit = 5;
  const [error, setError] = useState<string | null>(null);

  // Fetch all requests once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/hello');
        const result = await res.json();
        if (res.ok) {
          setAllRequests(result.data);
        } else {
          setError(result.error || 'Error fetching data');
          setAllRequests([]);
        }
      } catch (error) {
        setAllRequests([]);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset to first page when filter or sort changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sortOrder]);

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    updateRequestStatus(id, newStatus);
  };

  // Filter requests based on current status (including local changes)
  const filteredRequests = allRequests.filter(request => {
    if (statusFilter === 'ALL') return true;
    const currentStatus = localChanges[request.id] || request.status;
    return currentStatus === statusFilter;
  });

  // Sort filtered requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Apply pagination to sorted requests
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedRequests = sortedRequests.slice(start, end);

  const total = filteredRequests.length;

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
          {paginatedRequests.map((req) => (
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