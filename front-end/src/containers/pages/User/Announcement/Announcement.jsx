import React from 'react';
import UserSidebar from '../../../../component/Sidenav/UserSidebar';
import Contact from '../../../../component/Contact/Contact';
import AnnouncementSub from '../../../../component/Chat/AnnouncementSub';

const Announcement = () => {
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <UserSidebar />
      <AnnouncementSub />
    </div>
  );
};

export default Announcement;
