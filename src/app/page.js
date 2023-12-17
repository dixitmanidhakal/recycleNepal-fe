import Image from 'next/image'
import NavBar from '@/components/NavBar'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <NavBar />
    <div className='text-3xl'>This is first page</div>
    </Fragment>
  )
}
