import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/db/db";
import { sendVerificationEmail } from "@/helper/email";
import { User } from "@/models/user.model";
import { Form } from "@/models/form.model";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { username, response } = await request.json();
    const user = await User.findOne({ username });
    
    if (!user) {
        return NextResponse.json({ response: "User not found" }, { status: 404 });
    }
    const form = await Form.findOne({ email: user.formemail });
    if (!form) {
      return NextResponse.json({ response: "Form not found" }, { status: 404 });
    }
    console.log(user,form)

    // Update form based on approval status and response
    if (response === true || response === false) {
      if (!form.approvedbyregistrar ) {
        if (response) {
          form.approvedbyregistrar = true;
          await form.save();
          await sendVerificationEmail(username, 'devheinji@gmail.com', "", false);
          return NextResponse.json({ response: "Email sent to administrative office. Your request was accepted by the registrar." }, { status: 202 });
        } else {
          await sendVerificationEmail(username, form.email, "Your request for booking the room has been declined.", true);
          form.approvedbyregistrar = false;
          await form.save();
          return NextResponse.json({ response: "Your request was declined by the registrar." }, { status: 202 });
        }
      }
      

      if (form.approvedbyregistrar && !form.approvedbyadminstration && user.email == "devprajapati742@gmail.com" ) {
        if (response) {
          form.approvedbyadminstration = true;
          await form.save();
          await sendVerificationEmail(username, form.email, "Your request is accepted.", false);
          return NextResponse.json({ response: "Your request was accepted by administration." }, { status: 202 });
        } else {
          await sendVerificationEmail(username, form.email, "Request has been declined by the administrative office.", false);
          form.approvedbyadminstration = false;
          await form.save();
          return NextResponse.json({ response: "Your request was declined by administration." }, { status: 202 });
        }
      }
    }

    return NextResponse.json({ response: "already sent" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ response: "Internal server error" }, { status: 500 });
  }
}
