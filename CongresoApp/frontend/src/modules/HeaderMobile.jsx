import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';

export default function HeaderMobile({ backLink, title}) {
  return (
    <header className="bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={backLink} className="text-gray-700 font-bold">
          <ChevronLeftIcon className="w-8 text-[#29568E] hover:text-[#78aff3]" />
        </Link>
        <h1 className="text-xl font-bold text-[#29568E]">{title}</h1>
        <Link to="#" className="font-bold">
          <MegaphoneIcon className="w-8 text-[#29568E] hover:text-[#78aff3]" />
        </Link>
      </nav>
    </header>
  );
}
