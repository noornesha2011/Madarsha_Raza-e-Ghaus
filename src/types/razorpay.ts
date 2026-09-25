export {};

declare global {

  // ===============================================
  // RAZORPAY PAYMENT RESPONSE
  // ===============================================

  interface RazorpayResponse {

    razorpay_payment_id: string;

    razorpay_order_id: string;

    razorpay_signature: string;
  }


  // ===============================================
  // RAZORPAY OPTIONS
  // ===============================================

  interface RazorpayOptions {

    key: string;

    amount: number;

    currency: string;

    name: string;

    description?: string;

    image?: string;

    order_id: string;


    prefill?: {

      name?: string;

      email?: string;

      contact?: string;
    };


    notes?: Record<
      string,
      string
    >;


    theme?: {

      color?: string;
    };


    handler: (
      response: RazorpayResponse
    ) => void;


    modal?: {

      ondismiss?: () => void;
    };
  }


  // ===============================================
  // RAZORPAY INSTANCE
  // ===============================================

  interface RazorpayInstance {

    open: () => void;

    on: (
      event: string,
      callback: (
        response: unknown
      ) => void
    ) => void;
  }


  // ===============================================
  // WINDOW
  // ===============================================

  interface Window {

    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}