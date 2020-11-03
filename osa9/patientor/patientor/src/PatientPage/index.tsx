import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';

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

  useEffect(() => {
    const getPatient = async () => {
      try {
        const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log(result.data);
        //dispatch(result.data);
        setPatient(result.data);
      }catch (e){
        console.log(e);
      }
    };
    getPatient();
  }, [id])

  console.log(patient);
  if(!patient) return <div>Loading</div>;

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
    </div>
  );
};

export default PatientPage;