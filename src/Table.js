import React from 'react'
import './Table.css'

function Table({ countries }) {
    return (
        <div className="table">
            {
                countries.map(({ country, cases , countryInfo}, index) => (
                    <tr key={index+1}>
                        <td><img className="table_image" src={countryInfo.flag} alt={country} /> {country}</td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
