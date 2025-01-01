import React, { useState, useEffect } from 'react';
import './Overview.css';
import RentedCarsList from './RentedCarsList';
import { getReservationsAdmin } from '../../../services/AdminService';
import { getCars } from '../../../services/AdminService';
import { all } from 'axios';

export default function Overview() {
  const [allreservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metric,setmetrics]= useState({totalcars:0,rented:0,total:0,average:0});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const reservations = await getReservationsAdmin();
        setReservations(reservations)
  
      
        const filteredReservations = reservations.filter(reservation => {
          const endDate = new Date(reservation.date_end);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          console.log(endDate);
          console.log(today);
          
          
           
          return endDate > today;
        });

        console.log(filteredReservations);
        
        const totalMoney = reservations.reduce((sum, reservation) => {
          // Convert to number and handle invalid values (e.g., null or undefined)
          const price = parseFloat(reservation.total_prix) || 0; 
          return sum + price;
        }, 0);
        const average = totalMoney / allreservations.length
  
        setmetrics(prevMetrics => ({
          ...prevMetrics, 
          rented: filteredReservations.length 
          ,total: totalMoney,
          average: average
      }));
      } catch (err) {
        setError(err); 
      } finally {
        setIsLoading(false); 
      }
    };
  
    fetchData();
  }, []);
  
   
    useEffect(() => {
      const fetchData = async () => {
          const allcars = await getCars(); 
          setmetrics(prevMetrics => ({
            ...prevMetrics, 
            totalcars: allcars.length 
        }));
        
          
      };

      fetchData();
  }, []);


  return (
    <>
      <h5 className='SectionTitle'>General overview</h5>
      <div className="overview">
        <div className="generalMetrics">
          <span>Number of cars</span>
          <h5>{metric.totalcars}</h5>
        </div>
        <div className="generalMetrics">
          <span>Number of rented cars</span>
          <h5>{metric.rented}</h5>
        </div>
        <div className="generalMetrics">
          <span>Total revenue</span>
          <h5>{metric.total} dhs</h5>
        </div>
        <div className="generalMetrics">
          <span>Average revenue per car</span>
          <h5>{metric.average} dhs</h5>
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