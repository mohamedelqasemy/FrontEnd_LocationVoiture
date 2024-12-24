import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div>
      <header>Hearder pour nav bar</header>
      <main>
        <Outlet/>
      </main>
      <footer>footer of our application</footer>
    </div>
  );
}

export default ClientLayout;
