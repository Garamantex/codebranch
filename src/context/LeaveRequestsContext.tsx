/**
 * @context LeaveRequestsContext
 * @description Global context for managing leave requests state.
 * Maintains a complete history of all requests and their local changes.
 * Handles request status updates and data consolidation.
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { LeaveRequest, LeaveRequestsContextType, LeaveRequestsProviderProps } from '../components/leave-requests.types';

/**
 * @description Global context for managing leave requests state
 * Maintains a complete history of all requests and their local changes
 */
const LeaveRequestsContext = createContext<LeaveRequestsContextType | undefined>(undefined);

export const useLeaveRequests = () => {
  const context = useContext(LeaveRequestsContext);
  if (!context) {
    throw new Error('useLeaveRequests must be used within a LeaveRequestsProvider');
  }
  return context;
};

export const LeaveRequestsProvider: React.FC<LeaveRequestsProviderProps> = ({ children }) => {
  const [allRequests, setAllRequests] = useState<LeaveRequest[]>([]);
  const [localChanges, setLocalChanges] = useState<Record<string, 'APPROVED' | 'REJECTED'>>({});
  const [requestHistory, setRequestHistory] = useState<Record<string, LeaveRequest>>({});

  /**
   * Updates the status of a leave request and maintains the change history
   * @param id - The ID of the request to update
   * @param status - The new status (APPROVED or REJECTED)
   */
  const updateRequestStatus = useCallback((id: string, status: 'APPROVED' | 'REJECTED') => {
    setLocalChanges(prev => ({ ...prev, [id]: status }));
    setAllRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status } : request
    ));
    setRequestHistory(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  }, []);

  const value = {
    allRequests,
    setAllRequests,
    updateRequestStatus,
    localChanges,
    requestHistory
  };

  return (
    <LeaveRequestsContext.Provider value={value}>
      {children}
    </LeaveRequestsContext.Provider>
  );
}; 