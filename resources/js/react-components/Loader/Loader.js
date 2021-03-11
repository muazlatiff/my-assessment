import React from 'react';

// @material-ui/core components
import {
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { containerHeight, } from '../View-Styles/base';
const styles = { containerHeight, };

const useStyles = makeStyles(styles);

export default function Loader(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="center" classes={{
      root: classes.containerHeight,
    }} {...rest}>
      <CircularProgress color="secondary" />
    </Grid>
  );
}
