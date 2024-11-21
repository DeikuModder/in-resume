import CVInfoProvider from "./Providers/CVInfoProvider";
import ModalProvider from "./Providers/ModalProvider";
import DisplayDesign from "./components/DisplayDesign";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FormMenu from "./components/form-menu/FormMenu";

function App() {
  return (
    <ModalProvider>
      <CVInfoProvider>
        <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main>
            <DisplayDesign />
            <FormMenu />
          </main>
          <Footer />
        </div>
      </CVInfoProvider>
    </ModalProvider>
  );
}

export default App;
