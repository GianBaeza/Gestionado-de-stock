import { useContext } from "react";
import { ThemeContextCustom } from "../../Context/ThemeContext";


const useEditModalStyles = (estiloAnimacion) => {
    const { theme } = useContext(ThemeContextCustom);

    return {
        inputsEstilos: `border-none	 w-full p-2 border border-gray-300 rounded-lg  text-stone-100 ${theme === 'dark' ? 'bg-slate-200 text-stone-900 border-gray-500' : 'bg-gray-100 border-gray-500 text-stone-900'}`,
        modalEstilos: theme !== 'dark' ? 'bg-[rgba(207,216,220)] text-stone-900 formCssLight ' : 'bg-[rgba(30,41,59)] text-stone-100 formCssDark',
        formContainer: `fixed top-56 right-0 w-3/12 h-auto flex justify-end items-center z-[1000] transition-transform duration-1000 ease-in-out ${theme !== 'dark' ? 'bg-[rgba(0, 0, 0, 0.5)]' : 'bg-[rgba(255, 255, 255, 0.29)]'}`,
        formStyles: `form w-5/6 gap-4 p-5 flex flex-col ${estiloAnimacion} rounded-lg  mr-10`,
        buttonGuardar: theme === 'dark' ? 'bg-slate-100 text-stone-900' : 'bg-slate-700 text-stone-100',
    };
};

export default useEditModalStyles;
