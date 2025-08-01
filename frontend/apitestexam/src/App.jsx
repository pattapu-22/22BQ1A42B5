import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UrlProvider } from "./context/UrlContext.jsx";
import ShortenerPage from "./pages/ShortenerPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import RedirectHandler from "./pages/RedirectHandler.jsx";

function App() {
  return (
    <UrlProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
      </Router>
    </UrlProvider>
  );
}
export default App;
