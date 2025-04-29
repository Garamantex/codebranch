import React, { useEffect, useState } from 'react';
import { Table, TableColumn, TableRow, TableCell, BusyIndicator } from '@ui5/webcomponents-react';

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

export const LeaveRequestsDashboard: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <BusyIndicator active />;
  }

  return (
    <Table
      columns={
        <>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Type of Leave</TableColumn>
          <TableColumn>From</TableColumn>
          <TableColumn>To</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Reason</TableColumn>
        </>
      }
    >
      {leaveRequests.map((req) => (
        <TableRow key={req.id}>
          <TableCell>{req.name}</TableCell>
          <TableCell>{req.type_of_leave}</TableCell>
          <TableCell>{new Date(req.date_from).toLocaleDateString()}</TableCell>
          <TableCell>{new Date(req.date_to).toLocaleDateString()}</TableCell>
          <TableCell>{req.status}</TableCell>
          <TableCell>{req.reason}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}; 