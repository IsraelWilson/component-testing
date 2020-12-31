import logo from "./logo.svg";
import "./App.css";
import { Calendar } from "./Calendar";

function App() {
  const getDate = (dateStr) => {
    console.log(dateStr);
  };

  return <Calendar getDate={getDate} />;
}

export default App;
