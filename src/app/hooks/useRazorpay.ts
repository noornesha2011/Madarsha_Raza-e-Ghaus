import { useCallback, useState } from "react";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../api/paymentApi";


// =====================================================
// RAZORPAY KEY
// =====================================================

const RAZORPAY_KEY_ID =
  import.meta.env.VITE_RAZORPAY_KEY_ID;


// =====================================================
// DONOR DETAILS
// =====================================================

interface DonorDetails {
  name?: string;
  email?: string;
  contact?: string;
}


// =====================================================
// HOOK OPTIONS
// =====================================================

interface UseRazorpayOptions {
  onSuccess?: (
    response: RazorpayResponse
  ) => void;

  onError?: (
    error: unknown
  ) => void;
}


// =====================================================
// RAZORPAY HOOK
// =====================================================

export default function useRazorpay({
  onSuccess,
  onError,
}: UseRazorpayOptions = {}) {

  const [loading, setLoading] =
    useState(false);


  // ===================================================
  // OPEN PAYMENT
  // ===================================================

  const openPayment = useCallback(
    async (
      amount: number,
      donationType: string,
      donor?: DonorDetails
    ) => {

      // -----------------------------------------------
      // 1. Validate amount
      // -----------------------------------------------

      if (!amount || amount <= 0) {

        const error = new Error(
          "Donation amount must be greater than zero."
        );

        console.error(error);

        onError?.(error);

        return;
      }


      // -----------------------------------------------
      // 2. Check Razorpay key
      // -----------------------------------------------

      if (!RAZORPAY_KEY_ID) {

        const error = new Error(
          "Razorpay key is missing. Check VITE_RAZORPAY_KEY_ID."
        );

        console.error(error);

        onError?.(error);

        return;
      }


      // -----------------------------------------------
      // 3. Check Razorpay script
      // -----------------------------------------------

      if (!window.Razorpay) {

        const error = new Error(
          "Razorpay Checkout script is not loaded."
        );

        console.error(error);

        onError?.(error);

        return;
      }


      try {

        setLoading(true);


        // =============================================
        // 4. CREATE ORDER
        // =============================================

        const order =
          await createPaymentOrder(
            amount,
            donationType
          );


        console.log(
          "Backend payment order:",
          order
        );


        // =============================================
        // 5. CONVERT RUPEES TO PAISE
        // =============================================

        const razorpayAmount =
          Math.round(
            Number(order.amount) * 100
          );


        console.log(
          "Backend amount:",
          order.amount
        );

        console.log(
          "Razorpay amount:",
          razorpayAmount,
          "paise"
        );


        // =============================================
        // 6. RAZORPAY OPTIONS
        // =============================================

        const options: RazorpayOptions = {

          key: RAZORPAY_KEY_ID,


          // ₹500 = 50000 paise
          amount: razorpayAmount,


          currency:
            order.currency,


          name:
            "Madarsa Raza-e-Gaus",


          description:
            donationType,


          // IMPORTANT
          // Backend returns provider_order_id
          order_id:
            order.provider_order_id,


          // -------------------------------------------
          // Donor information
          // -------------------------------------------

          prefill: {

            name:
              donor?.name,

            email:
              donor?.email,

            contact:
              donor?.contact,
          },


          // -------------------------------------------
          // Razorpay notes
          // -------------------------------------------

          notes: {

            donation_type:
              donationType,
          },


          // -------------------------------------------
          // Theme
          // -------------------------------------------

          theme: {

            color:
              "#163832",
          },


          // ===========================================
          // 7. PAYMENT SUCCESS
          // ===========================================

          handler: async (
            response: RazorpayResponse
          ) => {

            console.log(
              "Razorpay payment response:",
              response
            );


            try {

              // =======================================
              // 8. CREATE VERIFICATION PAYLOAD
              // =======================================

              const verificationPayload = {

                provider_order_id:
                  response.razorpay_order_id,

                provider_payment_id:
                  response.razorpay_payment_id,

                signature:
                  response.razorpay_signature,
              };


              console.log(
                "Verification payload:",
                verificationPayload
              );


              // =======================================
              // 9. VERIFY PAYMENT
              // =======================================

              const result =
                await verifyPayment(
                  verificationPayload
                );


              console.log(
                "Payment verification result:",
                result
              );


              // =======================================
              // 10. SUCCESS
              // =======================================

              onSuccess?.(
                response
              );

            } catch (error: any) {

              // =======================================
              // PAYMENT VERIFICATION ERROR
              // =======================================

              console.error(
                "Payment verification failed"
              );


              console.error(
                "HTTP status:",
                error?.response?.status
              );


              console.error(
                "Backend response:",
                error?.response?.data
              );


              console.error(
                "Error:",
                error
              );


              onError?.(
                error
              );

            } finally {

              setLoading(false);

            }
          },


          // ===========================================
          // 11. CHECKOUT CLOSED
          // ===========================================

          modal: {

            ondismiss: () => {

              console.log(
                "Razorpay Checkout dismissed"
              );

              setLoading(false);
            },
          },
        };


        // =============================================
        // 12. CREATE RAZORPAY INSTANCE
        // =============================================

        const razorpay =
          new window.Razorpay(
            options
          );


        // =============================================
        // 13. PAYMENT FAILED
        // =============================================

        razorpay.on(
          "payment.failed",
          (response: unknown) => {

            console.error(
              "Razorpay payment failed:",
              response
            );


            setLoading(false);


            onError?.(
              response
            );
          }
        );


        // =============================================
        // 14. OPEN CHECKOUT
        // =============================================

        razorpay.open();

      } catch (error: any) {

        console.error(
          "Unable to create payment order:",
          error?.response?.data ||
            error
        );


        setLoading(false);


        onError?.(
          error
        );
      }
    },

    [
      onSuccess,
      onError,
    ]
  );


  // ===================================================
  // RETURN
  // ===================================================

  return {

    openPayment,

    loading,
  };
}