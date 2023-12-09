import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from 'react-router-dom'

import Subreddit from './app/components/subreddits/Subreddit';
import Subreddits from './app/components/subreddits/Subreddits';

import Layout from './app/pages/Layout';
import Contact from './app/pages/Contact';
import NotFound from './app/pages/NotFound';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index path="subreddits" element={<Subreddits />} />
      <Route path="subreddits/:name" element={<Subreddit />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>

  )
)






function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
