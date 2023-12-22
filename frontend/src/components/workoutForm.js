/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext'

const workoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    // e was abbrivated from event
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            // activate below's code to use full validation custom method but with error unique key (yet fix done clear)
            // setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add new workout</h3>
        <label>Exercise Title :</label>
        <input type='text'
        onChange={(e) => setTitle(e.target.value)}
        maxLength={20}
        value={title}
        className={emptyFields.includes('title') ? 'error':''}>
        </input>

        <label>Load (kg):</label>
        <input type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error':''}>
        </input>

        <label>Reps :</label>
        <input type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error':''}>
        </input>

        <button>Add workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default workoutForm
