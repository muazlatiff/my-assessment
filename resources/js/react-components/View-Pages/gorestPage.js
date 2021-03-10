import React, { useState, useEffect } from 'react';

// @material-ui/core components
import {
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// custom components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import GorestList from '../GorestList/GorestList';

import styles from '../View-Styles/gorestPage';

const useStyles = makeStyles(styles);

export default function goRestPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  // Component onmounted
  const onPageUnmounted = () => {
  }

	// Component mounted (document ready)
	const onPageMounted = () => {
   		return () => { onPageUnmounted() };
	};
	useEffect(onPageMounted, []);

  return (
    <div>
      <Header
        color='primary'
        routes={[]}
        brand='MY-ASSESSMENT'
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'info'
        }}
        {...rest}
      />
      <div className={classes.container}>
        <Container fixed classes={{
          fixed: `${classes.containerHeight} ${classes.containerBody}`,
        }}>
          <h1 className={`flex justify-center m-5`}>GOREST Playground</h1>
          {isLoading ? <Loader /> : <GorestList loader={{ isLoading, setIsLoading, }} />}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
