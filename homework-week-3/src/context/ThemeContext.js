import {createContext, useState, useEffect} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ( {children} ) => {

// const [theme, setTheme] = useState("bg-light");

const [theme, setTheme] = useState(localStorage.getItem('themeKey') || 'bg-light');
// localStorage'de o an bir şey yok ise light olarak görecek. Bunu demezsem null olarak görür
// hatırlatma, localstorage --> ('key', value)

useEffect(() => {
    localStorage.setItem('themeKey', theme)
}, [theme])
// <<[theme])>> yani theme her değiştiğinde, yeniden render edecek ve ekran koyu ya da açık olacak.
// Artık f5 ile sayfayı yenilesek bile en son yaptığım theme değeri olucek...




const values = {
    theme,
    setTheme,
}

return (
    <ThemeContext.Provider value={values}>
        {children}
    </ThemeContext.Provider>
)
//Provide, sağlamak demek. Provider ise sağlayıcı demektir.
// Neyi sağlayacağız, Data'yı yani, value ile hangi datayı sağlayacağımı belirtmem gerekiyor


}

export default ThemeContext;











