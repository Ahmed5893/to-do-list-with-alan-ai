import React from 'react';
// import ReactDOM from 'react-dom/client';
import { hydrate, render } from "react-dom";

import './index.css';
import App from './App';

//  const root = ReactDOM.createRoot(document.getElementById('root'));

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
	hydrate(<App />, rootElement);
} else {
	render(<App />, rootElement);
}
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


