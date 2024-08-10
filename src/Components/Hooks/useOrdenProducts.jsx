export default function useOrdenProducts() {
  const ordenProducts = (objt, prop, state) => {
    const objtClone = [...objt];

    // orden por stock
    if (typeof objtClone[0][prop] === "number") {
      objtClone.sort((a, b) => {
        return state ? a[prop] - b[prop] : b[prop] - a[prop];
      });
    } else if (typeof objtClone[0][prop] === "string") {
      objtClone.sort((a, b) => {
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

    return objtClone;
  };

  return ordenProducts;
}
