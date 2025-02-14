import { useEffect, useState } from "react";

const useHistoricalData = (baseCurrency,targetCurrency) => {
  const [historicalData, sethistoricalData] = useState([]);

  useEffect(() => {
    
        let today = new Date();
        let pastMonth = new Date(today);
        pastMonth.setDate(today.getDate() - 30)

        let dateRange = [];
        for (let i = 0; i < 30; i++) {
          let date = new Date(pastMonth);
          date.setDate(pastMonth.getDate() + i);
          dateRange.push(date.toISOString(  ).split("T")[0]);
        }

        let rates = [];

        for (const date of dateRange) {
         let url = `https://openexchangerates.org/api/historical/${date}.json?app_id=d7f60c5e6f584553af70ab62556e02d3&base=${baseCurrency}&symbols=${targetCurrency}&show_alternative=false&prettyprint=false`;
          
          fetch(url).then((res) => res.json())
          .then((res) => rates.push({ date, rate: res.rates[targetCurrency] }))
        }
        sethistoricalData(rates);
  }, [baseCurrency,targetCurrency]);

  console.log(historicalData);
  return historicalData; 
};

export default useHistoricalData;
