import { useState } from "react";

function ProductForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, price: parseFloat(price) });
    setName("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Preis" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Hinzufügen</button>
    </form>
  );
}

export default ProductForm;
