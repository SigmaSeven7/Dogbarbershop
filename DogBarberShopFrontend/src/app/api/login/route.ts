import axios, { AxiosError } from 'axios';
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { password, email, firstName } = await req.json();
        
   
        const response = await axios.post('http://localhost:5009/login', {
            "Password": password,
            "Email": email,
            "FirstName": firstName,
        });

        var status = response.status;
        return NextResponse.json({ message: 'Success!',firstName: firstName, clientId: response.data.id },{status});
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
