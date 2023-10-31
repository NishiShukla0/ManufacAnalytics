import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WineStatistics from "./WineStatistics";
import Gamma from "./Gamma";

function App() {

  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    axios.get("../data.json").then((res) => {
      const data = res.data;
      setDataset(data);
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <WineStatistics dataset={dataset}/>
        <Gamma dataset={dataset}/>
      </header>
    </div>
  );
}

export default App;
