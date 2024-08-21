import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()


export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('light');


    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme((prev) => prev === 'light' ? 'dark' : 'light');
    };


    return (
        <ThemeContext.Provider value={{ changeTheme, theme }}>
            {children}
        </ThemeContext.Provider>

    )
}
