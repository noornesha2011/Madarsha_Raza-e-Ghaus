import api from "./axios";

// =====================================================
// CREATE PAYMENT ORDER
// =====================================================

export interface CreateOrderResponse {
  payment_id: number;
  provider: string;
  provider_order_id: string;
  amount: string;
  currency: string;
  status: string;
}

// =====================================================
// PAYMENT SUCCESS RESPONSE
// =====================================================

export interface PaymentSuccessResponse {
  message: string;
  payment_id: number;
  donation_id: number;
  receipt_id: number;
  receipt_number: string;
}

// =====================================================
// CREATE PAYMENT ORDER
// =====================================================

export const createPaymentOrder = async (
  amount: number,
  donationType: string
): Promise<CreateOrderResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated.");
  }

  const response = await api.post<CreateOrderResponse>(
    "/donor/donation/payment/order",
    {
      amount,
      donation_type: donationType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// =====================================================
// VERIFY PAYMENT
// =====================================================

export interface VerifyPaymentRequest {
  provider_order_id: string;
  provider_payment_id: string;
  signature: string;
}

export const verifyPayment = async (
  data: VerifyPaymentRequest
): Promise<PaymentSuccessResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated.");
  }

  console.log("Sending payment verification request:", data);

  const response = await api.post<PaymentSuccessResponse>(
    "/donor/donation/payment/verify",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};