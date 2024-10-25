'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder, mobile }: { placeholder: string, mobile: boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function handleSearch(term: string | undefined) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    
    return (
        mobile ? (
            <div>
                <div className="relative flex flex-1 flex-shrink-0 pointer-events-none">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-200" />
                    <input
                        className="max-w-30 peer block rounded-md border border-gray-200 py-[9px] pl-8 pr-4 text-sm text-white outline-2 placeholder:text-gray-400 bg-gradient-to-r from-indigo-900 to-blue-900"
                        placeholder="search..."
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                </div>
            </div>
        ) : (
            <div className="mx-5">
                <div className="relative flex flex-1 flex-shrink-0">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-200" />
                    <input
                        className="max-w-40 peer block rounded-md border border-gray-200 py-[9px] pl-8 pr-4 text-sm text-white outline-2 placeholder:text-gray-300 bg-gradient-to-r from-indigo-900 to-blue-900"
                        placeholder={placeholder}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                        // value={searchParams.get('query')?.toString()}
                    />
                </div>
            </div>
        )
    );
}