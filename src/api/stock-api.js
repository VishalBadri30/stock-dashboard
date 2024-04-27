export const searchSymbols = async (query) => {
  const url = `https://finnhub.io/api/v1/search?q=${query}&token=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured : ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchStockDetails = async (stockSymbol) => {
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${stockSymbol}&token=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured : ${response.status}`;
    console.log(message);
  }

  return await response.json();
};

export const fetchQuote = async (stockSymbol) => {
  const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured : ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchHistoricalData = async (stockSymbol, startDate, endDate) => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${startDate}/${endDate}?adjusted=true&limit=120&apiKey=${
    import.meta.env.VITE_REACT_APP_API_KEY2
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured : ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
