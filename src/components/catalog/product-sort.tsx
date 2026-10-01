'use client';

import { useSearchParams } from 'next/navigation';

export function ProductSort({ value }: { value: string }) {
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.delete('page');
    window.location.search = params.toString();
  };

  const options = [
    { label: 'Más vendidos', value: 'popular' },
    { label: 'Nuevo', value: 'newest' },
    { label: 'Nombre A-Z', value: 'name_asc' },
    { label: 'Nombre Z-A', value: 'name_desc' },
    { label: 'Precio: menor a mayor', value: 'price_asc' },
    { label: 'Precio: mayor a menor', value: 'price_desc' },
  ];

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}