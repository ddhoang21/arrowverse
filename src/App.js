import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import MainShow from './pages/MainShow/MainShow';
import CastMember from './pages/CastMember/CastMember';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [showData, setShowData] = useState([null]);
  const [castData, setCastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getShowData = () => {
    return axios.get('https://api.tvmaze.com/shows/4');
  };

  const getCastData = () => {
    return axios.get('https://api.tvmaze.com/shows/4/cast');
  };

  useEffect(() => {
    Promise.all([getShowData(), getCastData()])
      .then((responses) => {
        const show = responses[0].data;
        const cast = responses[1].data;

        setShowData(show);
        setCastData(cast);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <div>
      <MainHeader />
      <Routes>
        <Route
          path='/'
          element={<MainShow showData={showData} castData={castData} />}
        />
        <Route path='/cast/:id' element={<CastMember castData={castData} />} />
      </Routes>
    </div>
  );
};

export default App;
