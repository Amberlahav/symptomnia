import React from 'react';
import { Entries } from './';

const Symptom = ({ symptom }) =>
    <div className="symptom-container">
        <div className="symptoms-list-container-element">
            <p>{symptom.name}</p>
          </div>
          <div className="symptoms-list-container-element">
            <p>{symptom.entries.length}</p>
          </div>
          <div className="symptoms-list-container-element">
            <p>Mild</p>
          </div>
        {/* {
            symptom.entries &&
            <Entries entries={symptom.entries} />
        } */}
    </div>;

export default Symptom;