import { useLayoutEffect, useState } from "react";
import { TableData } from "./types/types";
import Table from "./components/Table/Table";

function App() {
  const [data, setData] = useState<TableData[]>([]);
  const url = "http://localhost:3000/";

  useLayoutEffect(() => {
    fetch(url + "registers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
      });
  }, [url]);

  return <Table data={data}></Table>;
}

export default App;
