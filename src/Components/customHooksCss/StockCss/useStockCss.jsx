import { useContext } from "react";
import { ThemeContextCustom } from "../../Context/ThemeContext";

const useStockStyles = () => {
    const { theme } = useContext(ThemeContextCustom);
    return {
        tableContainer: {
            width: '80%',
            margin: 'auto',
            height: '600px',
            paddingBottom: '5px',
            fontFamily: 'myFont',
            backgroundColor: theme === 'dark' ? '#607d8b' : '#eceff1',
            overflow: scroll,
            scrollbarColor: ' #1E293B #CFD8DC',
            scrollbarWidth: 'thin',
            scrollBehavior: 'smooth',
            scrollbarHeight: '5px',


        },
        estiloHead: {
            fontSize: 20,
            fontFamily: 'myFont',
            fontWeight: '100',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            backgroundColor: theme === 'dark' ? '#37474f' : '#cfd8dc',
            height: 70,
        },
        estiloRow: {
            margin: 'auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: 100,
            backgroundColor: theme === 'dark' ? '#546e7a' : '#eceff1',
            '&:hover': {
                backgroundColor: '#78909c', // Color durante el hover
            },
        },
        estiloInfo: {
            fontSize: 15,
            fontFamily: 'myFont',
            color: theme === 'dark' ? '#ffffff' : '#000000',
        },
        estilosIcons: {
            width: 20,
            height: 20,
            margin: 'auto',
            color: theme === 'dark' ? '#ffffff' : '#000000',
        },
        tableBody: {
            width: '80%',
            margin: 'auto',
            paddingBottom: '5px',
            fontFamily: 'myFont',


        },

    };
}
export default useStockStyles;
