import axios, { AxiosError } from 'axios';
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
export async function GET(req: NextRequest, res: NextResponse) {
    try {
       
        
        // Make API call to localhost:5009/login
        const response = await axios.get('http://localhost:5009/get-all-appointments');

        var status = response.status;
        var appointments = response.data;
        return NextResponse.json({ message: 'Success!', appointments: appointments },{status});
    } catch (error) {
        console.error('Error in /api/register:', error);

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
