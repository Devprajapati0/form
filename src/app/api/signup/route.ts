import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/db/db";
import { User } from "@/models/user.model";

export async function POST(request:NextRequest){
    try {
        await dbConnect();

        const { username, email, password } = await request.json();

        // Ensure all required fields are provided
        if (!username || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
               
            );
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password // Remember to hash the password before storing it
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User creation failed",
                },
                
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
            },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while registering",
            },
            { status: 500 }
        );
   }
}