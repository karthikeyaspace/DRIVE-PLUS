import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './components/Root';
import Home from './components/Home/Home';
import Collections from './components/Collections/Collections.jsx';
import FilesInCollection from './components/FilesInCollection/FilesInCollection';
import UploadFile from './components/UploadFile/UploadFile';
import PublicFileDisplay from './components/PublicFileDisplay/PublicFileDisplay';
import FileView from './components/FileView/FileView.jsx';

function App() {
  let routes = createBrowserRouter([{
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'api',
        children: [
          {
            path:'home',
            element: <Home />
          },
          {
            path: 'collections',
            element: <Collections />
          },
          {
            path: 'collections/:collectionId',
            element: <FilesInCollection />
          },
          {
            path: 'collections/:collectionId/upload',
            element: <UploadFile />
          },
          {
            path: 'collections/:collectionId/:fileId',
            element: <FileView />
          }
        ]
      },
      {
        path: 'public',
        element: <PublicFileDisplay />
      }
    ]
  }])
  
  

  return(
    <RouterProvider router={routes}/>
  )
}

export default App;

