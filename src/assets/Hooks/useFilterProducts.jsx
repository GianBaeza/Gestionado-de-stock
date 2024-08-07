export default function useFilterProducts() {
  const filterProduct = (objeto, prop, query) => {
    console.log(objeto, prop, query);
    const result = objeto.filter((item) =>
      item[prop].toLowerCase().includes(query.toLowerCase())
    );
    return result;
  };
  return filterProduct;
}
