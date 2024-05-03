import Results from "../Results";
import PageCounter from "../Page";
import FilterSelect from '@/components/FilterSelect'
import SortButton from '@/components/SortButton'
import { cn } from "@/lib/utils";
import MuliDele from "../MuliDele"

export default function AdminResults() {

    return (
        <div className={cn('flex flex-col', "py-6")}>
            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <FilterSelect />
                    <SortButton />
                </div>
                <MuliDele />
            </div>
            <Results isAdmin={true} dynamicLink='/update-product' />
            <PageCounter />
        </div>
    )
}
