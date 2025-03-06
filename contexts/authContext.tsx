import { auth, db } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [user, setUser] = useState<UserType>(null)
    
    const router = useRouter()

    useEffect(() => {
        const userState = onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser){
                setUser({
                    uid: firebaseUser?.uid,
                    name: firebaseUser?.displayName,
                    email: firebaseUser?.email
                })

                updateUser(firebaseUser.uid)

                router.replace("/(tabs)")
            } else {
                setUser(null)
                router.replace("/(auth)/welcome")
            }
        })

        return () => userState()

    }, [])
    

    const login = async(email: string, password: string) =>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error: any) {
            let msg = error.message
            if(msg.includes("(auth/invalid-credential)")){
                msg = "Wrong email or password...!"
            }

            if(msg.includes("(auth/invalid-email)")){
                msg = "Invalid email...!"
            }

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

            if(msg.includes("(auth/invalid-email)")){
                msg = "Invalid email...!"
            }

            if(msg.includes("(auth/email-already-in-use)")){
                msg = "This email already in use...!"
            }

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