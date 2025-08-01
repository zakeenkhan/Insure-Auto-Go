import { SectionStarter } from "../sectionStarter"
import Slider from "../slider/slider"
import "./style.css"
export const CarTypeCarousel = () => {
  return (
    <div className="container mx-auto">
      <SectionStarter
        title="Most Popular Cartypes"
        description="Most popular worldwide Car Category due to their reliability, affordability, and features."
      />
      <div className="flex justify-center">
        <div className="py-4 w-11/12">
          <Slider
            options={{
              autoPlay: 4000,
              pauseAutoPlayOnHover: true,
              contain: true,
              wrapAround: true,
              adaptiveHeight: true,
              pageDots: false,
            }}
          >
            <div className="w-1/5 mt-5 hover:bg-[#377384] hover:text-white hover:fill-white mx-3 bg-white py-5 fill-black drop-shadow-lg rounded-lg flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="104"
                height="48"
                viewBox="0 0 104 48"
                fill=""
              >
                <mask
                  id="mask0_5_587"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="104"
                  height="48"
                >
                  <rect
                    x="0.5"
                    width="103"
                    height="48"
                    fill="url(#pattern0_5_587)"
                  />
                </mask>
                <g mask="url(#mask0_5_587)">
                  <rect x="0.5" width="103" height="48" fill="" />
                </g>
                <defs>
                  <pattern
                    id="pattern0_5_587"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_5_587"
                      transform="scale(0.00970874 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_5_587"
                    width="103"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <p className="font-bold text-xl py-5">Pickup</p>
              <p>3 Cars</p>
            </div>
            <div className="w-1/5 mt-5 hover:bg-[#377384] hover:text-white hover:fill-white transition duration-300 mx-3 bg-white py-5 fill-black drop-shadow-lg rounded-lg flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="104"
                height="48"
                viewBox="0 0 104 48"
                fill=""
              >
                <mask
                  id="mask0_5_587"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="104"
                  height="48"
                >
                  <rect
                    x="0.5"
                    width="103"
                    height="48"
                    fill="url(#pattern0_5_587)"
                  />
                </mask>
                <g mask="url(#mask0_5_587)">
                  <rect x="0.5" width="103" height="48" fill="" />
                </g>
                <defs>
                  <pattern
                    id="pattern0_5_587"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_5_587"
                      transform="scale(0.00970874 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_5_587"
                    width="103"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <p className="font-bold text-xl py-5">Pickup</p>
              <p>3 Cars</p>
            </div>
            <div className="w-1/5 mt-5 hover:bg-[#377384] hover:text-white hover:fill-white transition duration-300 mx-3 bg-white py-5 fill-black drop-shadow-lg rounded-lg flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="104"
                height="48"
                viewBox="0 0 104 48"
                fill=""
              >
                <mask
                  id="mask0_5_587"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="104"
                  height="48"
                >
                  <rect
                    x="0.5"
                    width="103"
                    height="48"
                    fill="url(#pattern0_5_587)"
                  />
                </mask>
                <g mask="url(#mask0_5_587)">
                  <rect x="0.5" width="103" height="48" fill="" />
                </g>
                <defs>
                  <pattern
                    id="pattern0_5_587"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_5_587"
                      transform="scale(0.00970874 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_5_587"
                    width="103"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <p className="font-bold text-xl py-5">Pickup</p>
              <p>3 Cars</p>
            </div>
            <div className="w-1/5 mt-5 hover:bg-[#377384] hover:text-white hover:fill-white transition duration-300 mx-3 bg-white py-5 fill-black drop-shadow-lg rounded-lg flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="104"
                height="48"
                viewBox="0 0 104 48"
                fill=""
              >
                <mask
                  id="mask0_5_587"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="104"
                  height="48"
                >
                  <rect
                    x="0.5"
                    width="103"
                    height="48"
                    fill="url(#pattern0_5_587)"
                  />
                </mask>
                <g mask="url(#mask0_5_587)">
                  <rect x="0.5" width="103" height="48" fill="" />
                </g>
                <defs>
                  <pattern
                    id="pattern0_5_587"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_5_587"
                      transform="scale(0.00970874 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_5_587"
                    width="103"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <p className="font-bold text-xl py-5">Pickup</p>
              <p>3 Cars</p>
            </div>
            <div className="w-1/5 mt-5 hover:bg-[#377384] hover:text-white hover:fill-white transition duration-300 mx-3 bg-white py-5 fill-black drop-shadow-lg rounded-lg flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="104"
                height="48"
                viewBox="0 0 104 48"
                fill=""
              >
                <mask
                  id="mask0_5_587"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="104"
                  height="48"
                >
                  <rect
                    x="0.5"
                    width="103"
                    height="48"
                    fill="url(#pattern0_5_587)"
                  />
                </mask>
                <g mask="url(#mask0_5_587)">
                  <rect x="0.5" width="103" height="48" fill="" />
                </g>
                <defs>
                  <pattern
                    id="pattern0_5_587"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_5_587"
                      transform="scale(0.00970874 0.0208333)"
                    />
                  </pattern>
                  <image
                    id="image0_5_587"
                    width="103"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <p className="font-bold text-xl py-5">Pickup</p>
              <p>3 Cars</p>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}
