import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import skillIcons from '../icons';
import ehp from '../assets/ehp.webp';
import ehb from '../assets/ehb.webp';

const getHigherStatStyle = (playerStat, otherPlayerStat) => {
  if (playerStat > otherPlayerStat) {
    return { color: '#28a745', fontWeight: 'bold' }; // Green for higher value
  } else {
    return {};
  }
};

const PlayerStats = ({ player, otherPlayer, playerName }) => {
  return (
    <Box>
      <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
        {playerName}
      </Typography>
      <Box display="flex" justifyContent="space-around" my={2}>
        <Box textAlign="center">
          <img src="https://oldschool.runescape.wiki/images/Combat_icon.png?93d63" alt="Combat" style={{ width: 24, height: 24 }} />
          <Typography variant="body1">Combat Lvl</Typography>
          <Typography variant="h6" style={getHigherStatStyle(player.combatLevel, otherPlayer.combatLevel)}>{player.combatLevel}</Typography>
        </Box>
        <Box textAlign="center">
          <img src="https://oldschool.runescape.wiki/images/Skills_icon.png?a8e9f" alt="Overall Exp." style={{ width: 24, height: 24 }} />
          <Typography variant="body1">Overall Exp.</Typography>
          <Typography variant="h6" style={getHigherStatStyle(player.exp, otherPlayer.exp)}>{player.exp.toLocaleString()}</Typography>
        </Box>
        <Box textAlign="center">
          <img src={ehp} alt="EHP" style={{ width: 24, height: 24 }} />
          <Typography variant="body1">EHP</Typography>
          <Typography variant="h6" style={getHigherStatStyle(player.ehp, otherPlayer.ehp)}>{player.ehp.toFixed(2)}</Typography>
        </Box>
        <Box textAlign="center">
          <img src={ehb} alt="EHB" style={{ width: 24, height: 24 }} />
          <Typography variant="body1">EHB</Typography>
          <Typography variant="h6" style={getHigherStatStyle(player.ehb, otherPlayer.ehb)}>{player.ehb.toFixed(2)}</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body1">Time to Max</Typography>
          <Typography variant="h6" style={getHigherStatStyle(-player.ttm, -otherPlayer.ttm)}>{Math.round(player.ttm)} hours</Typography>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stat</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(player.latestSnapshot.data.skills).map((stat) => (
            <TableRow key={stat}>
              <TableCell>
                <img src={skillIcons[stat]} alt={`${stat} icon`} style={{ width: 24, height: 24, marginRight: 8 }} />
                {stat.charAt(0).toUpperCase() + stat.slice(1)}
              </TableCell>
              <TableCell style={getHigherStatStyle(player.latestSnapshot.data.skills[stat].level, otherPlayer.latestSnapshot.data.skills[stat].level)}>
                {player.latestSnapshot.data.skills[stat].level}
              </TableCell>
              <TableCell>{player.latestSnapshot.data.skills[stat].experience.toLocaleString()}</TableCell>
              <TableCell>{player.latestSnapshot.data.skills[stat].rank.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PlayerStats;
