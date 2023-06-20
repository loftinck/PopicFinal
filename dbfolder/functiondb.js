import {doc, setDoc, getDocs, collection, getDoc} from "firebase/firestore";
import {db} from "./logdb";
import {useState} from "react";



export async function SignUpdb(db, email,username, uid,nom,prenom,age) {
    console.log('TEST OK');
    await setDoc(doc(db, "users", uid ), {
        id: uid,
        nom: nom,
        prenom: prenom,
        username: '@' + username,
        age: age,
        points: 0,
        friends: [],
        demandsfriends: [],
        email: email,
        ppurl: 'https://firebasestorage.googleapis.com/v0/b/po-pic.appspot.com/o/blank-profile-picture-gee95b6fdc_1280.png?alt=media&token=e82d0a38-8759-47c9-843a-1842a5df78ea',
    })}

export async function SignUpdb2(db,uid, username) {
    console.log('TEST OK');
    await setDoc(doc(db, "addfriends", "@" + username ), {
        id: uid,

    })}


export const findOne = async (id) => {
    const d = await getDoc(doc(db, 'users', id))
    const [blogs,setBlogs]=useState([])
    d.data().forEach(item=>{
        setBlogs([...blogs,item.data()])})
    console.log(blogs);
    return blogs;
}
