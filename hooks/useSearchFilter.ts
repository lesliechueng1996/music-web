import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEventHandler, useRef } from 'react';

function useSearchFilter() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    const formElm = e.target as HTMLFormElement;
    const entries = Object.fromEntries(new FormData(formElm));
    for (const key in entries) {
      if (typeof entries[key] !== 'string') {
        continue;
      }
      if (entries[key]) {
        params.set(key, entries[key] as string);
      } else {
        params.delete(key);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return { formRef, searchParams, handleSearch };
}

export default useSearchFilter;
