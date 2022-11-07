import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Deliveroo-Logo.png";

function App() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-backend--c7br8w6v87r6.code.run/"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <body>
      <div>
        <header className="Header">
          <div className="topBar">
            <img className="logo" src={logo} alt="delivroo logo" />
          </div>
          <div className="RestaurantInfos"></div>
        </header>
      </div>
    </body>
  );
}

export default App;
