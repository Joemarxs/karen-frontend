import { useMutation } from '@tanstack/react-query';
import {
  createOrder,
  initiateMpesa,
} from '../api/mpesa';

import {
  CreateOrderRequest,
  CreateOrderResponse,
  MpesaInitiateRequest,
  MpesaInitiateResponse,
} from '../types/mpesa';

// ✅ Create order mutation
export function useCreateOrder() {
  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: createOrder,
  });
}

// ✅ STK Push initiation mutation
export function useInitiateMpesa() {
  return useMutation<MpesaInitiateResponse, Error, MpesaInitiateRequest>({
    mutationFn: initiateMpesa,
  });
}
