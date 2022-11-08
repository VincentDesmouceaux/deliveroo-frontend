import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Deliveroo-Logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

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
    <div className="body">
      <div>
        <header className="Header">
          <div className="topBar">
            <div className="topbarcenter">
              <img className="logo" src={logo} alt="delivroo logo" />
            </div>
          </div>
          <div className="RestaurantInfos">
            <div className="RestaurantInfos--center">
              <div className="restaurantInfostext">
                <h1> {data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img
                className="Restaurantimg"
                src="https://f.roocdn.com/images/menus/17697/header-image.jpg"
                alt="main photo"
              />
            </div>
          </div>
        </header>
        <div className="Content">
          <div className="Content--center">
            <div className="menu">
              {data.categories.map((elem, index) => {
                return (
                  <div key={index}>
                    <div className="menuitems">
                      <h2>{elem.name}</h2>

                      <div className="menuitemitem">
                        {elem.meals.map((meal, index) => {
                          return (
                            <div
                              className="menuitem"
                              key={meal.id}
                              onClick={() => {
                                const newBasket = [...basket];
                                newBasket.push({
                                  name: meal.title,
                                  prix: meal.price,
                                  counter: 1,
                                });
                                setBasket(newBasket);
                              }}
                            >
                              <div className="menuitemsCard">
                                <div className="menuitemstext">
                                  <h3> {meal.title}</h3>
                                  <p>{meal.description}</p>
                                  <div className="menuInfo">
                                    <span className="menuitemprice">
                                      {meal.price}
                                    </span>
                                    {meal.popular && (
                                      <span className="menuitempop">
                                        populaire
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="menuitempic">
                                  <img
                                    className="menuImg"
                                    src={meal.picture}
                                    alt="pics"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="Cart">
              <div className="Cart--Card">
                <button className="Cart--Validate Cart--disabled">
                  Valider mon panier
                </button>
                <div className="Cart-minus-cart-container">
                  {basket.map((elem, index) => {
                    return (
                      <div className="Cart--items" key={index}>
                        <div className="Cart--line">
                          <div className="Cart--Counter">
                            <span className="operation">-</span>
                            <span>{elem.counter}</span>
                            <span onClick={const handleClickPlus = (index) => {
    const newCounters = [...counters];
    newCounters[index]++;
    setCounters(newCounters);
   } className="operation">+</span>
                          </div>
                          <span className="Cart--item-name">{elem.name}</span>
                          <span className="Cart--amount">{elem.prix}</span>
                        </div>
                        <div className="Cart--results">
                          <div className="Cart--result-line">
                            <span className="Cart--result-name">
                              Sous-total
                            </span>
                            <span className="Cart--amount">resulat</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
