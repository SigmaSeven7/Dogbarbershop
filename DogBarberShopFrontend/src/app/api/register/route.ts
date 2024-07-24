import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { password, email, firstName, userName } = await req.json();

        // Make API call to localhost:5009/register
        const response = await axios.post('http://localhost:5009/register', {
            "Password": password,
            "Email": email,
            "FirstName": firstName,
            "Username": userName
        });
        var status = response.status;
        return NextResponse.json({ message: 'Success!',firstName: firstName, clientId: response.data.id },{status});
    } catch (error) {
        console.error('Error in /api/register:', error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const statusCode = axiosError.response?.status || 500;
            const errorMessage = axiosError.response?.data || 'An error occurred';
            return NextResponse.json({ error: errorMessage }, { status: statusCode });
        } else {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }
}