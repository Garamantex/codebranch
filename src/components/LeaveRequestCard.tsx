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

export const LeaveRequestCard: React.FC<LeaveRequestCardProps & { className?: string }> = ({ request, onApprove, onReject, className }) => (
  <Card
    className={className}
    style={{
      boxShadow: '0 2px 12px #0001',
      borderRadius: 16,
      padding: '40px 48px',
      background: '#f9fafb',
      minWidth: 0,
      width: '100%',
      margin: '0 auto',
    }}
    role="group"
    aria-label={`Leave request for ${request.name}`}
  >
    <FlexBox
      direction={FlexBoxDirection.Row}
      style={{ flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}
      className="leave-card-content"
    >
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 220, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Employee Name:</span>
        <span>{request.name}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 180, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Type of Leave:</span>
        <span>{request.type_of_leave}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>From:</span>
        <span>{new Date(request.date_from).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>To:</span>
        <span>{new Date(request.date_to).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 120, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Status:</span>
        <span style={{ color: statusColor(request.status), fontWeight: 700, letterSpacing: 1 }}>{request.status}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 180, maxWidth: 320, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Reason:</span>
        <span style={{ whiteSpace: 'pre-line' }}>{request.reason}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 8, minWidth: 140, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Requested:</span>
        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
      </FlexBox>
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: 16, minWidth: 180, alignItems: 'flex-start', marginTop: 12, padding: '8px 12px' }}>
        <span style={{ fontWeight: 600, color: '#222' }}>Actions:</span>
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
    <style jsx global>{`
      @media (max-width: 900px) {
        .leave-card-content {
          flex-direction: column !important;
          gap: 4px !important;
        }
        .ui5-card, .leave-dashboard-card {
          padding: 12px 2vw !important;
          max-width: 98vw !important;
          width: 98vw !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
    `}</style>
  </Card>
); 