import React from "react";
import "./App.css";
import UserProvider from "./components/context/UserContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
