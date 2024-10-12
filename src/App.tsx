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
        <Header />
        <main>
          <DisplayDesign />
          <FormMenu />
        </main>
      </CVInfoProvider>
      <Footer />
    </ModalProvider>
  );
}

export default App;
