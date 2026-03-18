import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./productList";
import ProductForm from "./productForm";
import API_URL from "./config";

function App() {
  const [produkte, setProdukte] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fehler, setFehler] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Wenn nicht eingeloggt, zu Login weiterleiten
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function ladeProdukte() {
      try {
        const response = await fetch(`${API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProdukte(data);
      } catch (err) {
        setFehler("Produkte konnten nicht geladen werden");
      } finally {
        setIsLoading(false);
      }
    }

    ladeProdukte();
  }, []);

  async function produktHinzufügen(neuesProdukt) {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(neuesProdukt),
      });
      const data = await response.json();
      setProdukte([...produkte, data]);
    } catch (err) {
      setFehler("Produkt konnte nicht erstellt werden");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (isLoading) return <p>Lädt...</p>;
  if (fehler) return <p>{fehler}</p>;

  return (
    <div>
      <div>
        <span>Hallo, {user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Mein Shop</h1>
      <ProductList produkte={produkte} />
      <h2>Neues Produkt</h2>
      <ProductForm onSubmit={produktHinzufügen} />
    </div>
  );
}

export default App;
