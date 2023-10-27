import React from 'react';
import Sidenav from '../../../../component/Sidenav/Sidenav';
import Chat from '../../../../component/Chat/Chat';
import Contact from '../../../../component/Contact/Contact';
const Home = () => {
  return (
    <div className="max-w-screen max-h-screen flex">
      <Sidenav />
      <Contact />
      <Chat />
    </div>
  );
};

export default Home;
