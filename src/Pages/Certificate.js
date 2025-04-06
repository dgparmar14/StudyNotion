import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const handleDownload = () => {
    const cert = document.getElementById("certificate");

    html2canvas(cert, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", [800, 600]);
      pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
      pdf.save("certificate.pdf");
    });
  };
  return (
    <div className="">
      <button
        className="mt-3 mb-3 text-black bg-yellow-100 border border-black font-semibold rounded-md px-6 py-2 hover:scale-95 transition-all"
        onClick={handleDownload}
      >
        Download Certificate
      </button>
      <div class="bg-richblack-400 font-sans text-richblack-800">
        <div
          id="certificate"
          class="relative w-[800px] h-[600px] mx-auto bg-[#618597] p-8 shadow-lg"
        >
          {/* <!-- Outer Border --> */}
          <div class="absolute border-2 border-white w-[794px] h-[594px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          {/* <!-- Inner Border --> */}
          <div class="absolute border-2 border-white w-[730px] h-[530px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          {/* <!-- Certificate Box --> */}
          <div class="absolute w-[720px] h-[520px] bg-white border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6">
            {/* <!-- Header --> */}
            <div class="text-center mt-10 mb-4">
              <h2 class="text-3xl font-bold ">Certificate of Completion</h2>
            </div>

            {/* <!-- Name Section --> */}
            <div class="w-[650px] mx-auto mt-10">
              <div class="border-b border-richblack-600 py-1 mb-4 text-center">
                <p className="text-xl font-cursive">
                  This certificate is presented to
                </p>
                <p class="text-2xl font-Semibold">Vivek Patel</p>
              </div>

              {/* <!-- Course Title--> */}
              <div class="text-center mt-10 mb-4">
                <p class="font-cursive text-xl">
                  for completing the course entitled
                </p>
                <p class="font-Semibold text-3xl">Data Science</p>
                {/* description of the course */}
                <p class="text-sm mt-2 font-Semibold">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              {/* <!-- Course Title --> */}
              <div class="border-richblack-600 py-1 mb-4 text-center"></div>
            </div>

            {/* <!-- Footer Section --> */}
            <div class="absolute bottom-6 w-[650px] left-1/2 -translate-x-1/2 flex justify-between text-center text-xs">
              {/* <!-- Left Side --> */}
              <div className="border-richblack-600 ">
                <p>Completon Date :</p>
                <div class="w-full mt-2 font-Semibold text-[16px]">
                  30/03/2025
                </div>
              </div>

              {/* <!-- Right Side --> */}
              <div>
                <p>Instructor of Course :</p>
                <div class="w-full mt-2 font-Semibold text-[16px]">
                  M. K. Trivedi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
