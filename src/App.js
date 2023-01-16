import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Deliveroo-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faListAlt, faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--c7br8w6v87r6.code.run/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddToBasket = (meal) => {
    const newBasket = [...basket];
    const mealPresent = newBasket.find((elem) => elem.id === meal.id);

    if (mealPresent) {
      mealPresent.quantity++;
    } else {
      newBasket.push({ ...meal, quantity: 1 });
    }
    setBasket(newBasket);
  };

  const handleRemoveToBasket = (meal) => {
    const newBasket = [...basket];
    const mealPresent = newBasket.find((elem) => elem.id === meal.id);

    if (mealPresent.quantity === 1) {
      const index = newBasket.indexOf(mealPresent);
      newBasket.splice(index, 1);
    } else {
      mealPresent.quantity--;
    }
    setBasket(newBasket);
  };

  let total = 0;

  console.log(total);

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
                alt="main"
              />
            </div>
          </div>
        </header>
        <div className="Content">
          <div className="Content--center">
            <div className="menu">
              {data.categories.map((elem, index) => {
                if (elem.meals.length !== 0) {
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
                                  handleAddToBasket(meal);
                                }}
                              >
                                <div className="menuitemsCard">
                                  <div className="menuitemstext">
                                    <h3> {meal.title}</h3>
                                    <p>{meal.description}</p>
                                    <div className="menuInfo">
                                      <span className="menuitemprice">
                                        {meal.price} €
                                      </span>

                                      {meal.popular && (
                                        <span className="menuitempop">
                                          <FontAwesomeIcon icon="star" />
                                        </span>
                                      )}
                                      {meal.popular && (
                                        <span className="menuitempop">
                                          populaire
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="menuitempic">
                                    {meal.picture && (
                                      <img
                                        className="menuImg"
                                        src={meal.picture}
                                        alt="pics"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="Cart">
              <div className="Cart--Card">
                <button
                  className={
                    basket.length === 0 ? "Cart--disabled" : "Cart--Validate"
                  }
                >
                  Valider mon panier
                </button>
                <div className="Cart--empty">
                  {basket.length ? null : <p>Votre panier est vide</p>}
                </div>
                <div className="Cart-minus-cart-container">
                  {basket.map((meal) => {
                    total += meal.price * meal.quantity;

                    return (
                      <div className="Cart--items" key={meal.id}>
                        <div className="Cart--line">
                          <div className="Cart--Counter">
                            <span
                              className="operation"
                              onClick={() => {
                                handleRemoveToBasket(meal);
                              }}
                            >
                              -
                            </span>
                            <span>{meal.quantity}</span>
                            <span
                              className="operation"
                              onClick={() => {
                                handleAddToBasket(meal);
                              }}
                            >
                              +
                            </span>
                          </div>
                          <span className="Cart--item-name">{meal.title}</span>
                          <span className="Cart--amount">
                            {(meal.price * meal.quantity).toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="Cart--results">
                    <div className="Cart--result-line">
                      {basket.length ? (
                        <span className="Cart--result-name">Sous-total</span>
                      ) : null}
                      {basket.length ? (
                        <span className="Cart--amount">{total.toFixed(2)}</span>
                      ) : null}
                    </div>
                  </div>
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
