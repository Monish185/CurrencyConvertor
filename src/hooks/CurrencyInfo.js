import { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});

  useEffect(() => {
    
        let url = `https://v6.exchangerate-api.com/v6/35feaf0d3e1b09d4a6de4bec/latest/${currency}`;
        
        fetch(url).then((res) => res.json())
        .then((res) => setData(res.conversion_rates))
        console.log(data)
    
  }, [currency]);

  console.log(data);
  return data; // Return data, error, and loading state
};

export default useCurrencyInfo;
