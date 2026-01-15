import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching workouts from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        console.log('Workouts API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed Workouts Data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container page-container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container page-container">
        <div className="alert alert-danger alert-custom" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (level) => {
    const badges = {
      'beginner': 'bg-success',
      'intermediate': 'bg-warning text-dark',
      'advanced': 'bg-danger'
    };
    return badges[level?.toLowerCase()] || 'bg-secondary';
  };

  return (
    <div className="container page-container">
      <div className="page-header">
        <h2>💪 Workout Suggestions</h2>
        <p>Personalized workout recommendations to achieve your fitness goals</p>
      </div>
      
      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info alert-custom text-center">
              <p className="mb-0"><i>No workouts available at this time</i></p>
            </div>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{workout.description}</p>
                  <hr />
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2">
                      <strong>Type:</strong> 
                      <span className="badge bg-info text-dark ms-2">{workout.workout_type}</span>
                    </li>
                    <li className="mb-2">
                      <strong>Difficulty:</strong> 
                      <span className={`badge ${getDifficultyBadge(workout.difficulty_level)} ms-2`}>
                        {workout.difficulty_level}
                      </span>
                    </li>
                    <li className="mb-2">
                      <strong>⏱️ Duration:</strong> {workout.duration} minutes
                    </li>
                    <li className="mb-2">
                      <strong>🔥 Calories:</strong> ~{workout.estimated_calories} kcal
                    </li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <button className="btn btn-primary w-100">Start Workout</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-3">
        <p className="text-muted small">Total Workouts: <strong>{workouts.length}</strong></p>
      </div>
    </div>
  );
}

export default Workouts;
