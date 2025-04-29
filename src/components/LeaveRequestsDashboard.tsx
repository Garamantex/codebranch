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

interface LeaveRequest {
  id: string;
  name: string;
  type_of_leave: string;
  date_from: string;
  date_to: string;
  status: string;
  reason?: string;
  createdAt: string;
}

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://67f551e6913986b16fa426fd.mockapi.io/api/v1/leave_requests');
        const data = await res.json();
        setLeaveRequests(data);
      } catch (error) {
        setLeaveRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <FlexBox direction={FlexBoxDirection.Row} style={{ alignItems: 'center', gap: 24, paddingBottom: 8 }}>
            <FlexBox direction={FlexBoxDirection.Row} style={{ alignItems: 'center', gap: 8 }}>
              <Icon name="filter" style={{ color: '#0a6ed1' }} />
              <span style={{ fontWeight: 500 }}>Filter by Status:</span>
              <Select
                onChange={(e: any) => setStatusFilter(e.detail.selectedOption.value)}
                value={statusFilter}
                style={{ minWidth: 120 }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <Option key={option.key} value={option.key}>{option.label}</Option>
                ))}
              </Select>
            </FlexBox>
            <Button
              icon={sortOrder === 'asc' ? 'sort-ascending' : 'sort-descending'}
              design="Emphasized"
              onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              style={{ minWidth: 180 }}
            >
              Sort by Date Requested
            </Button>
          </FlexBox>
        </FlexBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16, padding: '0 40px 40px 40px' }}>
          {sortedRequests.map((req) => (
            <Card key={req.id} style={{ boxShadow: '0 2px 12px #0001', borderRadius: 16, padding: '40px 48px', background: '#f9fafb', minWidth: 0 }}>
              <FlexBox direction={FlexBoxDirection.Row} style={{ flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 220, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Employee Name:</span>
                  <span>{req.name}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 180, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Type of Leave:</span>
                  <span>{req.type_of_leave}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>From:</span>
                  <span>{new Date(req.date_from).toLocaleDateString()}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>To:</span>
                  <span>{new Date(req.date_to).toLocaleDateString()}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 120, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Status:</span>
                  <span style={{ color: statusColor(req.status), fontWeight: 700, letterSpacing: 1 }}>{req.status}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 180, maxWidth: 320, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Reason:</span>
                  <span style={{ whiteSpace: 'pre-line' }}>{req.reason}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Requested:</span>
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 16, minWidth: 180, alignItems: 'flex-start', marginTop: 12, padding: '8px 12px' }}>
                  <span style={{ fontWeight: 600, color: '#222' }}>Actions:</span>
                  <FlexBox direction={FlexBoxDirection.Row} style={{ gap: 12 }}>
                    <Button
                      icon="accept"
                      design="Positive"
                      disabled={req.status === 'APPROVED'}
                      onClick={() => handleStatusChange(req.id, 'APPROVED')}
                      style={{ fontWeight: 600 }}
                    >
                      Approve
                    </Button>
                    <Button
                      icon="decline"
                      design="Negative"
                      disabled={req.status === 'REJECTED'}
                      onClick={() => handleStatusChange(req.id, 'REJECTED')}
                      style={{ fontWeight: 600 }}
                    >
                      Reject
                    </Button>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </Card>
          ))}
        </div>
      </Card>
    </FlexBox>
  );
}; 