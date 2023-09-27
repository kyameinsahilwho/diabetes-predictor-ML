import React from "react";
import RootLayout from "@/components/Layout";
export default function Home() {
  return (
    <RootLayout>

      <div className="items-center justify-center text-center pb-[25%] pt-[15%] flex uk-scrollspy">
        <h1 className="text-xl lg:text-5xl font-[arial]  font-[700] uk-animation-slide-bottom-small" data-uk-scrollspy-class="uk-animation-slide-bottom-small">Empowering Health, Defeating <i className=" font-[helvectica]">Diabetes</i>: Your Path to Wellness Begins Here!</h1>
      </div>
    </RootLayout>
  );
}
