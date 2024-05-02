'use client'

import { useContext, useEffect, useState } from 'react';
import { getAll } from "@/lib/api";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import ResultCard from "./ResultCard";
import FilterContext from '@/contexts/filter';
import { useSearchParams } from 'next/navigation';

export default function Results({ isAdmin, dynamicLink='' }) {
  const [products, setProducts] = useState([]);
  const { filter } = useContext(FilterContext);
  const searchParams = useSearchParams();

  const offset = searchParams.get('offset') || 0;
  const sort = searchParams.get('sort') || 'asc';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAll(offset, filter.min, filter.max);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [offset, filter.min, filter.max, searchParams]);

  useEffect(() => {
    if (sort && products.length > 0) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sort === 'asc') {
          return a.price - b.price;
        } else if (sort === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });

      // Check if sorting has actually changed the order before updating state
      if (!isEqual(sortedProducts, products)) {
        setProducts(sortedProducts);
      }
    }
  }, [sort, products]);

  if (!Array.isArray(products) || products.length === 0) {
    return <div className='mb-4'>No products found.</div>;
  }

  const cards = products.map((item) => (
    <Link href={`${dynamicLink}/${item.id}`} key={item.id}> {/* Concatenate dynamic part with item id */}
      <ResultCard item={item} isAdmin={isAdmin}/>
    </Link>
  ));

  return (
    <div className={cn('flex flex-col gap-y-6', "py-6")} key="results-container">
      {cards}
    </div>
  );
}

function isEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}
