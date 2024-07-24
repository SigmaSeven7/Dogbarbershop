
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

interface CreateAppointmentDialogProps {
  clientId: string | null;
  bookedAppointments: Array<Appointment>;
  onAppointmentCreated: () => void;
  bookedTimes: Array<any>;
}

export default function CreateAppointmentDialog({
  clientId,
  onAppointmentCreated,
  bookedAppointments,
  bookedTimes,
}: CreateAppointmentDialogProps) {
  const [date, setDate] = useState<Date | null>(null);
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


    const offset = 3 * 60 * 60 * 1000;
    const adjustedDate = new Date(date.getTime() + offset);

    const body = {
      clientId: clientId,
      appointmentDate: adjustedDate.toISOString(),
    };


    try {
      const response = await fetch("/api/create-new-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Appointment created successfully!");
        setIsOpen(false);
        onAppointmentCreated();
      } else {
        setErrorMessage(
          data.error || "Something went wrong, please try again."
        );
      }
    } catch (error) {
      setErrorMessage("Communication error, please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger  asChild>
        <Button className="w-[200px]" onClick={() => setIsOpen(true)}>
          צור תור חדש
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="!text-center">
          <DialogTitle>צור תור חדש</DialogTitle>
          <DialogDescription>בחר תאריך ושעה:</DialogDescription>
        </DialogHeader>
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
            className="w-full p-2 border rounded text-black"
            placeholderText="Select a date and time"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <div className="mt-4 flex flex-col space-y-2">
          <Button onClick={handleSubmit}>Create Appointment</Button>
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