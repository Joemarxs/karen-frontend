import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useCreateOrder, useInitiateMpesa } from '../hooks/useMpesa';
import { useNavigate } from 'react-router-dom';
import { getOrderStatus } from '../api/mpesa';
import { FaSpinner } from 'react-icons/fa';
import { FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

export function Mpesa() {
  const { items, total, deliveryFee, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mpesaName, setMpesaName] = useState('');
  const [checkoutID, setCheckoutID] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [stkSent, setStkSent] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'error' | null>(null);

  const grandTotal = total + deliveryFee;
  const navigate = useNavigate();

  const createOrder = useCreateOrder();
  const initiate = useInitiateMpesa();

  const isCreating = createOrder.isPending;
  const isInitiating = initiate.isPending;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStkSent(false);
    setShowCheckButton(false);
    setCheckoutID(null);
    setOrderId(null);
    setStatusMessage('');
    setStatusType(null);

    try {
      const order = await createOrder.mutateAsync({
        customer_name: mpesaName,
        customer_phone: phoneNumber,
        payment_method: 'mpesa',
        total_amount: grandTotal,
        items: items.map(i => ({ product_id: i.id, quantity: i.quantity })),
      });

      const payload = { phone: phoneNumber, amount: grandTotal, order_id: order.id };
      const mpesaRes = await initiate.mutateAsync(payload);

      setOrderId(order.id);
      setCheckoutID(mpesaRes.CheckoutRequestID);
      setStkSent(true);

      setTimeout(() => {
        setShowCheckButton(true);
      }, 20000);
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage(
        err.response?.data?.message || 'Failed to initiate payment. Check phone number.'
      );
    }
  };

  const handleCheckStatus = async () => {
    if (!orderId) return;
    setCheckingStatus(true);
    setStatusMessage('');
    setStatusType(null);

    try {
      const res = await getOrderStatus(orderId);
      if (res.order_paid) {
        clearCart();
        setStatusType('success');
        setStatusMessage('Payment successful!');
      } else {
        setStatusType('warning');
        setStatusMessage('Payment not confirmed yet. Please try again shortly.');
      }
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage('Failed to fetch payment status.');
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    if (showCheckButton && orderId) {
      handleCheckStatus();
    }
  }, [showCheckButton, orderId]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">M-Pesa Payment</h1>

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {!stkSent ? (
          <form onSubmit={handlePay} className="space-y-6">
            {statusMessage && (
              <p
                className={`text-sm flex items-center justify-center gap-2 ${
                  statusType === 'success'
                    ? 'text-green-600'
                    : statusType === 'warning'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {statusType === 'success' && <FiCheckCircle />}
                {statusType === 'warning' && <FiClock />}
                {statusType === 'error' && <FiAlertCircle />}
                {statusMessage}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Name</label>
              <input
                type="text"
                value={mpesaName}
                onChange={(e) => setMpesaName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between"><span>Items Total:</span><span>Ksh {total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee:</span><span>Ksh {deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span><span>Ksh {grandTotal.toFixed(2)}</span></div>
            </div>

            <button
              type="submit"
              disabled={isCreating || isInitiating}
              className={`w-full py-3 rounded-lg text-white text-lg font-semibold shadow-md transition ${
                isCreating || isInitiating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {(isCreating || isInitiating) && (
                  <FaSpinner style={{ animation: 'spin 2s linear infinite' }} className="h-5 w-5 text-white" />
                )}
                {isCreating
                  ? 'Creating Order...'
                  : isInitiating
                  ? 'Sending STK Push...'
                  : 'Create Order & Pay'}
              </div>
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            {!showCheckButton ? (
              <>
                <div className="flex justify-center text-green-600 text-3xl">
                  <FiCheckCircle />
                </div>
                <p className="text-green-700 font-medium">
                  M-Pesa request sent to <strong>{phoneNumber}</strong>.
                </p>
                <p className="text-gray-700">Please enter your M-Pesa PIN to confirm payment.</p>
                <div className="flex justify-center pt-4">
                  <FaSpinner style={{ animation: 'spin 2s linear infinite' }} className="text-green-600 text-2xl" />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center text-yellow-600 text-3xl">
                  <FiClock />
                </div>
                <p className="text-yellow-700 font-medium">
                  Waiting for payment confirmation.
                </p>
                <button
                  onClick={handleCheckStatus}
                  disabled={checkingStatus}
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-5 rounded shadow-md mt-2"
                >
                  {checkingStatus ? (
                    <span className="flex items-center gap-2">
                      <FaSpinner style={{ animation: 'spin 2s linear infinite' }} className="animate-spin" /> Checking...
                    </span>
                  ) : (
                    'Check Payment Status'
                  )}
                </button>

                {statusMessage && (
                  <p
                    className={`mt-4 text-sm flex items-center justify-center gap-2 ${
                      statusType === 'success'
                        ? 'text-green-600'
                        : statusType === 'warning'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {statusType === 'success' && <FiCheckCircle />}
                    {statusType === 'warning' && <FiClock />}
                    {statusType === 'error' && <FiAlertCircle />}
                    {statusMessage}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
