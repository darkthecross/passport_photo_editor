import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUploadComponent from './components/file_upload.component';

function App() {
  return (
    <div className="App container mt-5">
      <FileUploadComponent />
    </div>
  );
}
export default App;