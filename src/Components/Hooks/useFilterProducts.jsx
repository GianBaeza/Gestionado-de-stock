export default function useFilterProducts() {
	const filterProduct = (objeto, prop, query) => {
		const queryToLowerCase = query.toLowerCase();

		const result = objeto.filter((item) => {
			//convierto el valor en una cadena
			const itemString = item[prop].toString().toLowerCase();
			return itemString.includes(queryToLowerCase);
		});

		return result;
	};
	return filterProduct;
}
