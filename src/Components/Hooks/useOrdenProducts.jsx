export default function useOrdenProducts() {
  const ordenProducts = (objt, prop, state) => {
    // orden por stock
    if (typeof objt[prop] === Number) {
      objt.sort((a, b) => {
        return state ? a[prop] - b[prop] : b[prop] - a[prop];
      });
    } else if (typeof objt[prop] === "string") {
      objt.sort((a, b) => {
        if (state) {
          // Orden ascendente (A a Z)
          if (a[prop].toLowerCase() < b[prop].toLowerCase()) return -1;
          if (a[prop].toLowerCase() > b[prop].toLowerCase()) return 1;
          return 0;
        } else {
          // Orden descendente (Z a A)
          if (a[prop].toLowerCase() > b[prop].toLowerCase()) return -1;
          if (a[prop].toLowerCase() < b[prop].toLowerCase()) return 1;
          return 0;
        }
      });
    }

  
  };

  return ordenProducts;
}
