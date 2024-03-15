import './App.css';
import { NavRoutes } from './routes/NavRoutes';
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from './contexts/SocketContext';

function App() {
  return (
    <SocketProvider>
      <Router>
        <NavRoutes></NavRoutes>
      </Router>
    </SocketProvider>
  );
}

export default App;
