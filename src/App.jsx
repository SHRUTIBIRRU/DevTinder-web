import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* All the children routes of <Body/> ( body of component) will be rendered in Outlet */}
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
