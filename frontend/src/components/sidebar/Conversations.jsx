import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../../utils/emoji';

const Conversations = () => {
    const { loading, conversations } = useGetConversations()
    console.log("CONVERSATIONS: ", conversations)
  return (
    <div className="py-2 flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
          <Conversation key={conversation._id} conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx = {idx === conversations.length - 1} />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations



// STSRTER CODE FOR CONVERSATIONS

// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className="py-2 flex-col overflow-auto">
//       <Conversation />
//       <Conversation /> 
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   );
// }

// export default Conversations