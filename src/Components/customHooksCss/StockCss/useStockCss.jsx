import { useContext } from "react";
import { ThemeContextCustom } from "../../Context/ThemeContext";

const useStockStyles = () => {
    const { theme } = useContext(ThemeContextCustom);
    return {
        tableContainer: {
            width: { ...'90%', sm: '100%' },
            margin: 'auto',
            height: '600px',
            paddingBottom: { ...'5px' },
            fontFamily: 'myFont',
            backgroundColor: theme === 'dark' ? '#607d8b' : '#eceff1',
            overflow: scroll,
            scrollbarColor: ' #1E293B #CFD8DC',
            scrollbarWidth: 'thin',
            scrollBehavior: 'smooth',
            scrollbarHeight: '5px',


        },
        estiloHead: {
            fontSize: {
                ...20,
                xs: '10px',
                sm: '14px',
                md: '16px',
                lg: '18px',
                xl: '20px',
            },
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
                backgroundColor: theme === 'dark' ? '#334155' : '#F3F4F6',
            },

        },
        estiloInfo: {
            fontSize: 18,
            color: theme === 'dark' ? '#ffffff' : '#4B5564',

        },
        estilosIcons: {
            width: 26,
            height: 26,
            margin: 'auto',
            cursor: 'pointer',
            borderLeft: '1px solid #1F2937',
            borderRight: '1px solid #1F2937',
            color: theme === 'dark' ? '#ffffff' : '#00390',

        },

        tableBody: {
            width: '80%',
            margin: 'auto',
            paddingBottom: '5px',
            fontFamily: 'myFont',


        },
        estiloDeletEditar: {
            color: theme === 'dark' ? '#ffffff' : '#00390',
            transition: 'transform 0.1s ease',
            '&:hover': {
                transform: 'scale(1.65)',
            },
        }

    };
}
export default useStockStyles;
