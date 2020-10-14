import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import useSWR from "swr";

function AddComment({ handleAdd }) {
  const { data } = useSWR("http://localhost:4001/comments");
  return (
    <div>
      <Typography>Total Comment: {data?.length}</Typography>
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={async (values, formikHelpers) => {
          const result = await handleAdd(values);
          if (result === 201) formikHelpers.resetForm();
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
