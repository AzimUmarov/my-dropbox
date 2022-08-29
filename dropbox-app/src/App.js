import React from "react";
import AppRouter from "./components/routing/AppRouter";
import { BrowserRouter } from "react-router-dom";
import AuthStore from "./components/store/AuthStore";

function App() {
  return (
    <AuthStore>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthStore>
  );
}

export default App;
