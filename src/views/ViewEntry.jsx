
import React from 'react'

import {
  useParams,
} from 'react-router-dom';

import { getEntry } from "../api";

const Entry = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const doGetEntry = React.useCallback(async () => {
    try {
      const result = await getEntry(entryId);
      setEntry(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }, [entryId]);

  React.useEffect(() => {
    doGetEntry();
  }, [doGetEntry]);

  if(loading) {
    return null
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default Entry
