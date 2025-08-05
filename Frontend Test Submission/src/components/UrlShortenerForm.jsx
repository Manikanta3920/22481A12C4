import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import logger from './LoggerMiddleware';

export default function UrlShortenerForm() {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const validateUrl = (url) => /^https?:\/\/.+\..+/.test(url);

  const handleSubmit = () => {
    const newResults = [];
    const map = JSON.parse(localStorage.getItem('urlMap') || '{}');

    for (let { url, validity, shortcode } of urls) {
      if (!validateUrl(url)) {
        alert(`Invalid URL: ${url}`);
        return;
      }

      const shortCode = shortcode || Math.random().toString(36).substring(2, 8);
      const shortUrl = `${window.location.origin}/${shortCode}`;
      const expiry = new Date(Date.now() + (parseInt(validity) || 30) * 60000);

      // ✅ Save mapping
      map[shortCode] = { longUrl: url, expiry: expiry.toISOString() };
      newResults.push({ longUrl: url, shortUrl, expiry: expiry.toLocaleString() });

      logger('Submitting URL', { shortCode, longUrl: url, expiry });
    }

    localStorage.setItem('urlMap', JSON.stringify(map));
    setResults(newResults);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Long URL"
              value={item.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              value={item.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Shortcode (optional)"
              value={item.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
  <Button variant="outlined" onClick={addUrlField}>+ Add More</Button>
  <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>
</div>
      {results.map((res, i) => (
        <Card
  key={i}
  sx={{
    mt: 2,
    backgroundColor: '#f9fafb',
    borderLeft: '4px solid #1976d2',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.01)' },
  }}
>
  <CardContent>
    <Typography variant="body1" gutterBottom><b>Original:</b> {res.longUrl}</Typography>
    <Typography variant="body1" gutterBottom>
      <b>Short:</b> <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a>
    </Typography>
    <Typography variant="body2" color="text.secondary"><b>Expires at:</b> {res.expiry}</Typography>
  </CardContent>
</Card>
      ))}
    </Container>
  );
}
