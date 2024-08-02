import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerDetails } from '../redux/playerSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const PlayerSearch = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const playerStatus = useSelector((state) => state.player.status);
  const error = useSelector((state) => state.player.error);

  const handleSearch = () => {
    if (inputValue) {
      dispatch(fetchPlayerDetails(inputValue));
      setUsername(inputValue);
      setInputValue('');
    }
  };

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Player Username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          style={{ marginRight: '10px' }}
          fullWidth
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>
      </Box>
      {playerStatus === 'loading' && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
    </Container>
  );
};

export default PlayerSearch;
