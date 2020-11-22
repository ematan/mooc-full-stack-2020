import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient, Gender, Diagnosis, Entry, newEntry } from '../types';
import { setFetchedPatient, setDiagnoses } from "../state";
import { useStateValue, addEntry } from '../state';
import EntryDetails from '../components/Entry';

import AddEntryModal from '../AddEntryModal';

const GenderIcon: React.FC<{gender: Gender}> = ({gender}) => {
  switch (gender){
    case 'female': return <Icon name='venus' />;
    case 'male': return <Icon name='mars' />;
    case 'other': return <Icon name='genderless' />;
    default: return null;
  }
};



const PatientPage: React.FC = () => {

  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{patientDetails, diagnoses}, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const onSubmit = async (values: newEntry) => {
    console.log(values);
    try {
      const { data: newEntryData } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntryData, id));
      closeModal();
    } catch (e) {
      console.log(e.response.data );
      setError(e.response.data.error);
    }
  };


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
    };

    if (patientDetails[id]) {
      setPatient(patientDetails[id]);
    } else {
      getPatient();
    }
    if(Object.entries(diagnoses).length === 0){
      fetchDiagnoses();
    }

  }, [id, patientDetails, dispatch, diagnoses],);

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={onSubmit}
          error={error}
          onClose={closeModal} />
        <Button onClick={() => openModal()}>Add New Entry</Button>

        <h3>entries</h3>

        {patient.entries.map(e =>
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses}/>
        )}

      </div>
    </div>
  );
};

export default PatientPage;