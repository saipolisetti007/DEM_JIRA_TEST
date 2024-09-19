import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//Main App page Layout
const PageLayout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">{props.children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
