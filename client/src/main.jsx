// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import SignIn from './SignIn.jsx';

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/signin" element={<SignIn />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>

// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HighlightPoints from "./HighlightPoints";


import App from './App.jsx';
import SignIn from './SignIn.jsx';
// Get root element
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main App */}
        <Route path="/" element={<App />} />
        {/* SignIn Page */}
        <Route path="/signin" element={<SignIn />} />
        {/* Highlight Points Page (optional if you want a separate route) */}
        <Route path="/highlight" element={<HighlightPoints />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
