import axios from 'axios';
import React, { useEffect, useState } from 'react'


function TableFn({themeProp}) {


    const [title, setTitle] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("todos")

    // Axios Todos Api Call
    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/todos")
            // .then(res => console.log(res.data))
            .then(res => setTitle(res.data.slice(0, 50)))
            .catch(e => console.log("error:", e))
        setLoading(false)
    }, []);

    // Axios Posts Api Call
    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/posts")
            // .then(response => console.log(response.data))
            .then(response => setPost(response.data.slice(0, 50)))
            .catch(e => console.log("error:", e))
        setLoading(false)
    }, []);

    const renderPosts = () => {
        return (
            <>
                {loading ? <h1>"LOADING..."</h1> :
                    post.map((item, i) => (
                        <tbody key={i} >
                            <tr className={themeProp === "bg-dark" ? 'text-light': 'text-dark'}>
                                <th scope="row">{item.id}</th>
                                <td>{item.title.toUpperCase().slice(0, 1)}{item.title.toLowerCase().slice(1)}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </>
        )
    }

    const renderTodos = () => {
        return (
            <>
                {loading ? <h1>"LOADING..."</h1> :
                    title.map((item, i) => (
                        <tbody key={i} id="tbodyId">
                            <tr className={themeProp === "bg-dark" ? 'text-light': 'text-dark'}>
                                <th scope="row">{item.id}</th>
                                <td >{item.title.toUpperCase().slice(0, 1)}{item.title.toLowerCase().slice(1)}</td>
                                <td>{item.completed ? "COMPLETED" : "Not Completed"}</td>
                                <td>
                                    <button type="button" className='btn btn-danger' onClick={() => deletePost(item.id)}>Remove</button>
                                    <button type='button' className='btn btn-warning' onClick={() => editLoading()}>Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </>
        )
    }

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

    const wholePageTodos = () => {

        axios("https://jsonplaceholder.typicode.com/todos")
            .then(res => setTitle(res.data))
            .catch(e => console.log("error:", e))
        setLoading(false)

        const buttonDOM = document.getElementById("noneButton")
        buttonDOM.style.display = "none"

    }

    const wholePagePosts = () => {

        axios("https://jsonplaceholder.typicode.com/posts")
            .then(response => setPost(response.data))
            .catch(e => console.log("error:", e))
        setLoading(false)

        const buttonDOM = document.getElementById("noneButton")
        buttonDOM.style.display = "none"
    }

    const renderStatus = () => {
        if (status === "todos") {
            return renderTodos()
        } else return renderPosts()
    }


    return (
        <div className='container mt-3'>
            <div className='row'>

                <div className='mb-4'>
                    <button onClick={() => setStatus("todos")} className='col me-1 btn btn-success' >Todos</button>
                    <button onClick={() => setStatus("posts")} className='col btn btn-primary'>Posts</button>
                </div>

                <table className="table" id="tableId">
                    <thead>
                        <tr className='' id='sort'>
                            <th scope="col" onClick={() => sortTitle()}>#</th>
                            <th scope="col" onClick={() => sortTitle()}>Title</th>
                            {status === "todos" ?
                                <>
                                    <th scope="col" onClick={() => sortTitle()}>Completed</th>
                                    <th scope="col" onClick={() => sortReset()}>Actions</th>
                                </>
                                : null
                            }
                        </tr>
                    </thead>
                    {
                        renderStatus()
                    }
                </table>

                {
                    loading ? <h1>"LOADING..."</h1> :
                        <button
                            type='button'
                            id="noneButton"
                            className='btn btn-outline-warning'
                            onClick={status === "todos" ? () => wholePageTodos() : () => wholePagePosts()}
                        >Click to load the whole page
                        </button>
                }
            </div>
        </div>
    )
}

export default TableFn;