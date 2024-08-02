import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import PlayerStats from './PlayerStats';

const PlayerComparison = ({ username1, username2 }) => {
  const player1 = useSelector((state) => state.player.players[username1]);
  const player2 = useSelector((state) => state.player.players[username2]);

  if (!player1 || !player2) {
    return <Typography>Please search for both players.</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <PlayerStats player={player1} otherPlayer={player2} playerName={username1} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <PlayerStats player={player2} otherPlayer={player1} playerName={username2} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerComparison;
