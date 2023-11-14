import About from "./components/About";
import ImgUpload from "./components/ImgUpload";
import Navbar from "./components/Navbar";
import Result from "./components/Result";

function App() {
  return (
    <div>
      <Navbar/>
      <ImgUpload/>
      <Result/>
      <About/>
    </div>
  );
}

export default App;
