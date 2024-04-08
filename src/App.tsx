import CVInfoProvider from "./Providers/CVInfoProvider";
import DisplayDesign from "./components/DisplayDesign";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FormMenu from "./components/form-menu/FormMenu";

function App() {
  return (
    <>
      <CVInfoProvider>
        <Header />
        <main>
          <DisplayDesign />
          <FormMenu />
        </main>
      </CVInfoProvider>
      <Footer />
    </>
  );
}

export default App;
