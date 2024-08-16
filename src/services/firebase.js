import { useEffect } from "react";
import { collection, getDocs, doc, updateDoc} from "firebase/firestore";
import db from "../../firebase/config";


export default function firebase({}) {
     const configFirebase = useEffect(()=>{
       const inventarioRef = collection(db, 'Stock');
        getDocs(inventarioRef)
        .then((resp)=>{
          const data = (resp.docs.map((item)=>{
              return { ...item.data() , id: item.id}
            }))
            setInventario(data)
        }).catch((error)=>{
          console.log(error)
        })
       
    },[])
    
    return configFirebase
}
