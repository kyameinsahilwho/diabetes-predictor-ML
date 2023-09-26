"use client"
import Image from 'next/image'
import Form from '@/components/Form'
import Navbarcomp from '@/components/Navbar'
import Agebmi from '@/components/Agebmicharrt'
import AgeGlucose from '@/components/AgeGlucose'
import Agehba1c from '@/components/AgeHbA1c'
import RootLayout from '@/components/Layout'
export default function Home() {
  return (
    <RootLayout>
    <div >
    <Form />
    </div> 
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
    <Agebmi />
    </div>  
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
    <AgeGlucose />
    </div> 
    <div className="mt-10 p-4 shadow-xl md:container md:mx-auto border-4 border-solid rounded-lg border-red-200 bg-white">
    <Agehba1c />
    </div>   
    </RootLayout>
    
  )
}
