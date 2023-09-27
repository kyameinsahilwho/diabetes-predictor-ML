"use client"
import Image from 'next/image'
import Form from '@/components/Form'
import Navbarcomp from '@/components/Navbar'
import Agebmi from '@/components/Agebmicharrt'
import AgeGlucose from '@/components/AgeGlucose'
import Agehba1c from '@/components/AgeHbA1c'
import RootLayout from '@/components/Layout'

export default function Prediction() {
  

  return (
    <RootLayout>
      <div className='uk-animation-slide-bottom-small' data-uk-scrollspy-class="uk-animation-slide-bottom-small; delay: 1000;" >
        <Form />
      </div>  
    </RootLayout>
  )
}