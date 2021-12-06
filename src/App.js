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
import Search_mem from "./Member/search";
import Faq_mem from "./Member/faq";
import Reissue_mem from "./Member/reissue";
import Search_lib from "./Librarian/search";
import Update_lib from "./Librarian/update";
import Add_lib from "./Librarian/add";
import Updatefine_lib from "./Librarian/updatefine";
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
                <Route exact path="/register" component={Register_member} />
                <Route exact path="/member/home" component={Home_member} />
                <Route exact path="/member/search" component={Search_mem} />
                <Route exact path="/faq" component={Faq_mem} />
                <Route exact path="/member/reissue" component={Reissue_mem} />
                <Route exact path="/librarian/search" component={Search_lib} />
                <Route exact path="/librarian/update" component={Update_lib} />
                <Route exact path="/librarian/add" component={Add_lib} />
                <Route
                    exact
                    path="/librarian/updatefine"
                    component={Updatefine_lib}
                />
            </Switch>

            {/* <Footer /> */}
        </>
    );
}

export default App;
