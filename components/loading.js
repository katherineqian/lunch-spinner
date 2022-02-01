import Image from 'next/image'
import burger from '../public/burger.gif'

export default function Loading() {
  return ( 
    <div className="flex justify-center items-center py-32">
      <div>
        <Image src={burger} alt="Loading GIF" width={80} height={80} />
        <p className="text-sm text-gray-500 text-center mt-3">Spinning...</p>
      </div>
    </div>
  )
}