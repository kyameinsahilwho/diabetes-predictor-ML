import React from "react";
import RootLayout from "@/components/Layout";
export default function Home() {
  return (
    <RootLayout>
      <div className="items-center justify-center text-center pb-[25%] pt-[15%] flex uk-scrollspy">
        <h1
          className="text-xl lg:text-5xl font-[arial]  font-[700] uk-animation-slide-bottom-small"
          data-uk-scrollspy-class="uk-animation-slide-bottom-small"
        >
          <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
            Empowering Health,
          </span>{" "}
          Defeating <i className=" font-[helvectica]">Diabetes</i>: Your Path to
          Wellness Begins Here!
        </h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <div className="w-[90%] p-6 bg-pink-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Diabetes Predictor
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">
              Predict your chances of getting diabetes in just a few clicks.
            </p>
            <a
              href="/prediction"
              className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-700 dark:hover:bg-pink-800 dark:focus:ring-pink-800"
            >
              Check Out Now!
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] p-6 bg-pink-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              BMI Calculator
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">
              Calculate your BMI and get a detailed analysis of your health.
            </p>
            <a
              href="/bmi"
              className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-700 dark:hover:bg-pink-800 dark:focus:ring-pink-800"
            >
              Check Out Now!
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-[90%] p-6 bg-pink-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Know The Trends
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">
              Get Charts and Graphs of the trends of diabetes in India.
            </p>
            <a
              href="/trends"
              className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-700 dark:hover:bg-pink-800 dark:focus:ring-pink-800"
            >
              Check Out Now!
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
    </RootLayout>
  );
}
