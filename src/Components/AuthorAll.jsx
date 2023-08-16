import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const AuthorAll = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(err => {
                console.log(err)
                const errResponse = err.response.data.errors
                const errArr = []
                for (const eachKey in errResponse) {
                    errArr.push(errResponse[eachKey].message)
                }
                setError(errArr)


            })
    }, [])

    const authEdit = (e) =>{
        navigate(`/author/${e.target.value}/edit`)
    }

    const authDelete = (e) =>{
        axios.delete(`http://localhost:8000/api/author/${e.target.value}`)
            .then(res => removeFromDom(e.target.value))
            .catch(err=>console.log(err))
    }

    const removeFromDom = (deleteId)  => {
        const newAuthList = data.filter((eachAuth, idx)=> eachAuth._id !== deleteId)
        setData(newAuthList)
    }
    return (
        <div>
            {
                data ?
                    <div>
                        <table>
                            <tr>
                                <th>
                                    Authors
                                </th>
                                <th>
                                    Actions Available
                                </th>
                            </tr>

                            {data.map((eachAuth, Idx) => {
                                return (
                                <tr>
                                    <td>{eachAuth.name}</td>
                                    <td>
                                        <button value={eachAuth._id} onClick={authEdit}>Edit</button>
                                        <button value={eachAuth._id} onClick={authDelete}>Delete</button>
                                    </td>

                                </tr>
                            )})}
                        </table>
                    </div>
                    : <div>Loading...</div>
            }


        </div>
    )
}

export default AuthorAll