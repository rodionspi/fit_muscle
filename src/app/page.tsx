import MusclesChart from "@/components/MusclesChart/MusclesChart";
import NavBar from "@/components/NavBar/NavBar";

export default function Home() {
  return (
    <>
        <header>
          <NavBar/>
        </header>
        <main >
          <MusclesChart/>
        </main>
    </>
  );
}
