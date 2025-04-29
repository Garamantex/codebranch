import React, { useEffect, useState } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  BusyIndicator,
  Select,
  Option,
  FlexBox,
  FlexBoxDirection,
  Button,
  Card,
  Title,
  Icon
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
      return '#107e3e'; // verde
    case 'REJECTED':
      return '#bb0000'; // rojo
    case 'PENDING':
    default:
      return '#e9730c'; // naranja
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
    // eslint-disable-next-line
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
      <FlexBox direction={FlexBoxDirection.Column} style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f3f6fa' }}>
        <Card style={{ padding: 40, background: '#fff', color: '#bb0000', fontWeight: 600, fontSize: 20 }}>
          {error}
        </Card>
      </FlexBox>
    );
  }

  if (loading) {
    return <BusyIndicator active />;
  }

  return (
    <FlexBox
      direction={FlexBoxDirection.Column}
      style={{ minHeight: '100vh', background: '#f3f6fa', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
    >
      <Card style={{ maxWidth: 1440, width: '100%', padding: 0, boxShadow: '0 4px 24px #0001', background: '#fff' }}>
        <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 24, padding: '32px 40px 0 40px' }}>
          <Title level="H2">Leave Requests Dashboard</Title>
          <FiltersBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </FlexBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16, padding: '0 40px 40px 40px' }}>
          {sortedRequests.map((req) => (
            <LeaveRequestCard
              key={req.id}
              request={req}
              onApprove={(id) => handleStatusChange(id, 'APPROVED')}
              onReject={(id) => handleStatusChange(id, 'REJECTED')}
            />
          ))}
          <PaginationControls
            page={page}
            total={total}
            limit={limit}
            loading={loading}
            onPageChange={setPage}
          />
        </div>
      </Card>
      <style jsx global>{`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`}</style>
    </FlexBox>
  );
}; 