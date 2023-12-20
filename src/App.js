import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Router,
} from 'react-router-dom'

import Subreddit from './app/components/subreddits/Subreddit';
import Subreddits from './app/components/subreddits/Subreddits';
import HotPostDetail from './app/components/hotPosts/hotPostDetail';
import Layout from './app/pages/Layout';
import Contact from './app/pages/Contact';
import NotFound from './app/pages/NotFound';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index path="subreddits" element={<Subreddits />} />
      <Route path="subreddits/:id" element={<Subreddit />} />
      <Route path="subreddits/:id/:post" element={<HotPostDetail />} />
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
