/**
 * LeaveRequestCard.tsx
 *
 * Card component for displaying leave request details.
 * Includes approve and reject actions.
 * Built with SAPUI5 Web Components and React.
 */
import React from 'react';
import { Card, FlexBox, FlexBoxDirection, Button } from '@ui5/webcomponents-react';
import { LeaveRequestCardProps } from './leave-requests.types';
import '@/styles/leave-requests.css';

const getStatusClass = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'status-approved';
    case 'REJECTED':
      return 'status-rejected';
    case 'PENDING':
    default:
      return 'status-pending';
  }
};

export const LeaveRequestCard: React.FC<LeaveRequestCardProps & { className?: string }> = ({ request, onApprove, onReject, className }) => (
  <Card
    className={`leave-dashboard-card ${className || ''}`}
    role="group"
    aria-label={`Leave request for ${request.name}`}
  >
    <FlexBox
      direction={FlexBoxDirection.Row}
      className="leave-card-content"
    >
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">Employee Name:</span>
        <span>{request.name}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">Type of Leave:</span>
        <span>{request.type_of_leave}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">From:</span>
        <span>{new Date(request.date_from).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">To:</span>
        <span>{new Date(request.date_to).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">Status:</span>
        <span className={`card-status ${getStatusClass(request.status)}`}>{request.status}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">Reason:</span>
        <span style={{ whiteSpace: 'pre-line' }}>{request.reason}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field">
        <span className="card-label">Requested:</span>
        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} className="card-field" style={{ gap: 16, alignItems: 'flex-start', marginTop: 12 }}>
        <span className="card-label">Actions:</span>
        <FlexBox direction={FlexBoxDirection.Row} style={{ gap: 12 }}>
          <Button
            icon="accept"
            design="Positive"
            disabled={request.status === 'APPROVED'}
            onClick={() => onApprove(request.id)}
            style={{ fontWeight: 600 }}
            aria-label={`Approve leave request for ${request.name}`}
          >
            Approve
          </Button>
          <Button
            icon="decline"
            design="Negative"
            disabled={request.status === 'REJECTED'}
            onClick={() => onReject(request.id)}
            style={{ fontWeight: 600 }}
            aria-label={`Reject leave request for ${request.name}`}
          >
            Reject
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  </Card>
); 