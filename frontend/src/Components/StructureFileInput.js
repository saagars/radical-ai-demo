import React, { useState } from 'react';
import axios from 'axios';

/**
 * 
 * @param {*} recivedResponse - Functional callback when we get a server response for the file upload 
 * @returns Component to upload json/cif file to the server - does simple frontend-verification, handles 
 * loading spinny and response
 */
function StructureFileInput({receivedResponse}) {

    const [file, setFile] = useState()
    const [isFileValid, setIsFileValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(event) {
      const f = event.target.files[0]
      if (!f){
        return
      }
      const parts = f.name.split('.')
      if (f.type === 'application/json' || (parts.length > 0 && (parts.slice(-1)[0] === 'json' || parts.slice(-1)[0] === 'cif'))) {
        setIsFileValid(true)
      } else {
        setIsFileValid(false)
      }
      setFile(f)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (file && isFileValid) {
            const url = '/api/submitFile';
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
            setIsLoading(true)
            axios.post(url, formData, config).then((response) => {
              setIsLoading(false) 
              receivedResponse(response.data);
           });
          }
      }

    const errorMessage = (!file || (file && isFileValid)) ? (
      <div></div>
    ) : (<div class='alert alert-danger'><p class="alert-text">Please make sure you select a valid file type.</p></div>)

    const spinner = isLoading ? (<div class="spinner-border text-light rounded-circle ml-3" style={{marginLeft: 5 +"px"}} role="status">
    </div>) : (<span></span>)
   
    return (
        <div className="FileUpload">
          <div class="input-group mb-3 custom-file-button disabled" onSubmit={handleSubmit}>
              <label for="formFile" class="input-group-text disabled">Select a Structure file</label>
              <input class="form-control" type="file" id="formFile" onChange={handleChange} />
              <button class="btn btn-light" type="button" id="inputGroupFileAddon04" onClick={handleSubmit}>Submit</button>
              {spinner} 
          </div>
          {errorMessage}
        </div>
    );
  }
  
  export default StructureFileInput;
  