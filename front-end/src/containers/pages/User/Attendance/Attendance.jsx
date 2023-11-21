import React from 'react';
import UserSidebar from '../../../../component/Sidenav/UserSidebar';
import Contact from '../../../../component/Contact/Contact';
import AttendanceSub from '../../../../component/Chat/AttenddanceSub';

const Attendance = () => {
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <UserSidebar />
      <Contact />
      <AttendanceSub />
    </div>
  );
};

export default Attendance;
