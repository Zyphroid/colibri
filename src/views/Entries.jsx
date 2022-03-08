import React from "react";

import { getEntries, createEntry, updateEntry, deleteEntry } from "../api";

import "./Entries.css";

import { useNavigate, Link } from "react-router-dom";


const Entries = ({entries, setEntries}) => {

// const [entries, setEntries] = React.useState(null);
console.log('entrieeees', entries )
const doGetEntries = React.useCallback(async () => {
  try {
    const result = await getEntries();
    setEntries(result);
  } catch (error) {
    console.log(error);
  }
}, []);

React.useEffect(() => {
  doGetEntries();
}, [doGetEntries]);

  const refetchEntries = async () => {
    await doGetEntries();
  };

  const handleEdit = async (id) => {
    const entry = entries.find((entry) => entry.id === id);
    const isDeveloper = !entry.isDeveloper;

    try {
      await updateEntry(id, { isDeveloper });
      await refetchEntries();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteEntry(id);
      await refetchEntries();
    } catch (error) {
      console.log(error);
    }
  };

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await createEntry({ firstName, lastName, isDeveloper: false });
      await refetchEntries();
    } catch (error) {
      console.log(error);
    }
  };

  if (!entries) {
    return null;
  }



  

  return (
    <React.Fragment>
      <table>
        <tbody>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Industry</th>
          <th>Salary</th>
          <th>Years of Exp.</th>
        </tr>
        {entries.map((entry) => {
          return (
            <tr key={entry.id}>
              <td> {entry.id} </td>
              <td> {entry.first_name} </td>
              <td> {entry.last_name} </td>
              <td> {entry.email} </td>
              <td> {entry.date_of_birth} </td>
              <td> {entry.industry} </td>
              <td> {entry.salary} </td>
              <td> {entry.years_of_experience} </td>
              <td>
                <Link to={`/entry/edit/${entry.id}`}>Edit</Link>
              </td>
              <td >
                <Link to={`/entry/view/${entry.id}`}>View</Link>
              </td>

              {/* <button type="button" onClick={() => handleEdit(entry.id)}>
              Toggle Developer (Update)
            </button>
            <button type="button" onClick={() => handleRemove(entry.id)}>
              Remove Entry (Delete)
            </button> */}
              {/* <button type="button" onClick={() => handleRemove(entry.id)}>
                  Go to
                </button> */}
            </tr>
          );
        })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Entries;



  
  // <div>
    // <ul>
    //   {entries.map((entry) => {
    //     const developerText = getDeveloperText(entry.isDeveloper);

    //     return (
    //       <li key={entry.id}>
    //         {entry.firstName} {entry.lastName} {developerText}
    //         {/* <button type="button" onClick={() => handleEdit(entry.id)}>
    //           Toggle Developer (Update)
    //         </button>
    //         <button type="button" onClick={() => handleRemove(entry.id)}>
    //           Remove Entry (Delete)
    //         </button> */}
    //         <button type="button" onClick={() => handleRemove(entry.id)}>
    //           Go to
    //         </button>
    //       </li>
    //     );
    //   })}
    // </ul>

  //   <hr />

  //   <span>Create Entry:</span>

  //   <form onSubmit={handleCreate}>
  //     <label>
  //       First Name:
  //       <input type="input" onChange={handleChangeFirstName} />
  //     </label>

  //     <label>
  //       Last Name:
  //       <input type="input" onChange={handleChangeLastName} />
  //     </label>

  //     <button type="submit">Create</button>
  //   </form>
  // </div>
