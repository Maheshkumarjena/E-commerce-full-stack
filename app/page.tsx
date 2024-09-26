import "./globals.css";
import { SmoothScrollHero } from "@/components/HeroSection";
import ProductPage from "@/components/ProductPage";


export default async function Home () {
  
  return (
    <main className="w-full mx-auto hide-scrollbar ">
      <SmoothScrollHero/>
      <ProductPage/>
    </main>
  );
}
