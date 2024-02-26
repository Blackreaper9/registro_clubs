"use client";
import { useEffect, useState } from 'react';

import axios from 'axios';
import React from 'react';

type TRegistros = {
    id?:number;
    start_time:string;
    end_time:string;
    name:string;
    nameclub:string;
}
type TRes = { 
    msg:string;
    data:any;
}
const headers = {
    headers: {
    "content type": "aplication/json",
    }
}
export default function CrudRegistrosPage() {
    useEffect(() => {
       getRegistros();
    }, []);
    
    const [Registros, setRegistros] = useState<TRegistros[]>([]);
    const[Registro, setRegistro] = useState<TRegistros>({
        start_time:"00:00",
        end_time:"00:00",
        name:"",
        nameclub:"",

    });
    const [isEditable, setIsEditable] = useState(false);

    const onChange = ( r:any)=> {
        const data: any = Registro; 
        data[r.target.name] = r.target.value;
        setRegistro(data);
    }


    const getRegistros = async () =>{
         try {
            const response = await axios.get<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`);
            if(response.data.data ) {
             setRegistro (response.data.data);

            }

        } catch (error) {
            alert(`ERROR: ${ error }` );
        }
    }



    const createRegistros = async () => {
        try {
            const response = await axios.post<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/create`,Registro, headers);
            getRegistros();
        } catch (error) {
            alert(`ERROR: ${ error }`);
        }
    }

    
    const updateRegistro = async (id:number) => {
        try {
            await axios.put<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/update/${Registro.id}`,
                Registro, 
                headers
            );
            getRegistros();
            setIsEditable(false);
        } catch (error) {
            alert(`ERROR: ${ error }` );
        }
    }

    const deleteRegistro = async (id: number) => {
        try {
            await axios.delete<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${Registro.id}`,
              
            );
            getRegistros();
        } catch (error) {
            alert(`ERROR: ${ error }` );
        }
    }
    const preUpdate = (r:TRegistros) => {
        setRegistro(r);
        setIsEditable(true);
    }
    


    return (
        <div>
            <h1>CRUD De Registros</h1>
            <div>
                <label htmlFor="name">Ingresa tu nombre:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='name'
                    placeholder='Nombre'
                /><br/>
                <label htmlFor="start_time">Ingresa el inicio del club:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='start_time'
                    placeholder='Inicio'
                /><br/>
                <label htmlFor="end_time">Ingresa el final del club:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='end_time'
                    placeholder='Fin'
                /><br/>
                <label htmlFor="nameclub">Ingresa el nombre del club:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='nameclub'
                    placeholder='club'
                /><br/>
            </div>
            <button onClick={createRegistros}>Agregar clubs</button>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Nombre del club</th>
                    <th>Opciones</th>
                </tr>
                {Registros.map((Registro, index) => (
                    <tr key={index}>
                        <td>{Registro.name}</td>
                        <td>{Registro.start_time}</td>
                        <td>{Registro.end_time}</td>
                        <td>{Registro.nameclub}</td>
                        <td>
                            <button onClick={() => deleteRegistro(Registro.id ?? 0)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={() => preUpdate(Registro)}>Update</button>
                        </td>
                    </tr>
                ))}
            </table>

            {
                isEditable && (
                    <div>
                        <h2>Formulario para actualizar</h2>
                        <label htmlFor="name">Ingresa tu nombre :</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={Registro.name}
                            name='name'
                        /><br/>
                        <label htmlFor="start_time">Ingresa el inicio del club:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={Registro.start_time}
                            name='start_time'
                        /><br/>
                        <label htmlFor="end_time">Ingresa el final del club:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={Registro.end_time}
                            name='end_time'
                        /><br/>
                        <label htmlFor="nameclub">Ingresa el nombre del club :</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={Registro.nameclub}
                            name='nameclub'
                        /><br/>
                        <button onClick={() => updateRegistro(Registro.id ?? 0)}>Guardar</button>
                    </div>
                )
            }
        </div>
    );
}

