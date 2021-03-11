import React, { useState, useEffect } from 'react';

// @material-ui/core components
import {
  Grid,
  Link, Button,
  TextField, Paper,
  Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';

import { containerHeight, m15, w150, w300, vw70, } from '../View-Styles/base';
const styles = { containerHeight, m15, w150, w300, vw70, };

const useStyles = makeStyles(styles);

let _fetched = [];

export default function GorestList(props) {
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

  return (
    <Grid container direction="column" justify="center" alignItems="center" classes={{
      root: classes.containerHeight,
    }} {...rest}>

      <div>
        <Button className={classes.m15} variant="contained" color="secondary"
          onClick={() => {
            // reset keyword
            setKeywordFilter('');

            rest.fetched.fetchUsers('', function(data) {
              _fetched = data;
            });
          }}>
          Fetch
        </Button>
      </div>

      {_fetched.length ? (
        <Card>
          <CardContent className={`flex flex-col justify-center items-center`}>
            <TextField
              className={`${classes.w300}`}
              required
              name="filter"
              id="filter-input"
              label="Filter keyword"
              value={keywordFilter}
              onChange={(ev) => {
                // update keyword text
                const _keywordFilter = ev.target.value;
                setKeywordFilter(_keywordFilter);

                // filter rows based on keyword
                const _filtered = _fetched.filter(row => {
                  return row.name.includes(_keywordFilter) || row.email.includes(_keywordFilter);
                });
                rest.fetched.setList({
                  ...rest.fetched.list,
                  data: _filtered,
                });
              }}
            />

            <div>
              <TableContainer component={Paper} className={`${classes.vw70} m-5`}>
                <Table aria-label="fetched list">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rest.fetched.list.data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">
                          <Link className="text-blue-600 cursor-pointer" onClick={() => {
                            rest.modal.setModalUser(row.id);
                            rest.modal.setModalUserName(row.name);
                            rest.modal.setModalUserActive(row.status.toLowerCase()==='active');
                            rest.modal.setModalOpen(true);
                          }}>
                            <span className="mr-2">View Posts</span>
                            <VisibilityIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="flex justify-end m-3">
              <Pagination color="secondary"
                count={rest.fetched.list.total_page}
                page={rest.fetched.list.current_page}
                onChange={(ev, newPage) => {
                  // reset keyword
                  setKeywordFilter('');

                  rest.fetched.fetchUsers(`page=${newPage}`, function(data) {
                    _fetched = data;
                  });
                }} />
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Grid>
  );
}
