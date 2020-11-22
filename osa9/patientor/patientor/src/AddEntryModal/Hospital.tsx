import React from 'react';
import { TextField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { newHospitalEntry } from '../types';
import { Header } from 'semantic-ui-react';

export const initialValuesHospital = {
  type: 'Hospital',
  discharge: {
    date: '',
    criteria: '',
  }
};

export const HospitalFields = (
  <>
    <Header>Discharge</Header>
    <Field
      label='Date'
      name='discharge.date'
      placeholder='YYYY-MM-DD'
      component={TextField}
    />
    <Field
      label='Criteria'
      name='discharge.criteria'
      placeholder='Criteria'
      component={TextField}
    />
  </>
);

export const validateHospital = (values: newHospitalEntry) => {
  const requiredError = "Field is required";
  const dateError = "Date needs to be in valid format";
  const errors: { [field: string]: string } = {};

  if (!values.discharge.criteria) {
    errors.criteria = requiredError;
  }
  if (!(Date.parse(values.discharge.date))) {
    errors.date = dateError;
  }
  if (!values.discharge.date) {
    errors.date = requiredError;
  }

  if (Object.keys(errors).length===0) return errors;

  const dischargeErr = {discharge: {...errors}};
  return dischargeErr;
};