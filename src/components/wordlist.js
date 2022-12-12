import React from "react";
import { Grid, Card, Text, Divider, Modal, Button,Table } from "@geist-ui/core";
import { useState, useEffect } from "react";

export default function Wordlist() {
  const modalData = { visible: false, key: "" };
  const [data, setData] = useState(null);
  const [state, setState] = useState(modalData);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/get`,
        {
          method: "GET",
          headers: {
            "access-control-allow-origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const words = await response.json();
      console.log(words);
      setData(words);
      return words;
    };
    fetchData();
  }, []);

  const handler = (key) => {
    console.log(key);
    const e = {
      visible: true,
      key: key,
    };

    setState(e);
    console.log("handler");
  };

  const closeHandler = () => {
    const ef = {
      visible: false,
      key: "",
    };
    setState(ef);
    console.log("closed");
  };

  return (
    <Grid.Container
      className="container-sm"
      alignContent="center"
      gap={2}
      mt={5}
    >
      {data !== null ? (
        data.map((e) => (
          <Grid xs={12} md={8} xl={6} key={e.word[0]}>
            <Button
              style={{ backgroundColor: "cyan" }}
              width="100%"
              height="%100"
              padding={0}
              onClick={function () {
                console.log("sa");
                handler(e.word[0]);
              }}
            >
              <Card type="cyan">
                <Text h5 my={0} mt={1} mb={1} style={{ textAlign: "center" }}>
                  {e.word[0]}
                </Text>
                <Divider h="1px" my={0} />
                <Text
                  h5
                  mt={1}
                  mb={1}
                  style={{ textAlign: "center", color: "white" }}
                >
                  {e.phrases[0].target}
                </Text>
              </Card>
            </Button>
            {state.key === e.word[0] ? (
              <Modal
              style={{ width: "min-content" }}
                visible={state.visible}
                onClose={function () {
                  closeHandler();
                }}
              >
                {data
                  .filter((obje) => obje.word.includes(e.word[0]))
                  .map((filteredObject) => (
                    <div style={{ display: "contents" }}>
                      <Modal.Title>{filteredObject.word[0]}</Modal.Title>
                      <Modal.Subtitle>
                        {filteredObject.phrases[0].target}
                      </Modal.Subtitle>
                      <Modal.Content>
                        <Grid xs={6} justify="center">
                          <Table data={filteredObject.phrases} id="table1">
                            <Table.Column prop="source" label="source" />
                            <Table.Column prop="target" label="target" />
                            <Table.Column prop="category" label="category" />
                            <Table.Column prop="type" label="type" />
                          </Table>
                        </Grid>
                      </Modal.Content>
                    </div>
                  ))}
              </Modal>
            ) : (
              <div></div>
            )}
          </Grid>
        ))
      ) : (
        <div></div>
      )}
    </Grid.Container>
  );
}
