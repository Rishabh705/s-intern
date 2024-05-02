'use client'

import { useState, useEffect } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

export default function PageCounter({ searchParams }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Update the URL with the new page parameter whenever page state changes
    const params = new URLSearchParams(searchParams);
    params.set('offset', offset);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [offset, searchParams]);

  const totalPages = Math.ceil(offset / 10) + 1;

  const incrementPage = () => {
    setOffset(offset + 10);
  };

  const decrementPage = () => {
    setOffset(Math.max(offset - 10, 0));
  };

  return (
    <div className="flex space-x-2">
      <button onClick={decrementPage} disabled={offset === 0}>
        <BiLeftArrow color='gray'/>
      </button>
      <span>{totalPages}</span>
      <button onClick={incrementPage}>
        <BiRightArrow color='gray' />
      </button>
    </div>
  );
}

