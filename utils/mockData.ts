import { MockOrder } from '@/types';

// Generate a random order amount between min and max
export const generateRandomAmount = (min = 10, max = 500) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate a random number of items between 1 and max
export const generateRandomItems = (max = 5) => {
  return Math.floor(Math.random() * max) + 1;
};

// Generate a mock order
export const generateMockOrder = (storeName: string, minAmount = 0): MockOrder => {
  let amount = generateRandomAmount();
  
  // Ensure amount is above minimum threshold
  while (amount < minAmount) {
    amount = generateRandomAmount();
  }
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    amount,
    items: generateRandomItems(),
    timestamp: Date.now(),
    storeName,
  };
};
