import FileUploadForm from "./Components/FileUploadForm";
import FileList from "./Components/FileList";
function App() {
  return <div className="container"> 
  <div className="wrapper">
    <h1>File Sharing Application</h1>
  
  <FileUploadForm/>
  <FileList/>
  </div>
    </div>;
}

export default App;
