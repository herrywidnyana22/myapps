import { auth, db } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [user, setUser] = useState<UserType>(null)

    const login = async(email: string, password: string) =>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error: any) {
            let msg = error.message
            return{
                success: false,
                msg
            }
        }
    }

    const register = async(name: string, email: string, password: string) =>{
        try {
            let createUser = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "users", createUser?.user?.uid), {
                uid: createUser?.user?.uid,
                name,
                email
            })
            return { success: true }
        } catch (error: any) {
            let msg = error.message
            return{
                success: false,
                msg
            }
        }
    }
    
    const updateUser = async(uid: string) =>{
        try {
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const data = docSnap.data()
                const userData: UserType = {
                    uid: data?.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null
                }

                setUser({...userData})
            }

        } catch (error: any) {
            let msg = error.message
            // return{
            //     success: false,
            //     msg
            // }

            console.log("error: ", error)
        }
    }

    const contextValue: AuthContextType ={
        login,
        register,
        user,
        setUser,
        updateUserData: updateUser,
    }

    return(
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = ():AuthContextType =>{
    const context = useContext(AuthContext)

    if (!context){
        throw new Error("useAuth must be wrapped inside AuthProvider")
    }

    return context
}