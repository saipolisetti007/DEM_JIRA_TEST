import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SecondaryNavBar from '../Header/SecondaryNavBar';

//Main App page Layout
const PageLayout = ({ children, hideHeaderFooter }) => {
  return (
    <div className="flex flex-col h-screen">
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <SecondaryNavBar />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
