import React from "react";
import { useState } from "react";
import { Input, Table, Grid, Button, Text } from "@geist-ui/core";
import { Search } from "@geist-ui/icons";


export default function Home() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [putData, setPutData] = useState("");
  const [count, setCount] = useState(0);

  const handleEnter = async (value) => {

    const response = await fetch(
      process.env.REACT_APP_TURENG_API_URL +`${value}`
    );
    const json = await response.json();

    setData(json["phrases"]);
    setPutData(json);
    setCount(json["count"]);
    console.log(json["phrases"]);
    console.log(json["word"] + "burası ayrı");
  };

  const handlePost = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/put/`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    }).then((e) => {
      return e;
    });
    
  };

  function handlePostData() {
    handleGet(value).then((e) => {
      if (e === 0) {
        console.log(putData);
        handlePost(putData);
      }
    });
  }

  const handleGet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get/${id}`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    });
    const word = await response.json();
    const jsonlength = Object.keys(word).length;
    console.log(jsonlength);
    return jsonlength;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginRight: "20px",
        marginBottom: "20px",
        marginLeft: "20px",
      }}
    >
      <Grid.Container gap={2} justify="center">
        <Grid xs={24} justify="center">
          <Input
            iconRight={<Search />}
            placeholder="Search..."
            onChange={(event) => setValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleEnter(value);
              }
            }}
          />
        </Grid>
        {count !== 0 ? (
          <Grid xs={24} justify="center">
            <Button
              auto
              scale={0.5}
              width="30%"
              type="secondary"
              mx="5px"
              my="5px"
              onClick={function () {
                handlePostData();
              }}
            >
              {" "}
              Add to Wordlist{" "}
            </Button>
          </Grid>
        ) : (
          <br></br>
        )}
        {data !== "" ? (
          <Grid xs={6} justify="center">
            <Table data={data} id="table1">
              <Table.Column prop="source" label="source" />
              <Table.Column prop="target" label="target" />
              <Table.Column prop="category" label="category" />
              <Table.Column prop="type" label="type" />
            </Table>
          </Grid>
        ) : (
          <p></p>
        )}
      </Grid.Container>
    </div>
  );
}
