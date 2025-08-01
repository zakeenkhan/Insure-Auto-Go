"use server"

import { CreateEmailResponse, Resend } from "resend"
import { z } from "zod"

import { EmailTemplate } from "./email-template"
import { ContactFormSchema } from "@/app/rentCars/[id]/page"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendContactFormEmail = async (
  payload: z.infer<typeof ContactFormSchema>
): Promise<CreateEmailResponse> => {
  let emailTo = payload.email
  console.log(payload.email, "payload")
  const data = await resend.emails.send({
    from: "InsureAutoGo <onboarding@resend.dev>",
    to: "usama.work8080@gmail.com",
    replyTo: payload.email,
    subject: `New Contact Form Submission: Car Booking`,
    react: EmailTemplate(payload),
  })

  return data
}

export { sendContactFormEmail }
