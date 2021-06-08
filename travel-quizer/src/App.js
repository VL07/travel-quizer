import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      {/* Routes */}
      <Router>
        <Switch>
          {/* Home route */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
