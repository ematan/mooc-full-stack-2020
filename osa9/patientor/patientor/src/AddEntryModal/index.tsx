import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm from "./EntryForm";
import { newEntry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: newEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntry] = React.useState<string>("HospitalEntry");
  console.log(entryType);
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <select onChange={(e) => setEntry(e.target.value)}>
          <option value="HealthCheckEntry">HealthCheck Entry</option>
          <option value="HospitalEntry">Hospital Entry</option>
          <option value="OccupationalHealthcareEntry">OccupationalHealthcare Entry</option>
        </select>
        {entryType ==="HospitalEntry"
        ? <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={"HospitalEntry"}/> : null }
        {entryType ==="HealthCheckEntry"
        ? <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={"HealthCheckEntry"}/> : null }
        {entryType ==="OccupationalHealthcareEntry"
        ? <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={"OccupationalHealthcareEntry"}/> : null}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;