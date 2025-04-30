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

  const handleNewRequests = (newRequests: LeaveRequest[]) => {
    // Actualizar el historial con las nuevas solicitudes
    const updatedHistory = { ...requestHistory };
    newRequests.forEach(request => {
      updatedHistory[request.id] = request;
    });

    // Aplicar los cambios locales al historial
    Object.entries(localChanges).forEach(([id, status]) => {
      if (updatedHistory[id]) {
        updatedHistory[id] = { ...updatedHistory[id], status };
      }
    });

    setRequestHistory(updatedHistory);

    // Actualizar las solicitudes visibles
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