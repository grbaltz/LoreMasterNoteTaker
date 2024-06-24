import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import Home from './pages/Home';
import Screen from './pages/Screen';
import Page from './pages/Page';
import NewPage from './components/NewPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Screen />,
    errorElement: <div className="error-page">Oopsies, page not found</div>,
    children: [
      {
        path: 'page/:id',
        element: <Page />
      },
      {
        path: 'page/new',
        element: <NewPage />
      },
      {
        path: 'page/home',
        element: <Home />
      }
    ]
  },
  
]);

// test

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
