import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
