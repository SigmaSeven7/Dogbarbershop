import axios, { AxiosError } from 'axios';
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
       

        const requestBody = await req.json();
        const clientId = requestBody.clientId;
        const scheduledTime = requestBody.appointmentDate;

        const response = await axios.post('http://localhost:5009/appointments', {
            "clientId" : clientId,
            "scheduledTime": scheduledTime,
        });

  
        var status = response.status;
        var appointments = response.data.appointments;
        return NextResponse.json({ message: 'Success!', appointments: appointments },{status});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const statusCode = axiosError.response?.status || 500;
            const errorMessage = axiosError.response?.statusText || 'An error occurred';
            return NextResponse.json({ error: errorMessage }, { status: statusCode });
        } else {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }
}
