import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/CurrencyInfo'
import './App.css'
import HistoricalChart from './components/HistoricalChart'
import useHistoricalData from './hooks/Historicaldata'

function App() {
  const [amount,setAmount] = useState(0);
  const [from,setfrom] = useState("USD");
  const [to,setTo] = useState("INR");
  const [convertedAmount,setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  console.log(from);
  
  const historicaldata = useHistoricalData(from,to)

  const Options = currencyInfo ? Object.keys(currencyInfo) : [];
  const swap = () => {
    setfrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * Number(currencyInfo[to]))
  }
  return (
    <>
      <div
            className="w-auto h-screen flex flex-wrap justify-center items-center "
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                           convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="from"
                                amount = {amount}
                                onCurrencyChange={(currency) => setfrom(currency)}
                                selectCurrency={from}
                                currencyOptions={Options}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="to"
                                amount = {convertedAmount}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                currencyOptions={Options}
                                amountDisabled
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from} TO {to}
                        </button>
                    </form>
                </div>
            </div>
            <div className='w-full max-w-4xl mx-auto mt-10 p-5'>
                        <HistoricalChart historicalData={historicaldata} from={from} to={to}/>
            </div>
        </div>
    </>
  )
}

export default App
