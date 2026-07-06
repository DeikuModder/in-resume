import CVInfoProvider from "./Providers/CVInfoProvider";
import ModalProvider from "./Providers/ModalProvider";
import AuthProvider from "./Providers/AuthProvider";
import DisplayDesign from "./components/DisplayDesign";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <CVInfoProvider>
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main>
              <DisplayDesign />
            </main>
            <Footer />
          </div>
          <Toolbar />
        </CVInfoProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
