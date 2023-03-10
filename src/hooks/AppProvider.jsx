import { UserProvider } from "./auth";

function AppProvider({ children }) {
  return (
    <>
      <UserProvider>{children}</UserProvider>
    </>
  );
}

export default AppProvider;
