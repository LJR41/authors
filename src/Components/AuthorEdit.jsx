import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthorEdit = () => {
    const [authName, setAuthName] = useState()
    const [error, setError] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                const name = response.data.name
                setAuthName(name)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/author/${id}`, { name: authName })
            .then(response => {
                console.log(response)
                navigate(`/`)
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
    }

    const deleteAuthor = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/author/delete/${id}`)
            .then(response => navigate('/'))
            .catch(err => console.log(err))

    }
    return (
        <div>

            <form onSubmit={handleSubmit} >
                <div style={{ flex: 3, flexDirection: 'column' }}>
                    <div style={{ marginBottom: 10 }}>
                        <label htmlFor="title" style={{ marginRight: 5 }}>Title</label>
                        <input type="text" name="title" value={authName} onChange={e => setAuthName(e.target.value)} />
                    </div>
                    <button type='submit'>Confirm</button>
                    <button onClick={deleteAuthor}>Delete </button>
                </div>
            </form>
            {
                error.map((err, idx) => <p style={{ color: 'red' }} key={idx}>{err}</p>)
            }
        </div>
    )
}

export default AuthorEdit
