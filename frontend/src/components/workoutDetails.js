/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const workoutDetails = ({workout}) => {

  const { dispatch } = useWorkoutsContext()

  const handClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

console.log(workout._id)

  return (
    <div className='workout-details'>
        <h3>{workout.title}</h3>
        <p>Load (kg): {workout.load}</p>
        <p>Reps: {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        {/* <p>{workout.createdAt}</p> */}
        <span onClick={handClick}>delete</span>
    </div>
  )
}

export default workoutDetails
