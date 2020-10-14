import React from "react";
import Head from "next/head";
import useSWR from "swr";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import AddComment from "@components/AddComment";
import NavBar from "@components/NavBar";
import { loadComments, deleteComment, addComment } from "@src/commentsApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function Home() {
  // const [jiras, jirasSet] = React.useState([]);

  const { data: jiras } = useSWR("http://localhost:4001/comments");
  const handleDelete = async (id) => {
    const result = await deleteComment(id);
    // if (result.status === 200) jirasSet(jiras.filter((jira) => jira.id !== id));
  };

  const handleAdd = async (values) => {
    const result = await addComment(values);
    //if (result.status === 201) jirasSet([...jiras, result.comment]);
    return result.status;
  };

  return (
    <>
      <Head>
        <title>SWR</title>
      </Head>
      <NavBar />
      <AddComment {...{ handleAdd }} />
      <JiraList {...{ jiras }} {...{ handleDelete }} />
    </>
  );
}

function JiraList({ jiras, handleDelete }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jiras?.map((jira) => (
            <TableRow key={jira.id}>
              <TableCell>{jira.id}</TableCell>
              <TableCell>{jira.comment || "No comment"}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(jira.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
