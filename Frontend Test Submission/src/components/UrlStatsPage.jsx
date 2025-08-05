import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

export default function UrlStatsPage() {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');

  return (
    <Container>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      {logs.map((log, i) => (
        <Card key={i} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><b>Time:</b> {log.timestamp}</Typography>
            <Typography><b>Message:</b> {log.message}</Typography>
            <pre>{JSON.stringify(log, null, 2)}</pre>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
