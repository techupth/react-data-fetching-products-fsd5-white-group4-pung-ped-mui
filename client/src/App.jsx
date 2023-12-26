import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [productList, setProductList] = useState([]);
  const getProductData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductList(result.data.data);
  };
  useEffect(() => {
    getProductData();
  }, [productList]);

  const deleteProduct = async (productID) => {
    await axios.delete(`http://localhost:4001/products/${productID}`);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productList.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
