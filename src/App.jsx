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
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });
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
          <Route path={CHARTS_ROUTE} element={<Charts />} />
          <Route path="/" element={<Entries />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );




      // <nav>
      //   <Link to={ENTRIES_ROUTE}>Entries</Link>
      //   <Link to={CHARTS_ROUTE}>Char</Link>
      // </nav>

  // return (
  //     <Routes>
  //       <Route element={<Layout />}>
  //         <Route index element={<Entries />} />
  //         <Route path={ENTRIES_ROUTE} element={<Entries />} />
  //         <Route path={CHARTS_ROUTE} element={<Charts />} />
  //         {/* <Route path="users" element={<Users users={users} />}>
  //         <Route
  //         path=":userId"
  //         element={<User onRemoveUser={handleRemoveUser} />}
  //         />
  //       </Route> */}
  //         <Route path="*" element={<NoMatch />} />
  //       </Route>
  //     </Routes>
  // );

// return (
//   <>
//     <h1>React Router</h1>

//     <nav
//       style={{
//         borderBottom: "solid 1px",
//         paddingBottom: "1rem",
//       }}
//     >
//       <NavLink to={ENTRIES_ROUTE} style={style}>
//         Entries
//       </NavLink>
//       <NavLink to={CHARTS_ROUTE} style={style}>
//         Charts
//       </NavLink>
//     </nav>

//     <main style={{ padding: "1rem 0" }}>
//       <Outlet />
//     </main>
//   </>
// );
  

};

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
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
