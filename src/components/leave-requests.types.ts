import { ReactNode } from 'react';

/**
 * @interface LeaveRequest
 * @description Represents a leave request with all its properties
 * @property {string} id - Unique identifier for the leave request
 * @property {string} name - Name of the employee requesting leave
 * @property {string} type_of_leave - Type of leave (e.g., Vacation, Sick, etc.)
 * @property {string} date_from - Start date of the leave period
 * @property {string} date_to - End date of the leave period
 * @property {string} status - Current status of the request (PENDING, APPROVED, REJECTED)
 * @property {string} [reason] - Optional reason for the leave request
 * @property {string} createdAt - Timestamp when the request was created
 */
export interface LeaveRequest {
  id: string;
  name: string;
  type_of_leave: string;
  date_from: string;
  date_to: string;
  status: string;
  reason?: string;
  createdAt: string;
}

/**
 * @interface LeaveRequestCardProps
 * @description Props interface for the LeaveRequestCard component
 * @property {LeaveRequest} request - The leave request data to display
 * @property {(id: string) => void} onApprove - Callback function when request is approved
 * @property {(id: string) => void} onReject - Callback function when request is rejected
 */
export interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

/**
 * @interface LeaveRequestsContextType
 * @description Interface for the LeaveRequests context
 * @property {LeaveRequest[]} allRequests - Array of all leave requests
 * @property {(requests: LeaveRequest[]) => void} setAllRequests - Function to update all requests
 * @property {(id: string, status: 'APPROVED' | 'REJECTED') => void} updateRequestStatus - Function to update request status
 * @property {Record<string, 'APPROVED' | 'REJECTED'>} localChanges - Record of local status changes
 * @property {Record<string, LeaveRequest>} requestHistory - Complete history of all requests
 */
export interface LeaveRequestsContextType {
  allRequests: LeaveRequest[];
  setAllRequests: (requests: LeaveRequest[]) => void;
  updateRequestStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  localChanges: Record<string, 'APPROVED' | 'REJECTED'>;
  requestHistory: Record<string, LeaveRequest>;
}

/**
 * @interface LeaveRequestsProviderProps
 * @description Props interface for the LeaveRequestsProvider component
 * @property {ReactNode} children - Child components to be wrapped by the provider
 */
export interface LeaveRequestsProviderProps {
  children: ReactNode;
} 