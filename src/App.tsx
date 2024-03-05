import CVInfoProvider from "./Providers/CVInfoProvider";
import Header from "./components/Header";
import FormMenu from "./components/form-menu/FormMenu";
import BasicDesign from "./components/resume-designs/BasicDesign";

function App() {
  return (
    <>
      <Header />
      <CVInfoProvider>
        <main className="flex justify-center items-center">
          <BasicDesign />
          <FormMenu />
        </main>
      </CVInfoProvider>
    </>
  );
}

export default App;
