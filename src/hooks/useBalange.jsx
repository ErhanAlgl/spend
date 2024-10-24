import { useState, useEffect } from 'react';

export const useBalance = (initialBalance) => {
  const [balance, setBalance] = useState(initialBalance); // state balance
  const [targetBalance, setTargetBalance] = useState(initialBalance); // state target balance

  useEffect(() => {
    if (balance !== targetBalance) {
      const difference = targetBalance - balance;
      const absDifference = Math.abs(difference);

      const threshold1 = 1000;
      const threshold2 = 50;

      let animationDuration, steps;
      if (absDifference < threshold2) {
        animationDuration = 1200;
        steps = 16;
      } else if (absDifference < threshold1) {
        animationDuration = 200;
        steps = 100;
      } else {
        animationDuration = 2;
        steps = 60;
      }

      const step = Math.ceil(absDifference / steps);

      const interval = setInterval(() => {
        setBalance((prevBalance) => {
          const newBalance = prevBalance + step * Math.sign(difference);
          if (Math.abs(newBalance - targetBalance) < step) {
            clearInterval(interval);
            return targetBalance;
          }
          return newBalance;
        });
      }, animationDuration / steps);

      return () => clearInterval(interval);
    }
  }, [balance, targetBalance]);

  // fonction to update the balance
  const updateBalance = (amount) => {
    setTargetBalance(Math.round(balance + amount));
  };

  return { balance, updateBalance };
};