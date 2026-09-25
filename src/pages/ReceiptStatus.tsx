import ReceiptVerification  from "../components/ui/ReceiptVerification";

const ReceiptStatus = () => {
  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#163832]">
            Receipt Verification
          </h1>

          <p className="text-gray-500 mt-2">
            Verify the authenticity of your Madarsa donation receipt.
          </p>
        </div>

        <ReceiptVerification />

      </div>
    </main>
  );
};

export default ReceiptStatus;






// import React from 'react'

// type Props = {}

// const ReceiptStatus = (props: Props) => {
//   return (
//     <div>ReceiptStatus</div>
//   )
// }

// export default ReceiptStatus;