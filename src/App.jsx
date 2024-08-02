import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchPlayer } from './redux/playerSlice';
import PlayerComparison from './components/PlayerComparison';

function App() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (username1) {
      dispatch(fetchPlayer(username1));
      setSearch1(username1);
    }
    if (username2) {
      dispatch(fetchPlayer(username2));
      setSearch2(username2);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Player Comparison App
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Player Username"
          variant="outlined"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
        />
        <TextField
          label="Player Username"
          variant="outlined"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <PlayerComparison username1={search1} username2={search2} />
    </Container>
  );
}

export default App;
