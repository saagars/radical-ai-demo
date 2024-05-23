import React, { useState } from 'react';
import StructureFileInput from './StructureFileInput';

function StructureViewer() {

    const [errorMessage, setErrorMessage] = useState("")
    const [energyPrediction, setEnergyPrediction] = useState("")
    const [forcesPrediction, setForcesPrediction] = useState([])

    const receivedResponse = (data) => {
      if (data.error){
        setEnergyPrediction("")
        setForcesPrediction([])
        setErrorMessage(data.error)
      } else {
        const prediction = data.prediction
        setEnergyPrediction(prediction.energy)
        setForcesPrediction(prediction.forces)
      }
    }

    const errorDiv = (!errorMessage) ? (
      <div></div>
    ) : (<div class='alert alert-danger'><p class="alert-text">{errorMessage}</p></div>)

    const resultsDiv = (!energyPrediction || ! forcesPrediction) ? (
      <div class='alert alert-warning'><p class="alert-text">Unable to display prediction. Something went wrong.</p></div>
    ) : (
      <div>
        <p>Energy of Structure is {energyPrediction}</p>
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
  