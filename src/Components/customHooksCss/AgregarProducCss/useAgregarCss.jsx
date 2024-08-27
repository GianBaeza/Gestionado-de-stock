import { useContext } from "react";
import { ThemeContextCustom } from "../../Context/ThemeContext";


const useAgregarProductoStyles = () => {
    const { theme } = useContext(ThemeContextCustom);

    return {
        inputsEstilos: `w-full p-2 border border-gray-300 rounded-lg shadow-inner text-stone-800 ${theme === 'dark' ? 'bg-slate-200 text-stone-300 border-gray-600' : 'bg-gray-200'}`,
        modalEstilos: `${theme === 'dark' ? 'bg-slate-800 text-stone-100 ' : 'bg-[rgba(207,216,220)]  text-stone-800'}`,
        containerModal: 'fixed inset-0 bg-black/50 flex justify-center items-center z-50  h-svh	 w-screen',
        buttonClose: 'self-end mb-4',
        submitButton: 'mt-4 p-2 bg-slate-700 text-slate-200 rounded cursor-pointer'
    };
};

export default useAgregarProductoStyles;
