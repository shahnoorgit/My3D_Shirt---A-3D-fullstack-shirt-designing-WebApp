import Canvas from "./Canvas/Index";
import Costumizer from "./Pages/Costumizer";
import Home from "./Pages/Home";

function App() {
  return (
    <main className=" app transition-all ease-in">
      {" "}
      <Home /> <Canvas /> <Costumizer />
    </main>
  );
}

export default App;
