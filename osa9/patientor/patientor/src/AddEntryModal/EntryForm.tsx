import React from 'react';
import { newEntry } from '../types';
import { Field, Formik, Form } from "formik";
import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";

interface Props {
  onSubmit: (values: newEntry) => void;
  onCancel: () => void;
}

const EntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{diagnoses}] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: 0,
        type: 'HealthCheck'
      }}
      onSubmit={onSubmit}
      validate={(values: newEntry) => {
        const requiredError = "Field is required";
        const dateError = "Date needs to be in valid format";
        const errors: { [field: string]: string } = {};
        console.log(Date.parse(values.date));
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
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='yyyy-mm-dd'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='HealthCheckRating'
              name='healthCheckRating'
              component={NumberField}
              max={3}
              min={0}
            />
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
