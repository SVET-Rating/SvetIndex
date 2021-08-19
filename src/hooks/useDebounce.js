import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [amount, setAmount] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(amount);
    }, delay);

    return () => clearTimeout(handler);
  }, [amount]);

  return [debouncedValue, setAmount];
}
