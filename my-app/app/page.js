"use client"
import Image from 'next/image'
import Form from '../components/Form'
import Navbarcomp from '../components/Navbar'
import Agebmi from '../components/Agebmicharrt'
import AgeGlucose from '@/components/AgeGlucose'
import Agehba1c from '@/components/AgeHbA1c'
export default function Home() {
  return (
    <>
    <Navbarcomp />
    <div >
    <Form />
    </div> 
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200">
    <Agebmi />
    </div>  
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200">
    <AgeGlucose />
    </div> 
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200">
    <Agehba1c />
    </div>   
    </>
    
  )
}
