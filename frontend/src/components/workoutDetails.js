/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const workoutDetails = ({workout}) => {

  const { dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()

  const handClick = async () => {
    if (!user) {
      return
  }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
    }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className='workout-details'>
        <h3>{workout.title}</h3>
        <p>Load (kg): {workout.load}</p>
        <p>Reps: {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        {/* <p>{workout.createdAt}</p> */}
        <span onClick={handClick} className='btn-delete'>delete</span>
    </div>
  )
}

export default workoutDetails
