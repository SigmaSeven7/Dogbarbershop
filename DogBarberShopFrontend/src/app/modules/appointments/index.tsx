
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "../columns";
import CreateAppointmentDialog from "../create-appointment-modal/index.tsx";

function Appointments({ clientId }: { clientId: string | null }) {
  const [appointments, setAppointments] = useState<Array<any>>([]);
  const [clientAppointments, setClientAppointments] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [bookedTimes, setBookedTimes] = useState<Array<any>>([]);

  

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const [appointmentsResponse, clientResponse] = await Promise.all([
        fetch("/api/get-all-appointments", { credentials: "include" }),
        fetch("/api/get-current-user", {
          credentials: "include",
          body: JSON.stringify({ clientId }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      if (!appointmentsResponse.ok || !clientResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const appointmentsData = await appointmentsResponse.json();
      const clientData = await clientResponse.json();

      const clientAppointmentIds = new Set(
        clientData.appointments.map((app: { id: string }) => app.id)
      );

      const processedAppointments = appointmentsData.appointments
        .filter((app: { scheduledTime: string }) => {
          const appointmentDate = new Date(app.scheduledTime);
          const today = new Date();
          today.setHours(0, 0, 0, 0); 
          return appointmentDate >= today;
        })
        .map((app: { id: string }) => ({
          ...app,
          isCurrentUser: clientAppointmentIds.has(app.id),
        }));
     
       
      setBookedTimes(processedAppointments.map((appointment: { scheduledTime: string }) => new Date(appointment.scheduledTime)));
      setAppointments(processedAppointments);
      setClientAppointments(clientData.appointments);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleAppointmentCreatedOrChanges = () => {
    fetchAppointments();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center gap-6 text-center mb-16">
      <h1>תורים</h1>
      <div className="w-full">
        <CreateAppointmentDialog
          bookedTimes={bookedTimes}
          bookedAppointments={appointments}
          clientId={clientId ?? null}
          onAppointmentCreated={handleAppointmentCreatedOrChanges}
        />
      </div>

      <DataTable
        columns={getColumns(handleAppointmentCreatedOrChanges, bookedTimes)}
        data={appointments}
      />
    </div>
  );
}

export default Appointments;
