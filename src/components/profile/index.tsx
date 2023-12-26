import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect, MutableRefObject, EventHandler } from 'react';

const useOnClickOutside = (ref: MutableRefObject<HTMLDivElement | null>, handler: EventHandler<any>) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

const Profile = () => {
  const [isMenuToggle, setIsMenuToggle] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => setIsMenuToggle(false));

  return (
    <div>
      <div onClick={() => setIsMenuToggle(!isMenuToggle)} className="w-16 h-16 border rounded-full bg-gray-300 hover:bg-gray-100">
        <img src="https://picsum.photos/200" className="w-16 h-16 rounded-full" />
      </div>
      {isMenuToggle && (
        <div ref={ref} className="absolute top-0 right-0 w-96 h-screen border rounded-lg bg-white">
            <div className="w-full">
                <div className='flex items-center my-3 gap-5'>
                    <img src="https://picsum.photos/200" className="ml-8 w-8 h-8 rounded-full" />
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <button className="flex items-center justify-center w-12 h-12 p-1 ml-auto mr-8 rounded-full hover:bg-gray-200"
                        onClick={() => setIsMenuToggle(!isMenuToggle)}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <hr />
                <div>
                    
                </div>
            </div>
        </div>       
        )}
    </div>
  )
};

export default Profile;