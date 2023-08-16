import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthorForm = () => {
    const [authName, setAuthName] = useState("")
    const [error, setError] = useState([])
    const navigate = useNavigate()


    const updateName = (e) => {
        setAuthName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/authors', { name: authName })
            .then(response => {
                console.log(response)
                navigate('/author')
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
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="authName">Author Name</label>
                <input type="text" name='authName' value={authName} onChange={updateName} />
                <button type='submit'>Submit</button>
                {
                    error.map((err, idx) => <p style={{ color: 'red' }} key={idx}>{err}</p>)
                }
            </form>

        </div>
    )
}

export default AuthorForm