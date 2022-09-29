import React, { useState, useEffect } from "react";
import AppRouter from "./routes/router";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppRouter />
    </div>
  );
}

export default App;
