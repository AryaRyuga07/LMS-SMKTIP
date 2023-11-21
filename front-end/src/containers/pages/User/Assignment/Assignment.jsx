import React from 'react';
import UserSidebar from '../../../../component/Sidenav/UserSidebar';
import Contact from '../../../../component/Contact/Contact';
import AssignmentSub from '../../../../component/Chat/AssignmentSub';

const Assignment = () => {
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <UserSidebar />
      <Contact />
      <AssignmentSub />
    </div>
  );
};

export default Assignment;
