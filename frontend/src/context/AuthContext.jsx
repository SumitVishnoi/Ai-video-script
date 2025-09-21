import React, { createContext, useContext } from 'react'
export const AuthDataContext = createContext()

const AuthContext = ({children}) => {
    const serverUrl = "https://ai-video-script.vercel.app"
    const value = {
        serverUrl
    }
  return (
    <div>
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext