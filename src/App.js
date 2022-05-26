import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUploadComponent from './components/file_upload.component';

function App() {
  return (
    <div className="App container mt-5">
      <div class="px-4 py-3 my-3 text-center">
        <h1 class="display-5 fw-bold">Passport Photo Generator</h1>
      </div>
      <div class="col-lg-6 mx-auto">
        <p class="lead">
          Please select a photo to start...
        </p>
      </div>
      <FileUploadComponent />
    </div>
  );
}
export default App;