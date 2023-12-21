/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm';

const home = () => {

  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
    }

    fetchWorkouts();
  });

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default home
