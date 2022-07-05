import { useContext, useState } from "react";
import SetTheme from "./SetTheme";
import ThemeContext from "../context/ThemeContext";
import TableFn from './TableFn';
import TableClass from './TableClass';

function HomePage() {

    const [status, setStatus] = useState("tableFn");
    const { theme } = useContext(ThemeContext);


    const renderAppStatus = () => {
        if (status === "tableFn") {
            return (
                <>
                    <TableFn themeProp={theme} />
                </>
            )
        } else if (status === "tableClass") {
            return (
                <>
                    <TableClass theme={theme} />
                </>
            )
        }
    }


    return (

        <div className={`App ${theme === "bg-dark" ? theme : "bg-light"}`}>
         <div style={{float:"right", color:"blue", fontSize:"20px"}}>Active Theme: {theme === "bg-dark" ? <h4 className="text-light">DARK</h4> :  <h4 className="text-dark">LIGHT</h4>}</div>

            <div className='container p-3'>
                <button onClick={() => setStatus("tableFn")} className='col me-1 btn btn-success'> Homework Function </button>

                <SetTheme />

                <button onClick={() => setStatus("tableClass")} className="col me-1 btn btn-primary" > Homework Class </button>
            </div>

            {
                renderAppStatus()
            }

        </div>
    )
}

export default HomePage;