import React from 'react';
import { FlexBox, FlexBoxDirection, Select, Option, Button, Icon } from '@ui5/webcomponents-react';

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
      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      style={{ minWidth: 180 }}
    >
      Sort by Date Requested
    </Button>
  </FlexBox>
); 