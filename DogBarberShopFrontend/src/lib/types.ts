
export interface Appointment {
    id: string;
    clientId: string;
    clientName: string;
    scheduledTime: string;
    createdAt: string;
    isCurrentUser: boolean;
  }