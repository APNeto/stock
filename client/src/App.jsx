import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);


  const fetchData = () => {
    fetch("http://localhost:5000/api/stocks")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => setStocks(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error.message);
      });
  }
  
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1800000 * 5);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Stocks Dashboard</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="stock-list">
            {stocks.map((stock) => (
              <div className="stock-card" key={stock.symbol}>
                <h2>
                  {stock.name} ({stock.symbol})
                </h2>
                <p>Price: R${stock.regularMarketPrice}</p>
                <p>
                  Change:{" "}
                  <span className={stock.regularMarketChange >= 0 ? "positive" : "negative"}>
                    {stock.regularMarketChange.toFixed(2)} (
                    {stock.regularMarketChangePercent.toFixed(2)}%)
                  </span>
                </p>
                <p className="market-data">
                  <strong>High:</strong> R$ {stock.regularMarketDayHigh}
                </p>
                <p className="market-data">
                  <strong>Low:</strong> R$ {stock.regularMarketDayLow}
                </p>
                <p className="market-data">
                  <strong>Volume:</strong> {stock.regularMarketVolume.toLocaleString("pt-Br")}
                </p>
                <p className="market-data">
                  <strong>Mkt Cap:</strong> R${' '} {(stock.marketCap / 1000000000).toFixed(2)}B
                </p>
              </div>
            ))}
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
