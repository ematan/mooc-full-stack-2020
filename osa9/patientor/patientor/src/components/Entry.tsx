import React from "react";
import { Entry, Diagnosis, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { Segment, Icon, Rating } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  const rating = entry.healthCheckRating;
  return(
    <Segment>
      <h2>{entry.date} <Icon name="doctor" /> </h2>
      <p>
        {entry.description}
      </p>
      <Rating icon="heart" disabled rating={4 - rating} maxRating={4} />
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return(
    <Segment>
      <h2>{entry.date} <Icon name="medkit" />{entry.employerName}</h2>
      <p>
        {entry.description}
      </p>
    </Segment>
  );
};

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return(
    <Segment>
      <h2>{entry.date} <Icon name="hospital" /></h2>
      <p>
        {entry.description}
      </p>
      <p>Discharge: {entry.discharge.date}</p>
    </Segment>
  );
};




type EntryProps = {
  entry: Entry;
  diagnoses: {[code: string]: Diagnosis };
};

const EntryDetails: React.FC<EntryProps> = ({entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;