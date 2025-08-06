import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookTour, resetBookingState } from '../store/slices/bookTourSlice';
import type { AppDispatch, RootState } from '../store';

export function BookTour() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.booking);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('1');

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(bookTour({ name, email, date, time, guests }));
  };

  useEffect(() => {
    if (success) {
      setMessage('Booking confirmed! Check your email.');
      setMessageType('success');
      setDate('');
      setTime('');
      setName('');
      setEmail('');
      setGuests('1');
      dispatch(resetBookingState());
    }

    if (error) {
      setMessage(`❌ ${error}`);
      setMessageType('error');
      dispatch(resetBookingState());
    }

    if (success || error) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [success, error, dispatch]);

  return (
    <div className="bg-cream-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold text-green-800">Book a Farm Tour</h1>
          </div>

          {message && (
            <div
              className={`mb-6 text-center p-3 rounded-md font-medium ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... all form fields (unchanged) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-brown-700 font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-brown-700 font-medium mb-2">
                  Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-brown-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-brown-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-brown-700 font-medium mb-2">
                Number of Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition font-medium"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Tour'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
