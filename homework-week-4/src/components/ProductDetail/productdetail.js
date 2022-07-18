import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AddToCart } from '../add-to-cart';

const URL = "http://localhost:4000/api/products";

function ProductDetail() {

    const { id } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios(URL)
            .then(res => setItems((res.data)))
            .catch(e => console.log("error:", e))
    }, []);

    return (
        <div className=' container mt-5'>
            {
                items.map((category, index) => (
                    <div className="row" key={index}>
                        <h1 className='col-12' style={{ textAlign: "center" }}>{category.name}</h1>
                        {
                            category.products.map((item, i) => (
                                <div className="row mt-5" key={i}>
                                    <div className='col-6'>
                                        <img
                                            src={item.image_url}
                                            alt="..."
                                            width={400}
                                            height={400}
                                        />
                                    </div>


                                    <div className="col-6" >
                                        <h3 className='mb-5' style={{ color: "red" }}>{item.name}</h3>
                                        <span ><AddToCart item={item} /></span>
                                        <p className='mt-3 text-danger'>{item.price.toFixed(2)} {"TL"}</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis officia recusandae deleniti, tempora reprehenderit voluptatem eius, nesciunt nam numquam consequuntur magni pariatur, quae provident! Atque dolores animi voluptatum eum iure.</p>
                                    </div>

                                </div>
                            ))
                        }
                        <hr />
                    </div>
                ))
            }
        </div >
    )
}

export default ProductDetail;