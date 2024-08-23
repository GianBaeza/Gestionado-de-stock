import { useContext } from "react";
import { ThemeContextCustom } from "../../Context/ThemeContext";


const useAgregarProductoStyles = () => {
    const { theme } = useContext(ThemeContextCustom);

    return {
        inputsEstilos: `w-full p-2 border border-gray-300 rounded-lg shadow-inner text-stone-100 ${theme === 'dark' ? 'bg-slate-200 text-stone-900 border-gray-500' : 'bg-gray-100 border-gray-500 text-stone-900 '}`,
        modalEstilos: theme === 'dark' ? 'bg-slate-800 text-stone-100 ' : 'bg-[rgba(207,216,220)]  text-stone-800',
        containerModal: 'fixed inset-0 bg-black/50 flex justify-center items-center z-50 h-full w-full',
        buttonClose: 'self-end mb-4',
        submitButton: 'mt-4 p-2 bg-slate-700 text-slate-200 rounded cursor-pointer',
        buttonGuardar: theme === 'dark' ? 'bg-slate-100 text-stone-900' : 'bg-slate-700 text-stone-100'
    };
};

export default useAgregarProductoStyles;
