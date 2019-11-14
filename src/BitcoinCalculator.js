import React, {useState, useEffect} from 'react';

const BitcoinCalculator = () => {

    const [rate, setRate] = useState(100);
    const [exchange, setExchange] = useState(0);
    const [currency, setCurrency] = useState('PLN');
    let inputExchange;


    const getExchangeData = () => {
        fetch('https://blockchain.info/ticker')
      .then(response => response.json())
      .then(json =>{ 
        setRate(json.PLN.last);
        });
    }

     const getExchangeValue = () => {

         let floatExchangeValue =(inputExchange.value !== '')?parseFloat(inputExchange.value):0;

        fetch('https://blockchain.info/tobtc?currency='+currency+'&value=' + floatExchangeValue)
      .then(response => response.json())
      .then(json =>{  
         console.log(json)
         setExchange(json);
       
        });
    } 


    const changeCurrency = e => {
       setCurrency(e.target.value);
       getExchangeValue()

    } 



    useEffect(()=>{
        getExchangeData();

        setInterval(getExchangeData, 1000);

        getExchangeValue();
    }, [currency] );

    return(
        <div className="bit-coin-calculator">
            <h2>Aktualny kurs BTC PLN</h2>
            <p>{rate} PLN</p>
            <h3>Ile kupie BTC za {currency}?</h3>
            <h4>Zmień walutę</h4>
            <select onChange={changeCurrency}>
                <option value="PLN">PLN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select> 
            <input type="number" min="0" placeholder={"Wpisz kwote w " + currency} onChange={getExchangeValue} ref={input => inputExchange = input}/>
            <p>Możesz kupic: {exchange} BTC</p>
        </div>
    )
}

export default BitcoinCalculator;