import "./globals.css";
import Header from "./page-parts/Header";
import Main from "./page-parts/Main.client";
import Footer from "./page-parts/Footer";


export default function Home() {
  return <div className=" w-full">
    <Header />
    <Main />
    <Footer />
  </div>;
}
