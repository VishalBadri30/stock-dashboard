import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./components/Dashboard.jsx";
import { useState } from "react";
import ThemeContext from "./context/ThemeContext.jsx";
import StockContext from "./context/StockContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("FB");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />;
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
