import { Outlet } from "react-router-dom";
import ClientAppBar from "../components/CompenentsClients/ClientAppBar";
import Footer from "../components/CompenentsClients/Footer";

const ClientLayout = () => {
  return (
    <div>

      {/* TopBar */}
      <ClientAppBar
        isLoggedIn={false}
        onLogin={() => console.log("Redirect to Login")}
        onSignUp={() => console.log("Redirect to Sign Up")}
      />

      {/* Main Contenent */}
      <main style={{ paddingTop: '70px' }}>
        <Outlet />
      </main>


    {/* Footer */}
    <Footer/>
    </div>
  );
};

export default ClientLayout;
