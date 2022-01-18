import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
import axios from 'axios';
const ArmaLaTuya = () => {
    const [ingredientes, setIngredientes] = useState([])
    const [seleccionados, setSeleccionados] = useState([])
    const [suma, setSuma] = useState(350)
    const seleccionar = (ing) => {
        setSeleccionados([...seleccionados, ing])
        setSuma(suma + ing.precio)
    }
    const eliminar = (element) =>{
        setSeleccionados(seleccionados.filter(selec=>selec.id !== element.id))
        setSuma(suma - element.precio)
    }
    useEffect(() => {
        axios.get('https://apipdtc.herokuapp.com/bulldog/ingredientes')
            .then((api) => {
                setIngredientes(api.data)
            })
    }, [])

    return (
        <div style={{ backgroundColor: "black", border: "1px solid red" }}>
            {ingredientes.length > 0 ?
                <div className='row'>
                    <h1 style={{ color: "white" }} className='container d-flex justify-content-center'>Armá la tuya!</h1>
                    <div className='col-6 '>
                        {ingredientes.map((ingrediente) => (
                            <button disabled={seleccionados.some(seleccionado=>seleccionado.id===ingrediente.id)}type="button" key={ingrediente.id} className="btn btn-outline-warning m-1 w-100" onClick={() => { seleccionar(ingrediente) }}>{ingrediente.nombre} <img src={require(`../../assets/img/ingredientes/${ingrediente.imagen}.png`)} style={{height:"20px", width:"20px"}}></img>
                            </button>
                        ))}
                    </div>
                    <div className='col-6'>
                        {seleccionados.length > 0 ?
                            <div>
                                <ul className="list-group m-1">
                                    <li className="list-group-item" style={{ margin: "1px" }}>Carne  -  350$</li>
                                    {seleccionados.map(item => (
                                        <li className="list-group-item d-flex" key={item.id} style={{ margin: "1px" }}>{item.nombre} -    {item.precio}$
                                            <button type="button" className='btn btn-danger mr-auto p-2 ' style={{ height: "40px", width: "40px", marginLeft: "80%"}} onClick={() =>  eliminar(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </li>))}
                                    <li className='list-group-item' style={{ margin: "1px" }}>Precio Final: {suma}$</li>
                                </ul>
                            </div>
                            :
                            <div>
                                <h1 style={{ color: "white" }}>Empezá a seleccionar!🍔🍟</h1>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="container d-flex justify-content-center">
                    <Oval arialLabel="loading-indicator" />
                </div>}
        </div>
    );
}

export default ArmaLaTuya;