import React from 'react';
import UserSidebar from '../../../../component/Sidenav/UserSidebar';
import Contact from '../../../../component/Contact/Contact';
import LessonSub from '../../../../component/Chat/LessonSub';

const Lesson = () => {
  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <UserSidebar />
      <LessonSub />
    </div>
  );
};

export default Lesson;
