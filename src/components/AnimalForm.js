import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
// import { directive } from '@babel/types';
import * as yup from 'yup';
import axios from 'axios';

const AnimalForm = (props, { status }) => {
  console.log(status)
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    if(status){
      setAnimals([...animals, status])
    }
  }, [status])

  return (
    <Form>
      {props.touched.species && props.errors.species && <p className="error">{props.errors.species}</p>}
      <Field type="text" name="species" placeholder="Species" />

      {props.touched.age && props.errors.age && <p className="error">{props.errors.age}</p>}
      <Field type="number" name="age" placeholder="Age" />

      {props.touched.diet && props.errors.diet && <p className="error">{props.errors.diet}</p>}
      <Field component="select" name="diet" >
        <option value='' disabled>Select Diet:</option>
        <option value='Carnivore'>Carnivore</option>
        <option value='Herbivore'>Herbivore</option>
        <option value='Omnivore'>Omnivore</option>
      </Field>

      {props.touched.vaccinations && props.errors.vaccinations && <p className="error">{props.errors.vaccinations}</p>}
      <label>
        <Field type="checkbox" name='vaccinations' />
        <span>Vaccinations</span>
      </label>

      <Field component='textarea' name='notes' placeholder='Notes' />
      
      <button type="submit">Submit</button>

      {animals.map((animal) => (
        <div>Species: {animal.species}</div>
      ))}
      
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: (props) => {
    return {
      species: props.species || '',
      age: props.age || '',
      diet: props.diet || '',
      vaccinations: props.vaccinations || false,
      notes: props.notes || ''
    }
  },
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required!'),
    age: yup.number().positive().required('Age is required!'),
    diet: yup.string().required('Diet is required!'),
    vaccinations: yup.boolean().oneOf([true], 'Animal must be vaccinated!')
  }),
  handleSubmit: (values, { setStatus }) => {
    axios.post('https://reqres.in/api/animals', values)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('Error', err)
      })
    console.log(values)
  }
})(AnimalForm)