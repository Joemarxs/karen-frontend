import axios from 'axios';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  MpesaInitiateRequest,
  MpesaInitiateResponse,
  MpesaStatusResponse
} from '../types/mpesa';

const BASE = import.meta.env.VITE_API_BASE_URL;

export async function createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
  const res = await axios.post(`${BASE}/api/orders/create/`, data);
  return res.data;
}

// api/mpesa.ts
export async function initiateMpesa(data: MpesaInitiateRequest): Promise<MpesaInitiateResponse> {
  console.log('👉 STK Push payload:', data);
  const res = await axios.post(
    `${BASE}/api/mpesa/stkpush/`,
    data,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
  console.log('📨 STK Push response:', res.data);
  return res.data;
}

export async function getOrderStatus(orderId: number): Promise<MpesaStatusResponse> {
  const res = await axios.get(`${BASE}/api/orders/status`, {
    params: { id: orderId }, // ✅ Correct param key
  });
  return res.data;
}
