import React from 'react'
import './RentedCarsList.css'

export default function RentedCarsList({ reservations }) {
  return (
    <>
      <table className="rentedCarsTable">
        <thead>
          <tr>
            <th>Reservation id</th>
            <th>Car Name</th>
            <th>Renter</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total revenue</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.car_name}</td>
              <td>{reservation.client_name}</td>
              <td>{reservation.date_start}</td>
              <td>{reservation.date_end}</td>
              <td>{reservation.total_prix} dhs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}