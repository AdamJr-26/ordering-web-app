import AppProvider from "./hooks/appProvider";
import Router from "./routes/Router";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
