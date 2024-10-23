import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SecondaryNavBar from '../Header/SecondaryNavBar';
import DefaultPageLoader from '../Common/DefaultPageLoader';
import { useAppSelector } from '../../store/hooks';

// Define the props interface
interface PageLayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

//Main App page Layout
const PageLayout = ({ children, hideHeaderFooter }: PageLayoutProps) => {
  const { customerId } = useAppSelector((state) => state.userProfileData);
  //show the loader until the customerId is available
  if (!customerId) {
    return <DefaultPageLoader />;
  }
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
