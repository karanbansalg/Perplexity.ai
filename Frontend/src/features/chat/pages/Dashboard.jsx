import React,{useEffect, useState, useRef} from 'react'
import {useSelector} from 'react-redux'
import { useChat } from '../hooks/useChat'


const Dashboard = () => {

const chat = useChat()
const [messages, setMessages] = useState([])
const [inputValue, setInputValue] = useState('')
const [loading, setLoading] = useState(false)
const messagesEndRef = useRef(null)

    const {user} = useSelector((state) => state.auth)
    const {chats} = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state)=> state.chat.currentChatId)

    useEffect(() => {
      chat.initializeSocketConnection()
    },[])

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth' 
      })
      }, [messages])
  
    const handleSendMessage = (event) => {
      

      const trimmedMessage = inputValue.trim()
      if (!trimmedMessage){
         return
      
      }
      chat.handleSendMessage({message: trimmedMessage, chatId: currentChatId})
      setInputValue("")
         
    }
    return (
        <main className="h-screen w-full flex bg-neutral-950">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 flex flex-col">
        {/* Header */}
        <div className="p-6 ">
          <h1 className="text-2xl font-bold text-white">Perplexity</h1>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <button
              key={item}
              className="w-full px-4 py-3 text-left text-neutral-300 border border-neutral-600 rounded-lg hover:bg-neutral-700 hover:border-neutral-500 transition-all duration-200"
            >
              Chat title-{item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* User Message Input (Top Right) */}
        <div className="flex justify-end items-center p-6 ">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">{user?.email || user?.username || 'User'}</span>
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold">
              {user?.email?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        {/* Message Display Area */}
        <section className=" flex relative max-w-3/4 h-full min-w-0 flex-col gap-4 ">

         <div className="messages w-full flex-1 overflow-y-auto p-6 space-y-4">
            {currentChatId ? (  
             <>
               {chats[currentChatId]?.messages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[82%] w-fit px-4 py-3 text-sm md:text-base rounded-lg ${
                     msg.role === 'user'
                       ? 'bg-neutral-700 text-white rounded-br-none'
                       : 'bg-neutral-700 text-neutral-100 rounded-bl-none'
                   }`}>
                     <p>{msg.content}</p>
                   </div>
                 </div>
               ))}
               {loading && (
                 <div className="flex justify-start">
                   <div className="bg-neutral-700 text-neutral-100 px-5 py-3 rounded-lg rounded-bl-none">
                     <div className="flex gap-2">
                       <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                       <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                     </div>
                   </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
             </>
           ) : (
             <div className="flex items-center justify-center h-full">
               <p className="text-neutral-400 text-lg">Start a conversation</p>
             </div>
           )}
         </div>

          <footer className="flex gap-3 w-full absolute bottom-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
              placeholder="Chat input area"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage()}
              disabled={loading}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </footer>  
        </section>       
      </div>
                
      
    </main>
    
  )

}
    export default Dashboard