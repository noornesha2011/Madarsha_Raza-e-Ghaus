import { useRef, useState } from "react";
import { verifyReceipt } from "../../api/receiptApi";

const ReceiptVerification = () => {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const receiptRef = useRef<HTMLDivElement>(null);

  const [receiptData, setReceiptData] = useState<any>(null);

  const handleVerify = async () => {
    if (!receiptNumber.trim()) return;

    try {
      setLoading(true);

      const data = await verifyReceipt(receiptNumber.trim());

      setReceiptData(data);
    } catch (error) {
      console.error(error);
      alert("Receipt not found");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-lg mx-auto">

      {/* Search */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="text-sm text-gray-500 mt-1 mb-5">
          Enter your receipt number to verify your donation.
        </h3>

        <input
          type="text"
          value={receiptNumber}
          onChange={(e) => setReceiptNumber(e.target.value)}
          placeholder="MRE2026000000"
          className="w-full border border-gray-300 rounded-lg
                     px-4 py-3 outline-none
                     focus:border-[#163832]"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-4 bg-[#163832] text-white
                     py-3 rounded-lg
                     disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Receipt"}
        </button>

      </div>

      {/* Receipt */}
      {receiptData && (
        <div className="mt-6">

          <div
            ref={receiptRef}
            className="print-area bg-white rounded-xl overflow-hidden"
          >


            {/* Receipt Header */}
            <div className="bg-[#163832] text-white p-6 text-center">

              <h1 className="text-xl font-bold">
                Madarsha Raza-E-Gaush
              </h1>

              <p className="text-sm text-gray-300">
                02, Darji Tola, Bishunpura, Gopalganj, Bihar
              </p>

              <div className="mt-4">
                <p className="text-xs text-gray-300">
                  DONATION RECEIPT
                </p>

                <p className="font-bold text-lg">
                  {receiptData.receipt.receipt_number}
                </p>
              </div>

            </div>

            {/* Receipt Details */}
            <div className="p-6 space-y-4">

              <ReceiptRow
                label="Donor Name"
                value={receiptData.donor.name}
              />

              <ReceiptRow
                label="Mobile"
                value={receiptData.donor.mobile ?? "N/A"}
              />

              <ReceiptRow
                label="Address"
                value={receiptData.donor.address ?? "N/A"}
              />

              <ReceiptRow
                label="Donation Type"
                value={receiptData.donation.donation_type}
              />

              <ReceiptRow
                label="Amount"
                value={`₹${receiptData.donation.amount}`}
              />

              <ReceiptRow
                label="Payment Status"
                value={receiptData.payment.status ?? "N/A"}
              />

              <ReceiptRow
                label="Payment ID"
                value={receiptData.payment.payment_id ?? "N/A"}
              />

            </div>

            {/* Footer */}
            <div className="border-t p-5 text-center">

              <p className="text-sm text-gray-500">
                Thank you for your generous donation.
              </p>

              <p className="text-xs text-gray-400 mt-2">
                This receipt is electronically generated.
              </p>

            </div>

          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="no-print w-full mt-4 bg-[#163832]
             text-white py-3 rounded-lg"
          >
            🖨️ Print Receipt
          </button>

        </div>
      )}

    </div>
  );
};

interface ReceiptRowProps {
  label: string;
  value: string;
}

const ReceiptRow = ({
  label,
  value,
}: ReceiptRowProps) => {
  return (
    <div className="flex justify-between gap-4
                    border-b pb-3">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-medium text-right">
        {value}
      </span>

    </div>
  );
};

export default ReceiptVerification;