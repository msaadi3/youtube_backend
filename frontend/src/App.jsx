import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './mycomponents/AppLayout.jsx';
import HomePage from './mycomponents/HomePage.jsx';
import VideoPlayerPage from './mycomponents/VideoPlayerPage.jsx';
import ChannelPage from './mycomponents/ChannelPage.jsx';
import UpdateChannelInfo from './mycomponents/UpdateChannelInfo.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='video/:id' element={<VideoPlayerPage />} />
          <Route path='channel/:id' element={<ChannelPage />} />
          <Route path='channel/update' element={<UpdateChannelInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
