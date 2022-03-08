import { v4 as uuidv4 } from "uuid";
import mock_data from './MOCK_DATA.json';

const idOne = uuidv4();
const idTwo = uuidv4();

// pseudo database
let entries = {
  [idOne]: {
    id: idOne,
    firstName: "Robin",
    lastName: "Wieruch",
    isDeveloper: true,
  },
  [idTwo]: {
    id: idTwo,
    firstName: "Dave",
    lastName: "Davddis",
    isDeveloper: false,
  },
};

// pseudo API
export const getEntries = () =>
  new Promise((resolve, reject) => {
    if (!mock_data) {
      return setTimeout(() => reject(new Error("Entries not found")), 250);
    }

    setTimeout(() => resolve(Object.values(mock_data)), 250);
  });

// getEntries()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const loadEntries = async () => {
  try {
    const result = await getEntries();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
loadEntries();

export const getEntry = (id) =>
  new Promise((resolve, reject) => {
    console.log("mock_dataaaa", mock_data);
    console.log("idididid", id);

    const entry = mock_data.find(e=> e.id == id);
    console.log("eeenetryyyy", entry);

    if (!entry) {
      return setTimeout(() => reject(new Error("Entry not found")), 250);
    }

    setTimeout(() => resolve(entry), 250);
  });

export const createEntry = (data) =>
  new Promise((resolve, reject) => {
    if (!data.firstName || !data.lastName) {
      reject(new Error("Not all information provided"));
    }

    const id = uuidv4();
    const newEntry = { id, ...data };

    entries = { ...entries, [id]: newEntry };

    setTimeout(() => resolve(true), 250);
  });

export const updateEntry = (id, data) =>
  new Promise((resolve, reject) => {
    if (!mock_data[id]) {
      return setTimeout(() => reject(new Error("Entry not found")), 250);
    }

    // Here server connection should be added
    // mock_data[id] = { ...mock_data[id], ...data };

    return setTimeout(() => resolve(true), 250);
  });

export const deleteEntry = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: entry, ...rest } = entries;

    if (!entry) {
      return setTimeout(() => reject(new Error("Entry not found")), 250);
    }

    entries = { ...rest };

    return setTimeout(() => resolve(true), 250);
  });
