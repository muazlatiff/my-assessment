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
import GorestPostsModal from '../GorestList/GorestPostsModal';

import styles from '../View-Styles/gorestPage';

const useStyles = makeStyles(styles);

const gorestAccess = atob(document.querySelector('meta[name="gorest"]').content);
window.axios.defaults.headers.common['Authorization'] = `Bearer ${gorestAccess}`;

export default function goRestPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({
    data: [],
    total_page: 1,
    current_page: 1,
  });
  
  const [listPosts, setListPosts] = useState({
    data: [],
    total_page: 1,
    current_page: 1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(0);
  const [modalUserName, setModalUserName] = useState('');
  const [modalUserActive, setModalUserActive] = useState(false);

  // ajax fetch users
  const URLfetchUsers = 'https://gorest.co.in/public-api/users';
  const fetchUsers = (_query='', _callback=function(){data}) => {
    setIsLoading(true);

    axios({
      method: 'GET',
      url: `${URLfetchUsers}?${_query}`,
    })
      .then(function (response) {
        let _fetched = response.data.data;
        setList({
          data: _fetched,
          total_page: response.data.meta.pagination.pages,
          current_page: response.data.meta.pagination.page,
        });
        _callback(_fetched);
        setIsLoading(false);
      })
      .catch(function (response) {
        setIsLoading(false);
      });
  };
  
  // ajax fetch posts
  const URLfetchPosts = `https://gorest.co.in//public-api/users/${modalUser}/posts`;
  const fetchPosts = (_query='', _callback=function(){data}) => {
    setIsLoading(true);

    axios({
      method: 'GET',
      url: `${URLfetchPosts}?${_query}`,
    })
      .then(function (response) {
        let _fetched = response.data.data;
        setListPosts({
          data: _fetched,
          total_page: response.data.meta.pagination.pages,
          current_page: response.data.meta.pagination.page,
        });
        _callback(_fetched);
        setIsLoading(false);
      })
      .catch(function (response) {
        setIsLoading(false);
      });
  };

  // ajax add post
  const addPosts = (_data, _callback=function(){}) => {
    setIsLoading(true);

    axios({
      method: 'POST',
      url: `${URLfetchPosts}`,
      data: _data,
    })
      .then(function (response) {
        Swal.fire({
            icon: 'success',
            title: `Successfully Added Post`,
        }).then(function() {
          _callback();
          setIsLoading(false);
        });
      })
      .catch(function (err) {
        Swal.fire({
            icon: 'error',
            title: `Add Post Failed`,
            html: JSON.stringify(err.response.data),
        }).then(function() {
          setIsLoading(false);
        });
      });
  };

  // ajax delete post
  const URLDeletePosts = `https://gorest.co.in/public-api/posts`;
  const deletePosts = (_id, _callback=function(){}) => {
    setIsLoading(true);

    axios({
      method: 'DELETE',
      url: `${URLDeletePosts}/${_id}`,
    })
      .then(function (response) {
        Swal.fire({
            icon: 'success',
            title: `Successfully Deleted Post`,
        }).then(function() {
          _callback();
          setIsLoading(false);
        });
      })
      .catch(function (err) {
        Swal.fire({
            icon: 'error',
            title: `Delete Post Failed`,
            html: JSON.stringify(err.response.data),
        }).then(function() {
          setIsLoading(false);
        });
      });
  };

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
          {isLoading ?
            <Loader /> :
            <GorestList
              loader={{ isLoading, setIsLoading, }}
              fetched={{ list, setList, fetchUsers, }}
              modal={{ modalOpen, setModalOpen, modalUser, setModalUser, modalUserName, setModalUserName, modalUserActive, setModalUserActive, }} />
          }
        </Container>
        <GorestPostsModal
          loader={{ isLoading, setIsLoading, }}
          fetched={{ listPosts, setListPosts, fetchPosts, addPosts, deletePosts, }}
          modal={{ modalOpen, setModalOpen, modalUser, setModalUser, modalUserName, setModalUserName, modalUserActive, setModalUserActive, }} />
      </div>
      <Footer />
    </div>
  );
}
