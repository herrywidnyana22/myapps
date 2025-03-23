
import { collection,  onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/config/firebase'

const useData = <T>(
    collectionName: string,
    constraints: QueryConstraint[] =[]
) => {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() =>{
        if(!collectionName) return
        
        const collectionRef = collection(db, collectionName)
        const q = query(collectionRef, ...constraints)

        const action = onSnapshot(q, (snapshot) =>{
            const getData = snapshot.docs.map(doc => {
                return{
                    ...doc.data(),
                    id: doc.id,
                }
            }) as T[]

            setData(getData)
            setIsLoading(false)
        }, (err) =>{
            setError(err.message)
        })

        return () => action()
    }, [])

    return {data, isLoading, error}
}

export default useData