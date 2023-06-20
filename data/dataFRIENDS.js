import AddFriends from "../models/addFriends";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {auth,db} from "../dbfolder/logdb";
import {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";

export const ADDFRIENDS = [
    new AddFriends('f1', 'https://image.over-blog.com/kV963okN7DDdh932HjBIFA4nA5M=/filters:no_upscale()/image%2F0991136%2F20220626%2Fob_4045db_ahr0chm6ly9jzg4uc2hvcglmes5jb20vcy9maw.jpg', '@claraf'),
    new AddFriends('f2', 'https://image.over-blog.com/kV963okN7DDdh932HjBIFA4nA5M=/filters:no_upscale()/image%2F0991136%2F20220626%2Fob_4045db_ahr0chm6ly9jzg4uc2hvcglmes5jb20vcy9maw.jpg', '@loftinck'),
    new AddFriends('f3', 'https://image.over-blog.com/kV963okN7DDdh932HjBIFA4nA5M=/filters:no_upscale()/image%2F0991136%2F20220626%2Fob_4045db_ahr0chm6ly9jzg4uc2hvcglmes5jb20vcy9maw.jpg', '@alixd'),];

