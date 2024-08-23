export default function useOrdenProducts() {
    const ordenProducts = (objt, prop, state) => {
        const sortArray = [...objt];

        if (typeof sortArray[0][prop] === 'number') {
            // Ordenar por números
            sortArray.sort((a, b) => {
                return state ? a[prop] - b[prop] : b[prop] - a[prop];
            });
        } else if (typeof sortArray[0][prop] === 'string') {
            // Ordenar por cadenas
            sortArray.sort((a, b) => {
                const aValue = a[prop] ? a[prop].toLowerCase() : '';
                const bValue = b[prop] ? b[prop].toLowerCase() : '';

                if (state) {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });
        }
        return sortArray;
    };

    return ordenProducts;
}
