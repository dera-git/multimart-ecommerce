import { useEffect, useState } from 'react'
import { db } from '../firebase.confing'
import { collection, onSnapshot } from 'firebase/firestore'

const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const collectionRef = collection(db, collectionName)

    const getData = async () => {

        // ====== firebase firestore realtime data update
        await onSnapshot(collectionRef, snapshot => {
            setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        })

    }

    useEffect(() => {
        getData()
    }, [])

    return { data, loading, setData, getData }
}

export default useGetData