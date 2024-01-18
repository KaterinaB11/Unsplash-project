import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function AuthorInfo({ apiKey }) {
  const { authorUsername } = useParams();
  const [authorInfo, setAuthorInfo] = useState({});
  const [authorImages, setAuthorImages] = useState([]);

  useEffect(() => {
    // Fetch author information
    fetch(`https://api.unsplash.com/users/${authorUsername}?client_id=${apiKey}`)
      .then(response => response.json())
      .then(data => setAuthorInfo(data))
      .catch(error => console.error('Error fetching author information:', error));

    // Fetch author's images
    fetch(`https://api.unsplash.com/users/${authorUsername}/photos?client_id=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Check for errors in the API response
        if (data.errors) {
          console.error('Error fetching author images:', data.errors);
        } else {
          // Ensure that authorImages is an array before setting state
          if (Array.isArray(data)) {
            setAuthorImages(data);
          } else {
            console.error('Invalid data format for author images:', data);
          }
        }
      })
      .catch(error => console.error('Error fetching author images:', error));
  }, [authorUsername, apiKey]);

  return (
    <div>
      <h2>Author Information</h2>
      <p>Name: {authorInfo.name}</p>
      <p>Username: {authorInfo.username}</p>
      <p>Location: {authorInfo.location}</p>
      <p>Downloads: {authorInfo.downloads}</p>
      <p>Likes: {authorInfo.likes}</p>

      <h2>Author's Images</h2>
      <div className="authorImages">
        {Array.isArray(authorImages) && authorImages.map(image => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
}