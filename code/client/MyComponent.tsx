import React, { useEffect, useState } from 'react';


//React fetching data from express: Pass!
//React feteching data to express: 
function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Make a GET request to the Express.js server
        fetch('http://localhost:8080/login')
            .then((response) => response.json())
            .then((jsonData) => {
                // Set the fetched data in the component's state
                setData(jsonData.user);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {data ? (
                <div>
                    <p>Users:</p>
                    <ul>
                        {data.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading data...</p>
            )}



        </div>
    );
}

export default MyComponent;
