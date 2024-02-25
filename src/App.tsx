import * as React from "react";
import "./App.css";
import { AutoComplete } from "./components/AutoComplete";
import { ASYNC_STATUS, useAsync } from "./hooks/useAsync";
import { OPTION } from "./components/AutoComplete/types";

import { Spinner } from "./components/Spinner";

function App() {
  const { run, status, data } = useAsync({});

  React.useEffect(() => {
    const PAGE_LOAD_TIME = 500;
    run(
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((data) => data.json())
        .then((items) =>
          items.map(
            (item: any): OPTION => ({
              id: item.id,
              value: item.name,
            })
          )
        ),
      PAGE_LOAD_TIME
    );
  }, [run]);

  return (
    <div className="App">
      {status === ASYNC_STATUS.PENDING ? <Spinner /> : null}
      {status === ASYNC_STATUS.RESOLVED ? (
        <AutoComplete options={data} />
      ) : null}
    </div>
  );
}

export default App;
