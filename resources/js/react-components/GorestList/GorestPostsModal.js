import React, { useState, useEffect } from 'react';

// @material-ui/core components
import {
  Modal, Backdrop, Fade,
  Button, IconButton,
  TextField, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { containerHeight, modal, card, boxShadow, w300, vw70, } from '../View-Styles/base';
const styles = { containerHeight, modal, card, boxShadow, w300, vw70, };

const useStyles = makeStyles(styles);

let prev = "";
const randomSentence = (count) => {
  const sentences = [
      'You are somewhere in the ocean.',
      'You are the seer and the snake.',
      'The irony is that you are a Pure Soul, but you also experience your life.',
      'Months earlier, a high school student told me who I am.',
      'This is a new sense of self.',
      'Meditation has made a great impact on your life because no one else is going mad.',
      'YOU\'D HARDLY CHOOSE TO BE. YOU ARE GOD.',
      'IN REALITY, YOU ARE MAKING.',
      'SELF-REFLECTION IS A NEW SENSE OF SELF AND IS TRAGICALLY LIMITED.',
      'MEDITATION CAN HELP BRING YOU BACK IN THE IMAGE OF GOD, GOD IS THE SEER.',
      'All the suffering in life is because of what you\'ve done.',
      'A father, a husband because you have a son.',
      'A passenger because you have a son.',
      'You\'d have to permit that new sense of self waiting to be born.',
      'Daily, we are made in the wind.',
      'Though sinful, we can be reconciled to God in Christ and come to realize it\’s who I am.',
      'For infinite past lives the Soul has been given to you.',
      'It is essential to understand that you are an eternal Soul.',
      'A vapor in the ocean',
      'You are somewhere in the wind.',
      'The irony is that you are likely to crack.',
      'For those, who are you?',
      'There may be an identity crisis.',
      'I am yours',
      'THE TRUTH IS THAT YOU ARE ON A TRAIN.',
      'ALL LIVING BEINGS DESIRE TO BE A CHILD OF GOD.',
      'THIS PERMITS US TO FEEL ANXIOUS.',
      'EVERYTHING YOU NEED IS INSIDE OF YOU, SHE TOLD ME',
  ];
  let concat = "";
  for(let i=0; i<count; i++) {
    let rand = sentences[Math.floor(Math.random() * sentences.length)];
    if(rand === prev) {
      rand = sentences[Math.floor(Math.random() * sentences.length)];
    }
    prev = rand;
    concat += prev + " ";
  }
  return concat;
}

const randomInt = (min, max) => {
  return Math.floor( Math.random() * (max-min+1) + min );
}

let _fetched = [];

export default function GorestPostsModal(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [keywordFilter, setKeywordFilter] = useState('');

  // Component onmounted
  const onPageUnmounted = () => {
  }

  // Component mounted
  const onPageMounted = () => {
    return () => { onPageUnmounted() };
  };
  useEffect(onPageMounted, []);

  useEffect(() => {
    if( rest.modal.modalUser ) {
      // reset keyword
      setKeywordFilter('');

      rest.fetched.fetchPosts('', function(data) {
        _fetched = data;
      });
    }
  }, [rest.modal.modalUser]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={rest.modal.modalOpen}
      onClose={() => {
        rest.modal.setModalOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={rest.modal.modalOpen}>
        <div className={`${classes.card} ${classes.boxShadow} flex flex-col items-center p-5`}>
          <h1 className="flex mb-5">Posts by {rest.modal.modalUserName}</h1>
          <Button className={`mb-5`} variant="contained" color="primary"
            onClick={() => {
              rest.fetched.addPosts({
                title: randomSentence(1),
                body: randomSentence(randomInt(3, 10)),
              }, function() {
                // reset keyword
                setKeywordFilter('');
                
                rest.fetched.fetchPosts('', function(data) {
                  _fetched = data;
                });
              });
            }}>
            Add Randomized Posts
          </Button>
          <TextField
              className={`${classes.w300} mt-3`}
              required
              name="filter-posts"
              id="filter-posts-input"
              label="Filter keyword"
              value={keywordFilter}
              onChange={(ev) => {
                // update keyword text
                const _keywordFilter = ev.target.value;
                setKeywordFilter(_keywordFilter);

                // filter rows based on keyword
                const _filtered = _fetched.filter(row => {
                  return row.title.includes(_keywordFilter) || row.body.includes(_keywordFilter);
                });
                rest.fetched.setListPosts({
                  ...rest.fetched.listPosts,
                  data: _filtered,
                });
              }}
            />

            <div>
              <TableContainer component={Paper} className={`${classes.vw70} mt-5`}>
                <Table aria-label="fetched list posts">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">User ID</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Body</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Updated At</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rest.fetched.listPosts.data.map((row) => {
                      return  (
                        <TableRow key={row.id}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.user_id}</TableCell>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">{row.body}</TableCell>
                          <TableCell align="center">{row.created_at}</TableCell>
                          <TableCell align="center">{row.updated_at}</TableCell>
                          <TableCell align="center">
                            <IconButton aria-label="edit" className="m-3" onClick={() => {
                              alert('TODO EDIT');
                            }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" className="m-3" onClick={() => {
                              rest.fetched.deletePosts(row.id, function() {
                                // reset keyword
                                setKeywordFilter('');
                                
                                rest.fetched.fetchPosts('', function(data) {
                                  _fetched = data;
                                });
                              });
                            }}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                  })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="flex justify-end m-3">
              <Pagination color="secondary"
                count={rest.fetched.listPosts.total_page}
                page={rest.fetched.listPosts.current_page}
                onChange={(ev, newPage) => {
                  // reset keyword
                  setKeywordFilter('');
                  
                  rest.fetched.fetchPosts(`page=${newPage}`, function(data) {
                    _fetched = data;
                  });
                }} />
            </div>
        </div>
      </Fade>
    </Modal>
  );
}
