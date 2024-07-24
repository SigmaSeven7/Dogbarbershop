"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "@/lib/types";

interface EditDeleteAppointmentDialogProps {
  clientId: string | null;
  appointment: Appointment;
  isDelete: boolean;
  onAppointmentUpdated: () => void;
  bookedTimes: Array<any>;
}

export default function EditDeleteAppointmentDialog({
  clientId,
  appointment,
  isDelete,
  bookedTimes,
  onAppointmentUpdated,
}: EditDeleteAppointmentDialogProps) {
  const [date, setDate] = useState<Date | null>(new Date(appointment.scheduledTime));
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateTimes = (start: number, end: number, interval: number) => {
    const times = [];
    for (let hour = start; hour <= end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        times.push(time);
      }
    }
    return times;
  };

  const allowedTimes = generateTimes(9, 17, 15);


  const handleSubmit = async () => {
    setErrorMessage("");
    if (!date) {
      setErrorMessage("Please select a date and time");
      return;
    }

   
    const offset =  60 * 60 * 1000; // Offset for UTC+2 in milliseconds
    const adjustedDate = new Date(date.getTime() + offset);

    const body = {
      clientId: clientId,
      appointmentDate: date.toISOString(),
      isDelete: isDelete,
    };

    try {
      const response = await fetch(`/api/modify-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, appointmentId: appointment.id }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(isDelete ? "Appointment deleted successfully!" : "Appointment updated successfully!");
        setIsOpen(false);
        onAppointmentUpdated();
      } else {
        setErrorMessage(data.error || "Something went wrong, please try again.");
      }
    } catch (error) {
      setErrorMessage("Communication error, please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`w-[50px] ${isDelete ?  "bg-red-600 text-white" : ""}`} onClick={() => setIsOpen(true)}>
          {isDelete ? "Delete" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="!text-center">
          <DialogTitle>{isDelete ? "Confirm Delete" : "Edit Appointment"}</DialogTitle>
          <DialogDescription>
            {isDelete ? "Are you sure you want to delete this appointment?" : "Select a new date and time:"}
          </DialogDescription>
        </DialogHeader>
        {!isDelete && (
          <div className="flex justify-center space-y-4">
            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              minDate={new Date()}
              showTimeSelect
              includeTimes={allowedTimes}
              excludeTimes={bookedTimes}
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy HH:mm"
              className="w-full p-2 border rounded"
              placeholderText="Select a date and time"
            />
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <div className="mt-4 flex flex-col space-y-2">
          <Button onClick={handleSubmit}>
            {isDelete ? "Confirm Delete" : "Save Changes"}
          </Button>
        </div>
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
