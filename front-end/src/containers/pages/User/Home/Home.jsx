import React from 'react';
import UserSidebar from '../../../../component/Sidenav/UserSidebar';
import Chat from '../../../../component/Chat/Chat';
import Contact from '../../../../component/Contact/Contact';
const Home = () => {
  return (
    <div className="max-w-screen max-h-screen flex">
      <UserSidebar />
      <Contact />
      <Chat />
    </div>
  );
};

export default Home;
