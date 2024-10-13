import Footer from "@/components/Footer/Footer";
import MusclesChart from "@/components/MusclesChart/MusclesChart";
import NavBar from "@/components/NavBar/NavBar";

export default function Main({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow m-auto mt-8 w-1/2">
        {children || <MusclesChart />}
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

