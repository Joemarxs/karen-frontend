export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customer_name: string;
  customer_phone: string;
  payment_method: "mpesa";
  total_amount: number;
  items: OrderItem[];
}

export interface CreateOrderResponse {
  id: number;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  // ...other order fields
}

export interface MpesaInitiateRequest {
  phone: string;
  amount: number;
  order_id: number;
}

export interface MpesaInitiateResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface MpesaStatusResponse {
  order_paid: boolean;
}

