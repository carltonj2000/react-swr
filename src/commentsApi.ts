export const loadComments = async () => {
  const res = await fetch("http://localhost:4001/comments");
  const json = await res.json();
  return json;
};

export const deleteComment = async (id) => {
  const result = await fetch(`http://localhost:4001/comments/${id}`, {
    method: "Delete",
  });
  return result;
};

export const addComment = async (values) => {
  const result = await fetch("http://localhost:4001/comments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const json = await result.json();
  return { status: result.status, comment: { ...values, ...json } };
};
