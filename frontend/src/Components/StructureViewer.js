import React, { useState } from 'react';
import StructureFileInput from './StructureFileInput';

/**
 * 
 * @returns Component to upload a file a view the prediction results in a table
 */
function StructureViewer() {

    const [errorMessage, setErrorMessage] = useState("")
    const [energyPrediction, setEnergyPrediction] = useState("")
    const [forcesPrediction, setForcesPrediction] = useState([])
    const [receivedResponseData, setReceivedResponseData] = useState(false)
    const receivedResponse = (data) => {
      setReceivedResponseData(true)
      if (data.error){
        setEnergyPrediction("")
        setForcesPrediction([])
        setErrorMessage(data.error)
      } else {
        const prediction = data.prediction
        setEnergyPrediction(prediction.energy)
        setForcesPrediction(prediction.forces)
        setErrorMessage("")
      }
    }

    const errorDiv = (!errorMessage) ? (
      <div></div>
    ) : (<div class='alert alert-danger'><p class="alert-text">{errorMessage}</p></div>)

    /* Display the energy and forces in a table. In a production setting, would probably want an image or diagram */
    const resultsDiv = (!energyPrediction || ! forcesPrediction) ? (
      receivedResponseData ? (<div class='alert alert-warning'><p class="alert-text">Unable to display prediction. Something went wrong.</p></div>) : (<span></span>)
    ) : (
      <div>
        <p>Energy of Structure is {energyPrediction}.</p>
        <p>Forces below are in units eV/A</p>
        <table class="table table-sm table-bordered table-striped">
          <thead>
            <tr class="table-light bg-warning">
              <th scope="col">Specie</th>
              <th scope="col">X</th>
              <th scope="col">Y</th>
              <th scope="col">Z</th>
            </tr>
          </thead>
          <tbody>
            {forcesPrediction.map(forceData => 
              (
                <tr class="table-light bg-warning">
                  <th scope="row">{forceData.name}</th>
                  <td>{forceData.x}</td>
                  <td>{forceData.y}</td>
                  <td>{forceData.z}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )

  
    return (
        <div className="StructureViewer">
          <StructureFileInput receivedResponse={receivedResponse}></StructureFileInput>
          {errorDiv}
          {resultsDiv}
        </div>
    );
  }
  
  export default StructureViewer;
  