import React from "react";
import Head from "next/head";
import useSWR, { mutate, trigger } from "swr";

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
import { deleteComment } from "@src/commentsApi";

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

export default function Home({ commentsFromServer }: any) {
  const { data: jiras } = useSWR("http://localhost:4001/comments", {
    initialData: commentsFromServer,
  });
  const handleDelete = async (id) => {
    mutate(
      "http://localhost:4001/comments",
      jiras.filter((jira) => jira.id !== id),
      false
    );
    await deleteComment(id);
    trigger("http://localhost:4001/comments");
  };

  return (
    <>
      <Head>
        <title>SWR</title>
      </Head>
      <NavBar />
      <AddComment />
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
            <TableRow key={jira.id || Math.random()}>
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

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:4001/comments");
  const json = await res.json();
  return { commentsFromServer: json };
};
