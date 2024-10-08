import Footer from "@/components/Footer/Footer";
import MusclesChart from "@/components/MusclesChart/MusclesChart";
import NavBar from "@/components/NavBar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
        <header>
          <NavBar/>
        </header>
        <main className="mb-52">
          {children || <MusclesChart/>}
        </main>
        <footer>
          <Footer/>
        </footer>
    </>
  );
}
