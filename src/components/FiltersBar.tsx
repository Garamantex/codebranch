import React from 'react';
import { FlexBox, FlexBoxDirection, SegmentedButton, SegmentedButtonItem, Button, Icon } from '@ui5/webcomponents-react';

const STATUS_OPTIONS = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' }
];

interface FiltersBarProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (val: 'asc' | 'desc') => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => (
  <div className="filters-bar-root" role="region" aria-label="Filter and sort leave requests">
    <FlexBox direction={FlexBoxDirection.Row} style={{ alignItems: 'center', gap: 24, paddingBottom: 8, maxWidth: 900, width: '100%' }} className="filters-bar-flex">
      <FlexBox direction={FlexBoxDirection.Row} style={{ alignItems: 'center', gap: 8 }}>
        <Icon name="filter" style={{ color: '#0a6ed1' }} />
        <span style={{ fontWeight: 500 }}>Filter by Status:</span>
        <SegmentedButton
          aria-label="Filter leave requests by status"
          role="listbox"
          onSelectionChange={(e) => {
            const selectedButton = e.target.querySelector('[selected]') as HTMLElement;
            if (selectedButton) {
              const key = selectedButton.getAttribute('data-key');
              if (key) setStatusFilter(key);
            }
          }}
        >
          {STATUS_OPTIONS.map((option) => (
            <SegmentedButtonItem key={option.key} data-key={option.key} selected={statusFilter === option.key} aria-label={option.label} role="option">
              {option.label}
            </SegmentedButtonItem>
          ))}
        </SegmentedButton>
      </FlexBox>
      <Button
        icon={sortOrder === 'asc' ? 'sort-ascending' : 'sort-descending'}
        design="Emphasized"
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        style={{ minWidth: 180 }}
        aria-label={`Sort by date requested, current order: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
      >
        Sort by Date Requested
      </Button>
    </FlexBox>
    <style jsx global>{`
      @media (max-width: 900px) {
        .filters-bar-root {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .filters-bar-flex {
          flex-direction: column !important;
          gap: 12px !important;
          align-items: stretch !important;
          padding-bottom: 12px !important;
          margin: 0 2vw !important;
          max-width: 98vw !important;
        }
        .filters-bar-flex button {
          width: 100% !important;
          margin-top: 4px;
        }
      }
    `}</style>
  </div>
); 