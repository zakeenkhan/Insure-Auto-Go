import Image from "next/image"
import logo from "./LOGO.png"
export const Footer = () => {
  return (
    <div className="py-10 pt-12 bg-[#15182E]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-[#E18B20] rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="40"
                viewBox="0 0 30 40"
                fill="none"
              >
                <path
                  d="M0.9375 14.0625C0.9375 21.0091 6.2407 28.5456 10.9202 35.0584C12.0325 36.6057 13.098 38.0877 14.0249 39.4781C14.2423 39.8043 14.6086 40 14.9999 40C15.3912 40 15.7575 39.8043 15.9749 39.4781C16.9019 38.0877 17.9673 36.6056 19.0797 35.0584C23.7593 28.5456 29.0625 21.0091 29.0625 14.0625C29.0625 6.30797 22.7545 0 15 0C7.24547 0 0.9375 6.30797 0.9375 14.0625ZM22.0312 14.0625C22.0312 17.9398 18.8773 21.0938 15 21.0938C11.1227 21.0938 7.96875 17.9398 7.96875 14.0625C7.96875 10.1852 11.1227 7.03125 15 7.03125C18.8773 7.03125 22.0312 10.1852 22.0312 14.0625Z"
                  fill="white"
                />
                <path
                  d="M15 18.75C17.5888 18.75 19.6875 16.6513 19.6875 14.0625C19.6875 11.4737 17.5888 9.375 15 9.375C12.4112 9.375 10.3125 11.4737 10.3125 14.0625C10.3125 16.6513 12.4112 18.75 15 18.75Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">
                Comsats University Abbottabad
              </p>
              <p className="text-white mt-2">
                Street 123, Abbottabad, Pakistan{" "}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-[#E18B20] rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M38.6798 8.92375C38.5169 7.83484 37.9693 6.84032 37.1362 6.12048C36.3031 5.40064 35.2396 5.00313 34.1386 5H5.86107C4.76005 5.00313 3.69659 5.40064 2.86346 6.12048C2.03034 6.84032 1.4827 7.83484 1.31982 8.92375L19.9998 21.0112L38.6798 8.92375Z"
                  fill="white"
                />
                <path
                  d="M20.6787 23.55C20.4765 23.6807 20.2408 23.7503 20 23.7503C19.7592 23.7503 19.5235 23.6807 19.3212 23.55L1.25 11.8575V30.3887C1.25132 31.6113 1.73758 32.7834 2.60207 33.6479C3.46656 34.5124 4.63868 34.9986 5.86125 35H34.1388C35.3613 34.9986 36.5334 34.5124 37.3979 33.6479C38.2624 32.7834 38.7487 31.6113 38.75 30.3887V11.8562L20.6787 23.55Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">SEND MAIL US</p>
              <p className="text-white mt-2">insureAutoGo@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-[#E18B20] rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_75_805)">
                  <path
                    d="M26.626 0H13.3169C10.9681 0.00266335 9.06483 1.90596 9.0625 4.25471V35.7455C9.06483 38.0943 10.9681 39.9976 13.3169 39.9999H26.626C28.9747 39.9976 30.878 38.0943 30.8807 35.7455V4.25471C30.878 1.90596 28.9747 0.00266335 26.626 0ZM19.9716 36.3637C18.9672 36.3637 18.1532 35.5498 18.1532 34.5453C18.1532 33.5413 18.9672 32.7273 19.9716 32.7273C20.9757 32.7273 21.7897 33.5413 21.7897 34.5453C21.7897 35.5498 20.9757 36.3637 19.9716 36.3637ZM22.6989 5.45455H17.2443C16.7423 5.45455 16.3351 5.04739 16.3351 4.54534C16.3351 4.0433 16.7423 3.63647 17.2443 3.63647H22.6989C23.2009 3.63647 23.6077 4.0433 23.6077 4.54534C23.6077 5.04739 23.2009 5.45455 22.6989 5.45455Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_75_805">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-xs">CALL US 24/7</p>
              <p className="text-white mt-2">+92 3439644996</p>
            </div>
          </div>
        </div>
        {/* line-break */}
        <div className="flex items-center py-10">
          <div className="p-2 bg-[#E18B20] rounded-sm"></div>
          <div className="h-[1px] bg-gray-400 w-full"></div>
          <div className="p-2 bg-[#E18B20] rounded-sm"></div>
        </div>
        {/* social-links */}
        <div className="flex justify-center py-5">
          <div className="flex flex-col lg:flex-row lg:w-4/5 justify-between">
            <div className="py-5 lg:w-2/5">
              <div className="w-1/6 text-nowrap">
                <a href="/" className="text-white font-bold text-xl">
                  INSURE <span className="text-[#E18B20]">AUTOGO</span>
                </a>
              </div>
              <div className="py-4">
                <p className="text-gray-400">
                  Every summer, Alten Construction hires a number of college
                  interns to help further their knowledge of the construction
                  industry and…
                </p>
              </div>
              <div className="flex gap-3">
                <div>
                  <a
                    className="w-full"
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect width="48" height="48" rx="7" fill="#313337" />
                      <path
                        d="M28.1836 25.375H25.5469V33.25H22.0312V25.375H19.1484V22.1406H22.0312V19.6445C22.0312 16.832 23.7188 15.25 26.2852 15.25C27.5156 15.25 28.8164 15.4961 28.8164 15.4961V18.2734H27.375C25.9688 18.2734 25.5469 19.1172 25.5469 20.0312V22.1406H28.6758L28.1836 25.375Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    href="https://x.com/?lang=en"
                    className="w-full"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect width="48" height="48" rx="7" fill="#313337" />
                      <path
                        d="M31.1367 20.5938C31.1367 20.7695 31.1367 20.9102 31.1367 21.0859C31.1367 25.9727 27.4453 31.5625 20.6602 31.5625C18.5508 31.5625 16.6172 30.9648 15 29.9102C15.2812 29.9453 15.5625 29.9805 15.8789 29.9805C17.6016 29.9805 19.1836 29.3828 20.4492 28.3984C18.832 28.3633 17.4609 27.3086 17.0039 25.832C17.25 25.8672 17.4609 25.9023 17.707 25.9023C18.0234 25.9023 18.375 25.832 18.6562 25.7617C16.9688 25.4102 15.7031 23.9336 15.7031 22.1406V22.1055C16.1953 22.3867 16.793 22.5273 17.3906 22.5625C16.3711 21.8945 15.7383 20.7695 15.7383 19.5039C15.7383 18.8008 15.9141 18.168 16.2305 17.6406C18.0586 19.8555 20.8008 21.332 23.8594 21.5078C23.7891 21.2266 23.7539 20.9453 23.7539 20.6641C23.7539 18.625 25.4062 16.9727 27.4453 16.9727C28.5 16.9727 29.4492 17.3945 30.1523 18.1328C30.9609 17.957 31.7695 17.6406 32.4727 17.2188C32.1914 18.0977 31.6289 18.8008 30.8555 19.2578C31.5938 19.1875 32.332 18.9766 32.9648 18.6953C32.4727 19.4336 31.8398 20.0664 31.1367 20.5938Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    className="w-full"
                    target="_blank"
                    href="https://www.instagram.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect width="48" height="48" rx="7" fill="#313337" />
                      <path
                        d="M24 20.1074C26.3379 20.1074 28.2676 22.0371 28.2676 24.375C28.2676 26.75 26.3379 28.6426 24 28.6426C21.625 28.6426 19.7324 26.75 19.7324 24.375C19.7324 22.0371 21.625 20.1074 24 20.1074ZM24 27.1582C25.5215 27.1582 26.7461 25.9336 26.7461 24.375C26.7461 22.8535 25.5215 21.6289 24 21.6289C22.4414 21.6289 21.2168 22.8535 21.2168 24.375C21.2168 25.9336 22.4785 27.1582 24 27.1582ZM29.418 19.959C29.418 20.5156 28.9727 20.9609 28.416 20.9609C27.8594 20.9609 27.4141 20.5156 27.4141 19.959C27.4141 19.4023 27.8594 18.957 28.416 18.957C28.9727 18.957 29.418 19.4023 29.418 19.959ZM32.2383 20.9609C32.3125 22.334 32.3125 26.4531 32.2383 27.8262C32.1641 29.1621 31.8672 30.3125 30.9023 31.3145C29.9375 32.2793 28.75 32.5762 27.4141 32.6504C26.041 32.7246 21.9219 32.7246 20.5488 32.6504C19.2129 32.5762 18.0625 32.2793 17.0605 31.3145C16.0957 30.3125 15.7988 29.1621 15.7246 27.8262C15.6504 26.4531 15.6504 22.334 15.7246 20.9609C15.7988 19.625 16.0957 18.4375 17.0605 17.4727C18.0625 16.5078 19.2129 16.2109 20.5488 16.1367C21.9219 16.0625 26.041 16.0625 27.4141 16.1367C28.75 16.2109 29.9375 16.5078 30.9023 17.4727C31.8672 18.4375 32.1641 19.625 32.2383 20.9609ZM30.457 29.2734C30.9023 28.1973 30.791 25.5996 30.791 24.375C30.791 23.1875 30.9023 20.5898 30.457 19.4766C30.1602 18.7715 29.6035 18.1777 28.8984 17.918C27.7852 17.4727 25.1875 17.584 24 17.584C22.7754 17.584 20.1777 17.4727 19.1016 17.918C18.3594 18.2148 17.8027 18.7715 17.5059 19.4766C17.0605 20.5898 17.1719 23.1875 17.1719 24.375C17.1719 25.5996 17.0605 28.1973 17.5059 29.2734C17.8027 30.0156 18.3594 30.5723 19.1016 30.8691C20.1777 31.3145 22.7754 31.2031 24 31.2031C25.1875 31.2031 27.7852 31.3145 28.8984 30.8691C29.6035 30.5723 30.1973 30.0156 30.457 29.2734Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    className="w-full"
                    target="_blank"
                    href="https://pk.linkedin.com/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <rect width="48" height="48" rx="7" fill="#313337" />
                      <path
                        d="M19.6406 31H16.3711V20.4883H19.6406V31ZM17.9883 19.082C16.9688 19.082 16.125 18.2031 16.125 17.1484C16.125 16.1289 16.9688 15.2852 17.9883 15.2852C19.043 15.2852 19.8867 16.1289 19.8867 17.1484C19.8867 18.2031 19.043 19.082 17.9883 19.082ZM31.8398 31H28.6055V25.9023C28.6055 24.6719 28.5703 23.125 26.8828 23.125C25.1953 23.125 24.9492 24.4258 24.9492 25.7969V31H21.6797V20.4883H24.8086V21.9297H24.8438C25.3008 21.1211 26.3555 20.2422 27.9375 20.2422C31.2422 20.2422 31.875 22.4219 31.875 25.2344V31H31.8398Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* page-links */}
            <div>
              <p className="text-white font-bold">Quick Links</p>
              <nav className="mt-5">
                <ul className="text-white text-sm">
                  <li className="hover:text-[#E18B20] mt-1 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="13"
                      viewBox="0 0 5 13"
                      fill="none"
                    >
                      <path
                        d="M1 11.5L4 6.41943L1 1.5"
                        stroke="#E18B20"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <a href="/">Home</a>
                  </li>
                  <li className="hover:text-[#E18B20] mt-2 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="13"
                      viewBox="0 0 5 13"
                      fill="none"
                    >
                      <path
                        d="M1 11.5L4 6.41943L1 1.5"
                        stroke="#E18B20"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <a href="/cars">Cars</a>
                  </li>
                  <li className="hover:text-[#E18B20] mt-2 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="13"
                      viewBox="0 0 5 13"
                      fill="none"
                    >
                      <path
                        d="M1 11.5L4 6.41943L1 1.5"
                        stroke="#E18B20"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <a href="/drivers">Drivers</a>
                  </li>
                  <li className="hover:text-[#E18B20] mt-2 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="13"
                      viewBox="0 0 5 13"
                      fill="none"
                    >
                      <path
                        d="M1 11.5L4 6.41943L1 1.5"
                        stroke="#E18B20"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <a href="">Contact Us</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* line-break */}
        <div className="flex items-center py-5">
          <div className="p-2 bg-[#E18B20] rounded-sm"></div>
          <div className="h-[1px] bg-gray-400 w-full"></div>
          <div className="p-2 bg-[#E18B20] rounded-sm"></div>
        </div>
        <div className="flex justify-center text-center pt-4">
          <p className="text-white">© 2024 InsureAutoGo. All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}
