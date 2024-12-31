import React, { useState, useEffect } from 'react';
import './Overview.css';
import RentedCarsList from './RentedCarsList';
import { getReservationsAdmin } from '../../../services/AdminService';

export default function Overview() {
  const [allreservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const reservations = await getReservationsAdmin();
        setReservations(reservations);
      } catch (err) {
        setError(err); 
      } finally {
        setIsLoading(false); // Set loading state to false after fetching is complete
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h5 className='SectionTitle'>General overview</h5>
      <div className="overview">
        <div className="generalMetrics">
          <span>Number of cars</span>
          <h5>20</h5>
        </div>
        <div className="generalMetrics">
          <span>Number of rented cars</span>
          <h5>12</h5>
        </div>
        <div className="generalMetrics">
          <span>Total revenue</span>
          <h5>3600 dhs</h5>
        </div>
        <div className="generalMetrics">
          <span>Average revenue per car</span>
          <h5>300 dhs</h5>
        </div>
      </div>
      <h5 className='SectionTitle'>All reservations :</h5>
      <div className="RentedCars">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching reservations: {error}</p>
        ) : (
          <RentedCarsList reservations={allreservations} />
        )}
      </div>
    </>
  );
}