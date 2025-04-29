import React from 'react';
import { FlexBox, FlexBoxDirection, Button, Icon } from '@ui5/webcomponents-react';

interface PaginationControlsProps {
  page: number;
  total: number;
  limit: number;
  loading: boolean;
  onPageChange: (newPage: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ page, total, limit, loading, onPageChange }) => {
  const totalPages = Math.ceil(total / limit) || 1;
  return (
    <FlexBox direction={FlexBoxDirection.Row} style={{ justifyContent: 'center', marginTop: 32, gap: 16, alignItems: 'center' }}>
      <Button
        design="Transparent"
        icon="nav-back"
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
      >
        {loading ? <span><Icon name="refresh" style={{ marginRight: 4, animation: 'spin 1s linear infinite' }} />Loading...</span> : 'Previous'}
      </Button>
      <span style={{ fontWeight: 600, minWidth: 80, textAlign: 'center' }}>
        Page {page} of {totalPages}
      </span>
      <Button
        design="Transparent"
        icon="nav-forward"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
      >
        {loading ? <span><Icon name="refresh" style={{ marginRight: 4, animation: 'spin 1s linear infinite' }} />Loading...</span> : 'Next'}
      </Button>
    </FlexBox>
  );
}; 