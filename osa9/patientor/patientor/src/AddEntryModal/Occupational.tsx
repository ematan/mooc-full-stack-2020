import React from 'react';
import { TextField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { newOccupationalHealthcareEntry } from '../types';
import { Header } from 'semantic-ui-react';

export const initialValuesOccupational = {
  employerName: '',
  type: 'OccupationalHealthcare',
  sickLeave: {
    startDate: '',
    endDate: '',
  }
};

export const OccupationalFields = (
  <>
    <Field
      label='Employer Name'
      name='employerName'
      placeholder='Employer Name'
      component={TextField}
    />
    <Header>SickLeave</Header>
    <Field
      label='Start Date'
      name='sickLeave.startDate'
      placeholder='YYYY-MM-DD'
      component={TextField}
    />
    <Field
      label='End Date'
      name='sickLeave.endDate'
      placeholder='YYYY-MM-DD'
      component={TextField}
    />
  </>
);

export const validateOccupational = (values: newOccupationalHealthcareEntry) => {
    const requiredError = "Field is required";
    const bothError = "Both start and end dates required or neither";
    const dateError = "Date needs to be in valid format";
    const errors: { [field: string]: string } = {};
    const sickLeave: { [field: string]: string } = {};

    if (!values.employerName) {
      errors.employerName = requiredError;
    }
    if(values.sickLeave) {
      if (values.sickLeave.startDate || values.sickLeave.endDate) {
        if (!(Date.parse(values.sickLeave.startDate))) {
          sickLeave.startDate = dateError;
        }
        if (!(Date.parse(values.sickLeave.endDate))) {
          sickLeave.endDate = dateError;
        }
        if (!values.sickLeave.startDate) {
          sickLeave.startDate = bothError;
        }
        if (!values.sickLeave.endDate) {
          sickLeave.endDate = bothError;
        }
      }
    }
    if (Object.keys(sickLeave).length!==0) {
      return {...errors, sickLeave }
    }

    return errors;
  };