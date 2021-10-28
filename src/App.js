import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Member from "./Member";
import Lib from "./Librarian/index";
import Lib_home from "./Librarian/home";
import Register_member from "./Member/register";
import Home_member from "./Member/home";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="/contact" component={Contact} />
                <Route component={Error} /> */}
                <Route exact path="/member" component={Member} />
                <Route exact path="/librarian" component={Lib} />
                <Route exact path="/librarian/home" component={Lib_home} />
                <Route
                    exact
                    path="/member/register"
                    component={Register_member}
                />
                <Route exact path="/member/home" component={Home_member} />
            </Switch>

            {/* <Footer /> */}
        </>
    );
}

export default App;
