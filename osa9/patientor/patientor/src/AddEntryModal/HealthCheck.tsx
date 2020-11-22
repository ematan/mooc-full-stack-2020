import React from "react";
import { NumberField } from "../AddPatientModal/FormField";
import { Field } from "formik";


export const initialValuesHealthCheck = {
  healthCheckRating: 0,
  type: "HealthCheck"
};

export const HealthCheckFields = (
  <Field
    label="HealthCheckRating"
    name="healthCheckRating"
    component={NumberField}
    max={3}
    min={0}
  />
);