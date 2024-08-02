import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayer = createAsyncThunk('player/fetchPlayer', async (username) => {
  const response = await axios.get(`https://api.wiseoldman.net/v2/players/${username}`);
  return response.data;
});

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players[action.payload.username] = action.payload;
      })
      .addCase(fetchPlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default playerSlice.reducer;
