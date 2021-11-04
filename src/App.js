import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import ScrollToTop from "./components/scrollToTop";
import Header from './components/Header';
import Home from './pages/Home';
import ViewMovie from "./pages/ViewMovie";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Search from "./pages/Search";

const App = () => {
  return (
    <div className="wrapper">
      <Router>
      <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/catalog/:genreid">
            <Catalog />
          </Route>
          <Route path="/catalog">
            <Catalog />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/movie/:id">
            <ViewMovie />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div> 
  );
}

export default App;
