// api/locations.ts
import axios from 'axios';

export interface DeliveryLocation {
  id: number;
  name: string;
  delivery_price: string;
}

export async function getLocations(): Promise<DeliveryLocation[]> {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/locations/`);
  console.log('Locations API response:', response.data);

  // ✅ Return the array directly (because response.data IS the array)
  return response.data;
}
