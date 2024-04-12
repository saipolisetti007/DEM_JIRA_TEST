import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PageLayout = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow py-5">{props.children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
