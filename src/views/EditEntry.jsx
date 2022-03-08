
import React, { useCallback, useState, useEffect } from 'react'
import {
  useParams,
} from 'react-router-dom';
import { useForm } from "react-hook-form";

import { getEntry, updateEntry } from "../api";

const Entry = ({entries, doGetEntries}) => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur"
  })
  // const [queryTemplate, setQueryTemplate] = useState({
  //   id: "0",
  //   first_name: "",
  //   last_name: "",
  //   date_of_birth: "",
  //   email: "",
  //   industry: "",
  //   years_of_experience: "",
  //   salary: "",
  // });
  const handleRegistration = (data) => {
    setEntry({
      id: entry.id,
      first_name: data.first_name? data.first_name : entry.first_name,
      last_name: data.first_name? data.last_name : entry.last_name,
      email: data.email? data.email : entry.email,
      date_of_birth: data.date_of_birth? data.date_of_birth : entry.date_of_birth,
      industry: data.industry? data.industry : entry.industry,
      years_of_experience: data.years_of_experience? data.years_of_experience : entry.years_of_experience,
      salary: data.salary? data.salary : entry.salary,
    })
    handleEdit(entry.id, data)
  };

  const handleError = (errors) => {};
  // Simple validation
  const registerOptions = {
    first_name: { required: "First Name is required" },
    last_name: { required: "Last Name is required" },
    email: { required: "Email is required" },
  };

  const doGetEntry = useCallback(async () => {
    try {
      const result = await getEntry(entryId);
      setEntry(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }, [entryId]);

  useEffect(() => {
    doGetEntry();
  }, [doGetEntry]);

  const handleEdit = async (id, data) => {
    console.log('id in handleedit', id)
    console.log('entries in handleedit', entries)
    try {
      await updateEntry(id, data );
      await refetchEntries();
    } catch (error) {
      console.log(error);
    }
  };

  const refetchEntries = async () => {
    await doGetEntries();
  };



  if(loading) {
    return null
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <label>First Name</label>
        <input name="first_name" type="text" {...register('first_name', registerOptions.first_name ) }/>
        <small className="text-danger">
          {errors?.first_name && errors.first_name.message}
        </small>
      </div>
      <div>
        <label>Last Name</label>
        <input name="last_name" type="text" {...register('last_name', registerOptions.last_name ) }/>
        <small className="text-danger">
          {errors?.last_name && errors.last_name.message}
        </small>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register('email', registerOptions.email)}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div>
        <label>Date of Birth</label>
        <input name="date_of_birth" type="date" {...register('date_of_birth', registerOptions.date_of_birth ) }/>
      </div>
      <div>
        <label>Industry</label>
        <input name="industry" type="text" {...register('industry', registerOptions.industry ) }/>
      </div>
      <div>
        <label>Years of experience</label>
        <input name="years_of_experience" type="number" {...register('years_of_experience', registerOptions.years_of_experience ) }/>
      </div>
      <div>
        <label>Salary</label>
        <input name="salary" type="text" {...register('salary', registerOptions.salary ) }/>
      </div>
      <button>Submit</button>
    </form>
    
      <ul>
        <li>Id: {entry.id}</li>
        <li>First name: {entry.first_name}</li>
        <li>Last name: {entry.last_name}</li>
        <li>Date of birth: {entry.date_of_birth}</li>
        <li>Email: {entry.email}</li>
        <li>Industry: {entry.industry}</li>
        <li>Years of experience: {entry.years_of_experience}</li>
        <li>Salary: {entry.salary}</li>
      </ul>
    </>
  )
}

export default Entry
