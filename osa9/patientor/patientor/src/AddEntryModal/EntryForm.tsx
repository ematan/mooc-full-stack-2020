import React from "react";
import { newEntry, newOccupationalHealthcareEntry, newHospitalEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Grid, Button } from "semantic-ui-react";

import { initialValuesHealthCheck, HealthCheckFields } from "./HealthCheck";
import { initialValuesOccupational, OccupationalFields, validateOccupational } from "./Occupational";
import { initialValuesHospital, HospitalFields, validateHospital } from "./Hospital";

interface Props {
  onSubmit: (values: newEntry) => void;
  onCancel: () => void;
  type: string;
}

const EntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
  const [{diagnoses}] = useStateValue();

  const validateBase = (values: newEntry) => {
    const requiredError = "Field is required";
    const dateError = "Date needs to be in valid format";
    const errors: { [field: string]: string } = {};
    if (!values.date) {
      errors.date = requiredError;
    }
    if (!(Date.parse(values.date))) {
      errors.date = dateError;
    }
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    return errors;
  };

  const initialValuesBase = {
    date: "",
    description: "",
    specialist: "",
  };

  const initialValues = (type: string) => {

    if (type === "HealthCheckEntry") {
      return {...initialValuesHealthCheck, ...initialValuesBase
      } as newEntry;
    }
    if (type === "HospitalEntry"){
      return { ...initialValuesHospital, ...initialValuesBase
      } as newHospitalEntry;
    }
    if (type === "OccupationalHealthcareEntry"){
      return { ...initialValuesOccupational, ...initialValuesBase
      } as newOccupationalHealthcareEntry;
    }
    throw new Error("oops");
  };

  console.log(initialValues(type));

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues(type)}
      onSubmit={onSubmit}
      validate={(values: newEntry) => {

        if (type === "OccupationalHealthcareEntry"){
          return {
            ...validateOccupational(values as newOccupationalHealthcareEntry),
            ...validateBase(values)};
        }
        if (type === "HospitalEntry"){
          return {
            ...validateHospital(values as newHospitalEntry),
            ...validateBase(values)};
        }
        return validateBase(values);
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="yyyy-mm-dd"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {type === "HealthCheckEntry"
              ? HealthCheckFields
              : null }
            {type === "OccupationalHealthcareEntry"
              ? OccupationalFields
              : null }
            {type === "HospitalEntry"
              ? HospitalFields
              : null }

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}

    </Formik>
  );
};

export default EntryForm;
