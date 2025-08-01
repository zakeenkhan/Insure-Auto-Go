import { Api } from "@/lib/api"
import cookie from "react-cookies"

type S3photoResponse = {
  url: string
}
type S3photoPayload = {
  file: File
}
const S3photo = Api.injectEndpoints({
  endpoints: (build) => ({
    s3photUpload: build.mutation<S3photoResponse, S3photoPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `/s3-upload/photo`,
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ["user"],
    }),
  }),
})

export const { useS3photUploadMutation } = S3photo

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = S3photo
