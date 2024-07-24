import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/db/db";
import { Form } from "@/models/form.model";
import { sendVerificationEmail } from "@/helper/email";
import { User } from "@/models/user.model";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { username,email, phone, starttime, endtime, guesttype, meals } = await request.json();

        // Ensure all required fields are present
        if (!username || !phone || !email || !starttime || !endtime || !guesttype || !meals) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
                { status: 400 }
            );
        }

        // Create booking
        const booking = await Form.create({
            username,
            email,
            phonenumber: phone,
            timeofstart: starttime,
            timeofend: endtime,
            typeofguest: guesttype,
            meals,
            approvedbyregistrar: false,
            approvedbyadminstration: false,
        });
        console.log("book",booking);

        // const registrar = await User.findOne({email:"devprajapati742@gmail.com"});
        // const admin = await User.findOne({email:"devheinji@gmail.com"});
        // const user = await User.findOne({email});
        
        

        // if(!registrar || !admin || !user){
        //     return NextResponse.json(
        //         {
        //             success: false,
        //             message: "No registrar or admin found",
        //             },
        //             { status: 400 }
        //             );
        // }
        // user.formemail = email;
        // await user.save();
        // registrar.formemail = email;
        // await registrar.save();
        // admin.formemail = email;
        // await admin.save();
        // console.log(registrar,admin,user)

        if (!booking) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Booking creation failed",
                },
                { status: 500 }
            );
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(username, process.env.REGISTRAR_EMAIL!, "", true);
        console.log("emailResponse", emailResponse);

        return NextResponse.json(
            {
                success: true,
                message: "Your booking is pending",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while processing the booking",
            },
            { status: 500 }
        );
    }
}
