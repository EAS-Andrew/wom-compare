import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchPlayer, fetchPlayerGains } from './redux/playerSlice';
import PlayerComparison from './components/PlayerComparison';

function App() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [comparisonMode, setComparisonMode] = useState('stat'); // Default comparison mode
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (username1) {
      dispatch(fetchPlayer(username1));
      dispatch(fetchPlayerGains(username1));
      setSearch1(username1);
    }
    if (username2) {
      dispatch(fetchPlayer(username2));
      dispatch(fetchPlayerGains(username2));
      setSearch2(username2);
    }
  };

  const handleComparisonModeChange = (event) => {
    setComparisonMode(event.target.value);
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
        <Select
          value={comparisonMode}
          onChange={handleComparisonModeChange}
          variant="outlined"
        >
          <MenuItem value="stat">Stat Comparison</MenuItem>
          <MenuItem value="gains">Gained Comparison</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <PlayerComparison username1={search1} username2={search2} comparisonMode={comparisonMode} />
    </Container>
  );
}

export default App;
