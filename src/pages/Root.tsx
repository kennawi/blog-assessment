import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "../app/store";
import { fetchUsers } from "../features/users/usersSlice";
import Navbar from "../components/Navbar/Navbar";
import tw from "twin.macro";

const Container = tw.main`  px-4 bg-gray-900 min-h-screen overflow-y-auto `;
const RootLayout = () => {
  store.dispatch(fetchUsers());
  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </Provider>
  );
};

export default RootLayout;
