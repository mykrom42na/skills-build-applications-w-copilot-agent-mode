import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function Home() {
  return (
    <div className="container page-container">
      <div className="jumbotron p-5 rounded shadow">
        <h1 className="display-4">Welcome to OctoFit Tracker 🎯</h1>
        <p className="lead">Track your fitness activities, compete with teams, and achieve your fitness goals!</p>
        <hr className="my-4" />
        <p>Use the navigation menu above to explore different features of the app.</p>
        <div className="mt-4">
          <Link to="/activities" className="btn btn-light btn-lg me-2">
            🏃 View Activities
          </Link>
          <Link to="/leaderboard" className="btn btn-outline-light btn-lg">
            📊 View Leaderboard
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="mb-3" style={{ fontSize: '3rem' }}>👥</div>
              <h5 className="card-title">Users & Teams</h5>
              <p className="card-text">Manage your profile and join teams to compete together.</p>
              <Link to="/users" className="btn btn-primary">View Users</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="mb-3" style={{ fontSize: '3rem' }}>💪</div>
              <h5 className="card-title">Workouts</h5>
              <p className="card-text">Get personalized workout suggestions tailored to your goals.</p>
              <Link to="/workouts" className="btn btn-primary">Browse Workouts</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <div className="mb-3" style={{ fontSize: '3rem' }}>🏆</div>
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text">See how you rank against other fitness enthusiasts.</p>
              <Link to="/leaderboard" className="btn btn-primary">View Rankings</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👥 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">🏆 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">📊 Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
