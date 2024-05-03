import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShopDetails() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [foundProperty, setFoundProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bayut.p.rapidapi.com/properties/list', {
          params: {
            locationExternalIDs: '5002,6020',
            purpose: 'for-rent',
            hitsPerPage: '25',
            page: '2',
            lang: 'en',
            sort: 'city-level-score',
            rentFrequency: 'monthly',
            categoryExternalID: '4',
            hasVideo: 'true',
          },
          headers: {
            'X-RapidAPI-Key': '32fd3a9dfamsh549f8b0fd7b9faap1bee35jsn86948ade3195',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
          },
        });

        const property = response.data.hits.find(prop => prop.id === id);
        if (property) {
          setFoundProperty(property);
        } else {
          setError(new Error('Property not found'));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Include 'id' in the dependency array to refetch data when 'id' changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!foundProperty) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="shop-details-container">
      {/* Display property details */}
      <h2>{foundProperty.title}</h2>
      {/* Add more details as needed */}
    </div>
  );
}

export default ShopDetails;
