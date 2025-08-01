import { z } from "zod"

import { ContactFormSchema } from "@/app/rentCars/[id]/page"

export const EmailTemplate = ({
  name,
  email,
  clientContactNo,
}: z.infer<typeof ContactFormSchema>) => (
  <div>
    <p>
      <strong>Subject:</strong> Car Booking
    </p>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Contact Number:</strong> {clientContactNo}
    </p>
  </div>
)
