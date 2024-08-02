import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayer = createAsyncThunk('player/fetchPlayer', async (username) => {
  const response = await axios.get(`https://api.wiseoldman.net/v2/players/${username}`);
  return response.data;
});

export const fetchPlayerGains = createAsyncThunk('player/fetchPlayerGains', async (username) => {
  const response = await axios.get(`https://api.wiseoldman.net/v2/players/${username}/gained?period=week`);
  return { username, gains: response.data.data };
});

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: {},
    gains: {},
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
      })
      .addCase(fetchPlayerGains.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayerGains.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gains[action.payload.username] = action.payload.gains;
      })
      .addCase(fetchPlayerGains.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default playerSlice.reducer;
