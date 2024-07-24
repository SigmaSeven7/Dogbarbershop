
import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/lib/types";
import EditDeleteAppointmentDialog from "../edit-delete-appointment-dialog";

export const getColumns = (onAppointmentUpdated: () => void, bookedTimes : Array<any>): ColumnDef<Appointment>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "scheduledTime",
    header: "Appointment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("scheduledTime"));
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex gap-2">
          <EditDeleteAppointmentDialog
            clientId={appointment.clientId}
            appointment={appointment}
            isDelete={false}
            onAppointmentUpdated={onAppointmentUpdated}
            bookedTimes={bookedTimes}
          />
          <EditDeleteAppointmentDialog
            clientId={appointment.clientId}
            appointment={appointment}
            isDelete={true}
            onAppointmentUpdated={onAppointmentUpdated}
            bookedTimes={bookedTimes}
          />
        </div>
      );
    },
  },
];
