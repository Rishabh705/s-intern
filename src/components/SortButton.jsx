'use client'
 
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSortNumericUp, FaSortNumericDown  } from "react-icons/fa";

export default function SortButton() {
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sortParam = params.get('sort');
    if (sortParam) {
      setSortOrder(sortParam);
    }
  }, [searchParams]);

  function toggleSorting() {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSortOrder);
    window.history.pushState(null, '', `?${params.toString()}`);
    setSortOrder(newSortOrder);
  }

  return (
    <>
      <button onClick={toggleSorting}>
        {sortOrder === 'desc' ? <FaSortNumericUp size={20}/> : <FaSortNumericDown size={20}/>}
      </button>
    </>
  );
}
