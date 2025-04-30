/**
 * @component PaginationControls
 * @description Reusable component for paginating lists of leave requests. Provides next/previous navigation and displays current page info.
 * @param {PaginationControlsProps} props - Component props
 * @param {number} props.page - Current page number
 * @param {number} props.total - Total number of items
 * @param {number} props.limit - Number of items per page
 * @param {boolean} props.loading - Loading state indicator
 * @param {(newPage: number) => void} props.onPageChange - Function to handle page changes
 * @returns {React.FC} A React functional component that renders pagination controls
 */
import React from 'react';
import { FlexBox, FlexBoxDirection, Button, Icon } from '@ui5/webcomponents-react';
import '@/styles/leave-requests.css';

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
    <FlexBox direction={FlexBoxDirection.Row} className="pagination-controls" role="navigation" aria-label="Pagination Controls">
      <Button
        design="Transparent"
        icon="navigation-left-arrow"
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        {loading ? <span><Icon name="refresh" className="loading-icon" />Loading...</span> : 'Previous'}
      </Button>
      <span className="page-info" aria-live="polite" aria-atomic="true">
        Page {page} of {totalPages}
      </span>
      <Button
        design="Transparent"
        icon="navigation-right-arrow"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        {loading ? <span><Icon name="refresh" className="loading-icon" />Loading...</span> : 'Next'}
      </Button>
    </FlexBox>
  );
}; 