import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface DonorData {
  id: number;
  name: string;
  mobile?: string | null;
  address?: string | null;
}

export interface DonationData {
  amount: number;
  donation_type: string;
  month?: number | null;
  year?: number | null;
}

export interface PaymentData {
  payment_id?: string | null;
  status?: string | null;
}

export interface ReceiptData {
  // Add the exact fields from your ReceiptData schema
  receipt_number: string;
  cancelled_reason?:string;
  cancelled_at?:string;
  issued_at: string;
  status:string
}

export interface ReceiptResponse {
  receipt: ReceiptData;
  donor: DonorData;
  donation: DonationData;
  payment: PaymentData;
}

export const verifyReceipt = async (
  receiptNumber: string
): Promise<ReceiptResponse> => {
  const response = await axios.get<ReceiptResponse>(
    `${API_BASE_URL}/donor/receipt/status/${receiptNumber}`
  );
  

  return response.data;
};