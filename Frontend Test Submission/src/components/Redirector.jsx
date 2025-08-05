import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logger from './LoggerMiddleware';

export default function Redirector() {
  const { shortcode } = useParams();

  useEffect(() => {
    logger('Redirection accessed', { shortcode });

    const map = JSON.parse(localStorage.getItem('urlMap') || '{}');
    const entry = map[shortcode];

    if (entry) {
      const now = new Date();
      const expiry = new Date(entry.expiry);

      if (now <= expiry) {
        alert(`Redirecting to: ${entry.longUrl}`);
        window.location.href = entry.longUrl;
      } else {
        alert(`Link expired!`);
      }
    } else {
      alert('Invalid or unknown shortcode!');
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}
