/**
 * @context LeaveRequestsContext
 * @description Global context for managing leave requests state.
 * Maintains a complete history of all requests and their local changes.
 * Handles request status updates and data consolidation.
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LeaveRequest } from '../components/leave-requests.types';

interface LeaveRequestsContextType {
  allRequests: LeaveRequest[];
  setAllRequests: (requests: LeaveRequest[]) => void;
  updateRequestStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  localChanges: Record<string, 'APPROVED' | 'REJECTED'>;
  requestHistory: Record<string, LeaveRequest>;
}

const LeaveRequestsContext = createContext<LeaveRequestsContextType | undefined>(undefined);

export const useLeaveRequests = () => {
  const context = useContext(LeaveRequestsContext);
  if (!context) {
    throw new Error('useLeaveRequests must be used within a LeaveRequestsProvider');
  }
  return context;
};

interface LeaveRequestsProviderProps {
  children: ReactNode;
}

export const LeaveRequestsProvider: React.FC<LeaveRequestsProviderProps> = ({ children }) => {
  const [allRequests, setAllRequests] = useState<LeaveRequest[]>([]);
  const [localChanges, setLocalChanges] = useState<Record<string, 'APPROVED' | 'REJECTED'>>({});
  const [requestHistory, setRequestHistory] = useState<Record<string, LeaveRequest>>({});

  /**
   * Updates the status of a leave request and maintains the change history
   * @param id - The ID of the request to update
   * @param status - The new status (APPROVED or REJECTED)
   */
  const updateRequestStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setLocalChanges(prev => ({ ...prev, [id]: status }));
    setAllRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );
    setRequestHistory(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  /**
   * Handles new requests from the API and consolidates them with existing data
   * @param newRequests - Array of new requests from the API
   */
  const handleNewRequests = (newRequests: LeaveRequest[]) => {
    // Update history with new requests
    const updatedHistory = { ...requestHistory };
    newRequests.forEach(request => {
      updatedHistory[request.id] = request;
    });

    // Apply local changes to the history
    Object.entries(localChanges).forEach(([id, status]) => {
      if (updatedHistory[id]) {
        updatedHistory[id] = { ...updatedHistory[id], status };
      }
    });

    setRequestHistory(updatedHistory);

    // Update visible requests
    const visibleRequests = Object.values(updatedHistory);
    setAllRequests(visibleRequests);
  };

  return (
    <LeaveRequestsContext.Provider 
      value={{ 
        allRequests, 
        setAllRequests: handleNewRequests, 
        updateRequestStatus,
        localChanges,
        requestHistory
      }}
    >
      {children}
    </LeaveRequestsContext.Provider>
  );
}; 