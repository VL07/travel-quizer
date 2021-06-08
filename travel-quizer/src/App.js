import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Help from "./pages/Help";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

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

            {/* AUTH */}
            {/* Signup route */}
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
