import Results from "../Results";
import PageCounter from "../Page";
import FilterSelect from '@/components/FilterSelect'
import SortButton from '@/components/SortButton'
import { cn } from "@/lib/utils";

export default function AdminResults() {

    return (
        <div className={cn('flex flex-col', "py-6")}>
            <div className='flex justify-between'>
                <FilterSelect />
                <SortButton />
            </div>
            <Results isAdmin={true} dynamicLink='/update-product'/>
            <PageCounter />
        </div>
    )
}
