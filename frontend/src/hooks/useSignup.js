import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        setLoading(true)

        const response = await fetch('https://mer-nstack-opv-server.vercel.app/api/user/signup/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
        
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setLoading(false)
        }
    }

    return {signup, isLoading, error}
}
