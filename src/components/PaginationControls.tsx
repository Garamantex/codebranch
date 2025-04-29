/**
 * PaginationControls.tsx
 *
 * Reusable component for paginating lists of leave requests.
 * Provides next/previous navigation and displays current page info.
 * Built with SAPUI5 Web Components and React.
 */
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
    <FlexBox direction={FlexBoxDirection.Row} style={{ justifyContent: 'center', marginTop: 32, gap: 16, alignItems: 'center' }} role="navigation" aria-label="Pagination Controls">
      <Button
        design="Transparent"
        icon="navigation-left-arrow"
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        {loading ? <span><Icon name="refresh" style={{ marginRight: 4, animation: 'spin 1s linear infinite' }} />Loading...</span> : 'Previous'}
      </Button>
      <span style={{ fontWeight: 600, minWidth: 80, textAlign: 'center' }} aria-live="polite" aria-atomic="true">
        Page {page} of {totalPages}
      </span>
      <Button
        design="Transparent"
        icon="navigation-right-arrow"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        {loading ? <span><Icon name="refresh" style={{ marginRight: 4, animation: 'spin 1s linear infinite' }} />Loading...</span> : 'Next'}
      </Button>
    </FlexBox>
  );
}; 