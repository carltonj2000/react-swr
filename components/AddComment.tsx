import React from "react";
import { Field, Form, Formik } from "formik";
import { Box, Button, FormGroup, TextField } from "@material-ui/core";

function AddComment({ handleAdd }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, formikHelpers) => {
        const result = await handleAdd(values);
        console.log("add", result);
        formikHelpers.resetForm();
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
  );
}

export default AddComment;
