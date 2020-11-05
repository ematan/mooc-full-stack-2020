import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

import { apiBaseUrl } from '../constants';
import { Patient, Gender, Diagnosis } from '../types';
import { setFetchedPatient, setDiagnoses } from "../state";
import { useStateValue } from '../state';
import EntryDetails from '../components/Entry';

const GenderIcon: React.FC<{gender: Gender}> = ({gender}) => {
  switch (gender){
    case 'female': return <Icon name='venus' />;
    case 'male': return <Icon name='mars' />;
    case 'other': return <Icon name='genderless' />
    default: return null;
  }
}



const PatientPage: React.FC = () => {

  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{patientDetails, diagnoses}, dispatch] = useStateValue();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setFetchedPatient(result.data));
      } catch (e) {
        console.log(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnoses(result.data));
      } catch (e) {
        console.log(e);
      }
    }

    if (patientDetails[id]) {
      setPatient(patientDetails[id]);
    } else {
      getPatient();
    }
    if(Object.entries(diagnoses).length === 0){
      fetchDiagnoses();
    }

  }, [id, patientDetails, dispatch, diagnoses],)

  //console.log(patient);
  console.log(diagnoses);
  if(!patient || Object.entries(diagnoses).length === 0) return <div>Loading</div>;



  return(
    <div className="App">
      <span>
        <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>

      </span>
      <div>
        ssn: {patient.ssn}
      </div>
      <div>
        occupation: {patient.occupation}
      </div>
      <div>
        <h3>entries</h3>

        {patient.entries.map(e =>
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses}/>
        )}

      </div>
    </div>
  );
};

export default PatientPage;