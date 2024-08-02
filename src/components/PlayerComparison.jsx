import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import PlayerStats from './PlayerStats';

const PlayerComparison = ({ username1, username2, comparisonMode }) => {
  const player1 = useSelector((state) => state.player.players[username1]);
  const player2 = useSelector((state) => state.player.players[username2]);
  const gains1 = useSelector((state) => state.player.gains[username1]);
  const gains2 = useSelector((state) => state.player.gains[username2]);

  if (!player1 || !player2 || !gains1 || !gains2) {
    return <Typography>Please search for both players.</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <PlayerStats player={player1} otherPlayer={player2} playerName={username1} gains={gains1} otherGains={gains2} comparisonMode={comparisonMode} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <PlayerStats player={player2} otherPlayer={player1} playerName={username2} gains={gains2} otherGains={gains1} comparisonMode={comparisonMode} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerComparison;
