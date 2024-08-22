
import './themeButton.css';

const ThemeSwitch = ({ handleTheme, theme }) => {
    return (
        <label className="switch">
            <input
                type="checkbox"
                id="switch"
                checked={theme === 'dark'}
                onChange={handleTheme}
            />
            <span className="slider"></span>
            <span className="decoration"></span>
        </label>
    );
};

export default ThemeSwitch;
