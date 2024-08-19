
export default function useOrdenProducts() {
    const ordenProducts = (objt, prop, state) => {
        const sortArray = [...objt]

        // orden por stock
        if (typeof sortArray[0][prop] == 'number') {
            sortArray.sort((a, b) => {

                return state ? a[prop] - b[prop] : b[prop] - a[prop];
            });
        } else if (typeof objt[0][prop] === 'string') {
            // Orden ascendente (A a Z)
            sortArray.sort((a, b) => {

                if (state) {

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
        return sortArray

    };

    return ordenProducts;
}
