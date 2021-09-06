import React from 'react';

export const useCounter = () => {
  console.log("useCounter");
  const [counter, setCounter] = React.useState(2);

  const increment = () => {
    console.log("useCounter.increment");
    setCounter(counter + 1)
  };

  const decrement = () => setCounter(counter - 1);

  return { counter, increment, decrement };
}