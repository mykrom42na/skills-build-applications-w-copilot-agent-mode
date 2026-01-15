import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching leaderboard from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        console.log('Leaderboard API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed Leaderboard Data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
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

  return (
    <div className="container page-container">
      <div className="page-header">
        <h2>📊 Leaderboard</h2>
        <p>See who's leading the fitness challenge</p>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-warning">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Team</th>
              <th scope="col">Score</th>
              <th scope="col">Period</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  <i>No leaderboard entries found</i>
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-warning' : ''}>
                  <td>
                    <span className="rank-medal">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </span>
                  </td>
                  <td><strong>{entry.user}</strong></td>
                  <td>
                    {entry.team ? (
                      <span className="badge bg-primary">{entry.team}</span>
                    ) : (
                      <span className="badge bg-secondary">No team</span>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-success fs-6">{entry.score}</span>
                  </td>
                  <td>{entry.period}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-3">
        <p className="text-muted small">Total Entries: <strong>{leaderboard.length}</strong></p>
      </div>
    </div>
  );
}

export default Leaderboard;
