import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from "react-router-dom";

import { 
  ENTRIES_ROUTE,
  CHARTS_ROUTE
} from "./config";

import Entries from "./views/Entries";
import ViewEntry from "./views/ViewEntry";
import EditEntry from "./views/EditEntry";

import Charts from "./views/Charts";
import LoadingComponent from "./components/LoadingComponent";


const App = () => {
  const [entries, setEntries] = React.useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ENTRIES_ROUTE} element={<Entries entries={entries} setEntries={setEntries} />} />
          <Route
            path="entry/edit/:entryId"
            element={<EditEntry entries={entries} setEntries={setEntries} />} />
          <Route
            path="entry/view/:entryId"
            element={<ViewEntry/>} />
          <Route path={CHARTS_ROUTE} element={<Charts entries={entries} />} />
          <Route path="/" element={<Entries />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );

};

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? 'green' : '',
    padding: '5px'
  });

  return (
    <>
      <h1>React Router</h1>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <NavLink to={ENTRIES_ROUTE} style={style}>
          Entries
        </NavLink>

        <NavLink to={CHARTS_ROUTE} style={style}>
          Charts
        </NavLink>
      </nav>

      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default App;
