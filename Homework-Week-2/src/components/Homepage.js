import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Homepage() {


    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(true);

    // Axios Api Call
    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/todos")
            // .then(res => console.log(res.data))
            .then(res => setTitle(res.data.slice(0, 50)))
            .catch(e => console.log("error:", e))
        setLoading(false)
    }, []);


    // Delete Post
    const deletePost = async (id) => {
        const alert = "silmek istediğinize emin misiniz?"

        if (window.confirm(alert)) {
            axios.delete("https://jsonplaceholder.typicode.com/todos")
            const newTitle = title.filter(
                item => item.id !== id
            );
            setTitle(newTitle);
        }
    }

    // Sort Method
    const sortTitle = () => {
        axios("https://jsonplaceholder.typicode.com/todos")
            // Birinci Method = reverse() / İkinci Method = sort()
            // .then(res => setTitle(res.data.slice(0, 50).reverse()))
            .then(res => setTitle(res.data.slice(0, 50).sort((a, b) => b.id - a.id)))
            .catch(e => console.log("error:", e))
        setLoading(false)
    }

    // Sort Reset Method
    const sortReset = () => {
        axios("https://jsonplaceholder.typicode.com/todos")
            .then(res => setTitle(res.data.sort((a, b) => a.id - b.id)))
            .catch(e => console.log("error:", e))
        setLoading(false)
    }

    // Edit Method
    const editLoading = () => {
        window.alert("sonra yapacağuz....")
    }

    const wholePage = () => {

        axios("https://jsonplaceholder.typicode.com/todos")
            .then(res => setTitle(res.data))
            .catch(e => console.log("error:", e))
        setLoading(false)

        const buttonDOM = document.getElementById("noneButton")
        buttonDOM.style.display = "none"
    }


    return (
        <div className='container mt-3'>
            <div className='row'>

                <table className="table" id="tableId">
                    <thead>
                        <tr className='' id='sort'>
                            <th scope="col" onClick={() => sortTitle()}>#</th>
                            <th scope="col" onClick={() => sortTitle()}>Title</th>
                            <th scope="col" onClick={() => sortTitle()}>Completed</th>
                            <th scope="col" onClick={() => sortReset()}>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading ? <h1>"LOADING..."</h1> :
                            title.map((item, key) => (
                                <tbody key={key} id="tbodyId">
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title.toUpperCase().slice(0, 1)}{item.title.toLowerCase().slice(1)}</td>
                                        <td>{item.completed ? "COMPLETED" : "Not Completed"}</td>
                                        <td>
                                            <button type="button" className='btn btn-danger' onClick={() => deletePost(item.id)}>Remove</button>
                                            <button type='button' className='btn btn-warning' onClick={() => editLoading()}>Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                    }
                </table>

                {
                    loading ? <h1>"LOADING..."</h1> :
                        <button
                            type='button'
                            id="noneButton"
                            className='btn btn-outline-success'
                            onClick={() => wholePage()}
                        >Click to load the whole page
                        </button>
                }
            </div>
        </div>
    )
}

export default Homepage;