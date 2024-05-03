'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getDetail } from '@/lib/api'
import AddtoCart from '@/components/AddtoCart'
import { useState, useEffect } from 'react'

const Detail = ({ params }) => {
  const [result, setResult] = useState({
    name: "",
    price: "",
    quantity: ""
})

  useEffect(() => {
    async function loadRecord() {
      try {
        const data = await getDetail(params.id)
        setResult(prev => {
          return {
            ...prev,
            name: data.name,
            price: data.price,
            quantity: data.quantity
          }
        })

      } catch (err) {
        console.log(err)
      }
    }
    loadRecord()
  }, [params.id])

  return (
    <MaxWidthWrapper>
      <div className='min-h-full w-2/3'>
        <div className='py-4 flex flex-col max-w-3xl gap-2'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>{result.name}</h1>
          <h3 className='mt-3'><span className='font-semibold text-muted-foreground'>Price: </span>{result.price}</h3>
          <h4 className='text-muted-foreground italic'>Quantity left: {result.quantity}</h4>
        </div>
        <AddtoCart id={params.id} />
      </div>
    </MaxWidthWrapper>
  )
}

export default Detail

