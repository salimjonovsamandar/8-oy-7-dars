import React, { useState, useEffect } from "react";
import "./index.css";
import Telefon from "../../assets/download.jpg";
import Loader from "../Loader";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

function Index() {
  const [product, setProduct] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Nomini kiriting");
      return false;
    }
    if (!formData.price.trim()) {
      alert("Narxini kiriting");
      return false;
    }

    if (!formData.description.trim()) {
      alert("Izoh kiriting");
      return false;
    }

    return true;
  };

  const handleAddProduct = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://auth-rg69.onrender.com/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Serverdan xato keldi");
        }
        await fetchProducts();
        setFormData({
          name: "",
          price: "",
          description: "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Rostdam ham bu mahsulotni o'chirmoqchimisiz?"
    );
    if (confirmDelete) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://auth-rg69.onrender.com/api/products/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Serverdan xato keldi");
        }
        await fetchProducts();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/All")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Serverdan xato keldi");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProduct(data);
      })

      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="productWrapper">
          <div className="container">
            <div className="login-box">
              <h2>Create Cards ✔</h2>
              <form>
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label>Enter card name...</label>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <label>Enter card price...</label>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <label>Card description...</label>
                </div>

                <button
                  type="button"
                  className="btn"
                  onClick={handleAddProduct}
                >
                  Create Card
                </button>
              </form>
            </div>
          </div>

          <div className="cardWrapper">
            {product.map((product) => (
              <div key={product.id} className="card">
                <img src={Telefon} alt="" />
                <div className="title">
                  <h2>Name: {product.name}</h2>
                  <h3 className="price">Price: ${product.price}</h3>
                  <p>Description: {product.description}</p>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
