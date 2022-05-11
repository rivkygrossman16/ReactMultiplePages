import React from 'react';
import { Route, Link } from 'react-router-dom';
function CarsRow({ car }) {
    const { make, model, year } = car;
    return (
        <tr>

            <td>{make}</td>
            <td>{model}</td>
            <td>{year}</td>
        </tr>
    )
}

export default CarsRow;