import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);
  const getProductData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductData(result.data.data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newResult = productData.filter((item) => {
      return item.id !== id;
    });
    setProductData(newResult);
  };

  const handleUndoDelete = () => {
    if (deletedItem) {
      axios.post("http://localhost:4001/restoreProduct", deletedItem);
      setProductData([...productData, deletedItem]);
      setDeletedItem(null);
    }
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={handleUndoDelete}>Undo Delete</button>
      </div>
      <div className="product-list">
        {productData.map((item) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
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
