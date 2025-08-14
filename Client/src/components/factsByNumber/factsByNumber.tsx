import { SectionStarter } from "../sectionStarter"
import Image from "next/image"
import car from "./facts-car.png"

export const FactsByNumber = () => {
  return (
    <div className="bg-[#15182E] lg:py-16 py-10 relative">
      <div className="absolute left-0 top-6">
        <Image width={192} height={192} className="lg:w-48 w-24" src={car} alt="car" />
      </div>
      <div className="container relative mx-auto text-white">
        <div className="absolute right-10 top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="102"
            height="100"
            viewBox="0 0 102 100"
            fill="none"
          >
            <rect
              y="0.424011"
              width="102"
              height="99.0144"
              fill="url(#pattern0_5_601)"
            />
            <defs>
              <pattern
                id="pattern0_5_601"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_5_601"
                  transform="matrix(0.00980392 0 0 0.0100995 0 -0.0453752)"
                />
              </pattern>
              <image
                id="image0_5_601"
                width="102"
                height="108"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABsCAYAAACYRMcEAAAFj0lEQVR4Ae2d3VXcMBCFKYESqGClEiiBDtJCOkg6SDqgkDykBTqgBGE3QDIcxJkDWnGvVmPJeHhZYY1H0v2sH4/l3aurCf9SSjcppbsJq3bsKqWUbpdleV7X9duxlZiw9QLF4UwIRqrUAieE8BBj9J5mzZSFI1BCCM8Ox5pMQ89xOO+grOv68H9e+PHucJd/vedcIGNKKS7LkhzOBSJanepwrJTt4LcFTozxOsYYkeJ9WENUOmPDwokx3jKrqa3gSBTiTBNtD1tO2A1wqKWuNZzX+o+JQLDisZcJ659d6lrDYf2z+lTtWfGqzgqZrH+Ho0RkxVOnQknWv8NRsrLiqVOhJOt/RjhPT09/oMb2NmLFY8tn/c8Gh21vV3tWPLZw1r/DUQqz4qlToSTr3+EoWVnx5FQR8HQ6QYFM1n8jnN+qSdUk67/qzDqzQbwYQkizwGH1cThKsQb4VIRAFQUlWTgppethj8EbxNuk55xOp++Q2qQRC2dXEQKJFm8xrKHDJsnmZb60DKyy9anaT9hz7hj41cYVMr3nKFGs4auioKTDUTI5HCUGm7QWz9o/217Vc6CHZ7Ig2E1sbYMFAbXgEDjrut6LiAgoeQSO2E1hY31lW/sfutS1JmgtnrV/h6OukNZhLaUE3VSy/h3ORzj36lA1KT0HBSOODgEHfZmIHXaqJDpkfmk4r4G6R3T7q8PpcEWhLmTz27IsDgcVbEu7o8JBR4otWXwoy+F8kKR4QOa2YoblQYdTV1ciBJZR72rpDqcqjyzVXzbKWz3Mq5Z+NDhyy8C8nKUCn1Asrio2mzkjnJTST3TCZu9z2FuBQ8BBJ9QG8aiodIP/vhtIQgh/0WfquefIN1sgva6hcdSE2uB/P3BijDchhEcCDvW8YkLxMhwoUNpQ/349h4WD9BZt09C4LJ7Vjk8ZMSEw0o6G+jucfAGw4uXz0E/Wf9cFwdF6Dgol210AB5qTcznFT4dTlOXtYAOc2277CBzOG4digoVTdNJ60OHUlXM4Sh/rO3hVFJTcHRzZBIeGS9jGzQqH2acAUUeM2GEtRwiOBAfdUIjoTdk4HEqubY0dzrZ6U6U5HEquPsYyESOejghH2ixhFkSfrjbsvrKjwWFXg73hUPvKHE5X+evO2KWuw6nr2TXX4dTl9GFN6TNbhGAWOL+URmeTPqydlaZ/hgxr8g4j6lnBgWCyw6b3HJREwS7DCSFAQFvhoIFDdtixhl+QbLtDW8BBwUirHY5ibw1HFQUlHY6SyeEoMWZLOpzZiKj6vMKRn7GCdnKyCwJVFJRsHNbg1yBZ/59WWgSRnfSfGm5gMCEcNpZI7SitSpqjzMy9y+s7JdB21mrhhUyHo0TJYqBwsj36jF8VBSWt/bPDDlsf1n9VlFy4wynLlPVBL0aHU9YROsqKdwEc+E2DsxXPhe+95xCPzakJW/RhIxDMKyBnwUjGV4DDfONHvu9CX+aqimeduXc4uf7EnEC9aWetf9V/bhzadbM9Kka18EIm65+131vPuZZ7nYJOxUOsGNmJVYSArc+u4GTx0E9WDPHb8jY12jPZ+jgcRZoVgxWbtWfro5oyf9JaDNY/a+9w1DXGisGKzdqz9VFNGZeU1RqyMLAWg/XP2u8Ojvx8sFWEgBWDFZu1Z+szrrtcFiGAtjqxYrBiZ3v0Po2tzy7hoD2NFSOLzSylmdf22Po4HKUAC0edCiV3B0fmHGQxIK3P4s3ScyAiymhXcFS9oaTDgWQaY+RwxugOlepwIJnGGDmcMbpDpTocSKYxRl8Fjnx59hgFDUvdAg5zU8k2FX3ox/qdwt4azhSN3GslHM7E5BzODuCgv6n2pcMlE3OCquZwIJnGGDmcMbpDpTocSKYxRg5njO5QqRnOkC+Hg2p4YCOBM+qu/B8UFiSrncSvVgAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </div>
        <SectionStarter
          title="Facts By The Numbers"
          description="Here are some dreamsrent interesting facts presented by the numbers"
        />
        <div className="flex flex-col lg:flex-row gap-5 justify-center py-6">
          <div className="bg-white hover:bg-[#377384] text-black hover:text-white transition delay-300 rounded-lg flex gap-3 lg:p-4 p-2">
            <div className="bg-black lg:w-14 w-10 h-10 lg:h-14 p-2 rounded-md">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 39 40"
                fill="none"
              >
                <path
                  d="M33.7545 17.1146L31.5315 10.444C31.209 9.47299 30.5887 8.62835 29.7588 8.03003C28.9289 7.43172 27.9315 7.11018 26.9084 7.11109H12.0916C11.0685 7.11018 10.0711 7.43172 9.24119 8.03003C8.41125 8.62835 7.79098 9.47299 7.4685 10.444L5.2455 17.1146C4.655 17.3624 4.1507 17.7788 3.79575 18.3118C3.4408 18.8448 3.25096 19.4707 3.25 20.1111V28.2361C3.25 29.4597 3.93738 30.5143 4.93837 31.0685C4.91725 31.1757 4.875 31.2732 4.875 31.3853V34.7361C4.875 35.1671 5.0462 35.5804 5.35095 35.8851C5.6557 36.1899 6.06902 36.3611 6.5 36.3611H8.125C8.55598 36.3611 8.9693 36.1899 9.27405 35.8851C9.57879 35.5804 9.75 35.1671 9.75 34.7361V31.4861H29.25V34.7361C29.25 35.1671 29.4212 35.5804 29.726 35.8851C30.0307 36.1899 30.444 36.3611 30.875 36.3611H32.5C32.931 36.3611 33.3443 36.1899 33.649 35.8851C33.9538 35.5804 34.125 35.1671 34.125 34.7361V31.3853C34.125 31.2732 34.0828 31.1741 34.0616 31.0685C34.5709 30.7908 34.9963 30.3815 35.2933 29.8832C35.5903 29.385 35.748 28.8161 35.75 28.2361V20.1111C35.75 18.764 34.9245 17.607 33.7545 17.1146ZM6.5 28.2361V20.1111H32.5L32.5033 28.2361H6.5ZM12.0916 10.3611H26.9068C27.6071 10.3611 28.2279 10.8063 28.4489 11.4726L30.2461 16.8611H8.75388L10.5495 11.4726C10.6573 11.1489 10.8643 10.8673 11.1411 10.6678C11.4179 10.4683 11.7504 10.361 12.0916 10.3611Z"
                  fill="white"
                />
                <path
                  d="M10.5625 26.6111C11.9087 26.6111 13 25.5198 13 24.1736C13 22.8274 11.9087 21.7361 10.5625 21.7361C9.21631 21.7361 8.125 22.8274 8.125 24.1736C8.125 25.5198 9.21631 26.6111 10.5625 26.6111Z"
                  fill="white"
                />
                <path
                  d="M28.4375 26.6111C29.7837 26.6111 30.875 25.5198 30.875 24.1736C30.875 22.8274 29.7837 21.7361 28.4375 21.7361C27.0913 21.7361 26 22.8274 26 24.1736C26 25.5198 27.0913 26.6111 28.4375 26.6111Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="h-fit">
              <p className="font-bold">8K+</p>
              <p className="text-sm">Happy Customers</p>
            </div>
          </div>
          <div className="bg-white hover:bg-[#377384] text-black hover:text-white transition delay-300 rounded-lg flex gap-3 lg:p-4 p-2">
            <div className="bg-black lg:w-14 w-10 h-10 lg:h-14 p-2 rounded-md">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 39 40"
                fill="none"
              >
                <path
                  d="M32.5 20.1111V17.3372C32.5 10.119 26.8466 4.0756 19.8981 3.86597C16.3166 3.7831 12.9902 5.06197 10.4471 7.53197C9.19334 8.73987 8.19721 10.1892 7.51883 11.7926C6.84044 13.396 6.49387 15.1201 6.5 16.8611V20.1111C4.70762 20.1111 3.25 21.5687 3.25 23.3611V29.8611C3.25 31.6535 4.70762 33.1111 6.5 33.1111H9.75V16.8611C9.74521 15.5554 10.0049 14.2622 10.5135 13.0597C11.0221 11.8571 11.769 10.7699 12.7091 9.86384C13.6453 8.95251 14.7558 8.23942 15.974 7.76727C17.1922 7.29511 18.4932 7.07359 19.799 7.11597C25.012 7.27197 29.25 11.8577 29.25 17.3372V33.1111H32.5C34.2924 33.1111 35.75 31.6535 35.75 29.8611V23.3611C35.75 21.5687 34.2924 20.1111 32.5 20.1111Z"
                  fill="white"
                />
                <path
                  d="M11.375 20.1111H14.625V33.1111H11.375V20.1111ZM24.375 20.1111H27.625V33.1111H24.375V20.1111Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">27+</p>
              <p className="text-sm">Count of Cars</p>
            </div>
          </div>
          <div className="bg-white hover:bg-[#377384] text-black hover:text-white transition delay-300 rounded-lg flex gap-3 lg:p-4 p-2">
            <div className="bg-black lg:w-14 w-10 h-10 lg:h-14 p-2 rounded-md">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 39 40"
                fill="none"
              >
                <path
                  d="M19.5 8.07795C17.7294 6.44987 15.4119 5.54628 13.0065 5.5462C11.7334 5.54753 10.4731 5.80061 9.29818 6.29089C8.12324 6.78117 7.05686 7.49896 6.1604 8.40295C2.33678 12.2428 2.3384 18.2488 6.16365 22.0725L18.0782 33.9869C18.3544 34.4728 18.8874 34.7865 19.5 34.7865C19.7516 34.784 19.999 34.7226 20.2226 34.6072C20.4461 34.4918 20.6394 34.3255 20.787 34.1218L32.8364 22.0725C36.6617 18.2472 36.6617 12.2428 32.8332 8.39645C31.9371 7.49412 30.8716 6.77779 29.6978 6.28864C28.5241 5.79949 27.2652 5.54718 25.9935 5.5462C23.5882 5.5466 21.2708 6.45015 19.5 8.07795ZM30.5354 10.6942C33.0753 13.2471 33.0769 17.2348 30.5387 19.7747L19.5 30.8133L8.4614 19.7747C5.92315 17.2348 5.92478 13.2471 8.45815 10.7007C9.69315 9.4722 11.3084 8.7962 13.0065 8.7962C14.7047 8.7962 16.3134 9.4722 17.5387 10.6975L18.3512 11.51C18.5019 11.661 18.681 11.7808 18.8782 11.8626C19.0753 11.9443 19.2866 11.9864 19.5 11.9864C19.7134 11.9864 19.9248 11.9443 20.1219 11.8626C20.319 11.7808 20.4981 11.661 20.6489 11.51L21.4614 10.6975C23.9184 8.24533 28.0817 8.25183 30.5354 10.6942Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">1k+</p>
              <p className="text-sm">Car Center Solutions</p>
            </div>
          </div>
          <div className="bg-white hover:bg-[#377384] text-black hover:text-white transition delay-300 rounded-lg flex gap-3 lg:p-4 p-2">
            <div className="bg-black lg:w-14 w-10 h-10 lg:h-14 p-2 rounded-md">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 39 40"
                fill="none"
              >
                <path
                  d="M19.5 13.6111V21.7361H27.625V18.4861H22.75V13.6111H19.5Z"
                  fill="white"
                />
                <path
                  d="M34.5995 14.4187C33.8665 12.6801 32.8024 11.1005 31.4665 9.76798C29.4443 7.74577 26.8738 6.36052 24.0728 5.78348C22.1286 5.38777 20.1247 5.38777 18.1805 5.78348C15.3768 6.35683 12.8041 7.74322 10.7835 9.7696C9.45082 11.1035 8.38716 12.6814 7.6505 14.4171C6.88855 16.2186 6.49727 18.1551 6.5 20.1111L6.50162 20.1517H3.25L8.125 26.6111L13 20.1517H9.75163L9.75 20.1111C9.74532 17.8448 10.4219 15.6295 11.6919 13.7525C12.5111 12.5413 13.554 11.4978 14.7648 10.678C15.9964 9.84826 17.3779 9.2665 18.8321 8.96523C21.7872 8.35764 24.8627 8.94838 27.3824 10.6076C29.9021 12.2668 31.6599 14.8586 32.2692 17.8134C32.5758 19.3277 32.5758 20.888 32.2692 22.4024C31.9719 23.8578 31.3899 25.2401 30.5565 26.4697C30.1503 27.0726 29.6839 27.6397 29.1688 28.1532C28.1306 29.19 26.9033 30.0181 25.5531 30.5924C24.8655 30.883 24.1508 31.1051 23.4195 31.2554C21.9057 31.5617 20.3459 31.5617 18.8321 31.2554C17.3782 30.9573 15.9973 30.3758 14.768 29.5442C14.1634 29.1357 13.5992 28.6705 13.0829 28.1549L10.7851 30.4526C12.1422 31.8115 13.754 32.8894 15.5283 33.6244C17.3026 34.3595 19.2045 34.7372 21.125 34.7361C23.08 34.7353 25.0151 34.3447 26.8174 33.5872C29.4298 32.482 31.6648 30.6415 33.2507 28.2897C34.883 25.8748 35.7536 23.0259 35.75 20.1111C35.7541 18.1555 35.3627 16.2193 34.5995 14.4187Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">1k+</p>
              <p className="text-sm">Total Kilometer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
