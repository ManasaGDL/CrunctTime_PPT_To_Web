import React from 'react';
import { Chip, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  truncatedText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

function TruncatedChip({ label }) {
  const classes = useStyles();

  return (
    <Tooltip title={label}>
      <Chip
        label={<Typography className={classes.truncatedText}>{label}</Typography>}
        color='primary'
      />
    </Tooltip>
  );
}

export default TruncatedChip;