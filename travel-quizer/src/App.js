import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute"
import { AuthProvider } from "./contexts/AuthContext"
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from './pages/Login';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* Routes */}
        <Router>
          <Switch>
            {/* Home route */}
            <Route exact path="/" component={Home} />

            {/* Help route */}
            <Route exact path="/help" component={Help} />

            {/* Private dashboard route */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            {/* Private dashboard route */}
            <Route exact path="/user/:id" component={User} />

            {/* AUTH - Guests only */}
            {/* Signup route */}
            <GuestRoute exact path="/signup" component={Signup} />
            <GuestRoute exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
