import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Homepage() {


    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/todos")
            // .then(res => console.log(res.data))
            .then(res => setTitle(res.data))
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

 const shortTitle = () => {
        axios("https://jsonplaceholder.typicode.com/todos")
            // .then(res => console.log(res.data))
            .then(res => setTitle(res.data.slice(0,50).reverse()))
            .catch(e => console.log("error:", e))
        setLoading(false)
}

const editLoading = () => {
    window.alert("sonra yapacağuz....")
}




    return (
        <div className='container mt-3'>
            <div className='row'>

                <table className="table">
                    <thead>
                        <tr className='' id='sort'>
                            <th scope="col" onClick={() => shortTitle()}>#</th>
                            <th scope="col" onClick={() => shortTitle()}>Title</th>
                            <th scope="col" onClick={() => shortTitle()}>Completed</th>
                            <th scope="col" onClick={() => shortTitle()}>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading == true ? <h1>LOADING...</h1> :
                            title.slice(0, 50).map((item, key) => (
                                <tbody key={key} id="tbodyId">
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title.toUpperCase().slice(0,1)}{item.title.toLowerCase().slice(1)}</td>
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

            </div>
        </div>
    )
}

export default Homepage;