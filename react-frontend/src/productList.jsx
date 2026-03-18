function ProductList({ produkte }) {
  return (
    <ul>
      {produkte.map((produkt) => (
        <li key={produkt.id}>
          {produkt.name} — €{produkt.price}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
