import RootLayout from "@/components/Layout";
import Agebmi from "@/components/Agebmicharrt";
import AgeGlucose from "@/components/AgeGlucose";
import Agehba1c from "@/components/AgeHbA1c";
export default function Trends() {
    return (
        <RootLayout>
          <h1 className="text-xl lg:text-5xl font-[arial]  font-[700] uk-animation-slide-bottom-small mt-4" data-uk-scrollspy-class="uk-animation-slide-bottom-small text-center"><span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">Trends</span></h1>
        <div data-uk-scrollspy-class="uk-animation-slide-bottom-small"  className=" uk-animation-slide-bottom-small mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
        <Agebmi />
      </div>  
      <div data-uk-scrollspy="uk-animation-slide-bottom-small"  className=" uk-animation-slide-bottom-small mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
        <AgeGlucose />
      </div> 
      <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
        <Agehba1c />
      </div> 
        </RootLayout>
    );
}