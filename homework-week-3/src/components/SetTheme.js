import React from 'react'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
// hangi context'i kullanacaksam, kullanmak istediğim component'in içine onu dahil etmem lazım

function SetTheme() {

    const { theme, setTheme } = useContext(ThemeContext)
    // import ettiğim ThemeContexT'i parametre olarak geçiyorum.
    // bu işlemi hangi componente yaparsam yapayım o veriye erişebiliyorum demektir bu.

    console.log("theme:", theme)
    return (
        <>
            <button className={theme === "bg-light" ? 'btn btn-transparent me-2 ms-2' : 'btn btn-transparent me-2 ms-2'} 
                onClick={() => setTheme(theme === "bg-light" ? "bg-dark" : "bg-light")}>
                {theme === "bg-light" ? "☀️" : "🌙"}
            </button>
        </>
    )
}

export default SetTheme