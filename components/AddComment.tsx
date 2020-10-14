import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import useSWR, { mutate, trigger } from "swr";
import { addComment } from "@src/commentsApi";

function AddComment() {
  const { data } = useSWR("http://localhost:4001/comments");
  return (
    <div>
      <Typography>Total Comment: {data?.length}</Typography>
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={async (values, formikHelpers) => {
          mutate("http://localhost:4001/comments", [...data, values], false);
          const result = await addComment(values);
          trigger("http://localhost:4001/comments");
          if (result.status === 201) formikHelpers.resetForm();
        }}
      >
        <Form>
          <FormGroup>
            <Field as={TextField} name="comment" label="Comment" />
          </FormGroup>
          <Box marginTop={1}>
            <Button type="submit" variant="contained" color="primary">
              Add Comment
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
  );
}

export default AddComment;
