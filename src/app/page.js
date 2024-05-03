import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SearchBox from '@/components/SearchBox'
// import Hbuttons from '@/components/Hbuttons'
import { Suspense } from 'react'
import Loading from '@/components/Loading'
import Results from '@/components/Results'
import Page from '@/components/Page'
import FilterSelect from '@/components/FilterSelect'
import SortButton from '@/components/SortButton'

const Home = ({ searchParams }) => {
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-6xl'>
            Your Ultimate  Destination for <span className='bg-gradient-to-r from-sky-500 to-indigo-500 inline-block text-transparent bg-clip-text'>Premium News</span>
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to NewsNxt, where every piece of news on our platform undergoes rigorous verification by our team, ensuring high-quality and truth.
          </p>
          <SearchBox />
        </div>
      </MaxWidthWrapper>

      <section className='mb-4'>
        <MaxWidthWrapper>
          <div className='flex justify-between'>
            <FilterSelect />
            <SortButton/>
          </div>
          <Suspense fallback={<Loading />}>
            <Results searchParams={searchParams} isAdmin={false}/>
          </Suspense>
          <Page searchParams={searchParams} />
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Home