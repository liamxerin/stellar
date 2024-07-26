import React from 'react'
import { LuSend } from "react-icons/lu";
const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <LuSend className='text-white' />
        </button>
      </div>
    </form>
  );
}

export default MessageInput

// STARTER CODE FOR MESSAGEINPUT
// import React from 'react'
// import {BaSend} from 'react-icons/bs'
// const MessageInput = () => {
//   return (
//       <form className='px-4 my-3'>
//           <div className='w-full'>
//               <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' />
//               <button type='submit' className='absoulte inset-y-0 end-0 flex items-center pe-3'>
//                   <BaSend/>
//               </button>
//           </div>
          

//     </form>
//   )
// }

// export default MessageInput

