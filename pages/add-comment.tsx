import React from "react";
import Head from "next/head";

import AddComment from "@components/AddComment";
import NavBar from "@components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>SWR</title>
      </Head>
      <NavBar />
      <AddComment handleAdd={() => console.log("dummy add")} />
    </>
  );
}
