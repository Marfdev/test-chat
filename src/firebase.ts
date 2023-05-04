import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, getMetadata, getStorage, ref as fireRef, uploadBytes,  }from "firebase/storage";
import { ref, computed, onUnmounted } from 'vue';
import router from './router';



const config = {
    
    apiKey: "AIzaSyCWk-1yDi9d4N0GI8AcH9BQLgupIHgAqlo",
    authDomain: "chat-test-f395e.firebaseapp.com",
    projectId: "chat-test-f395e",
    storageBucket: "chat-test-f395e.appspot.com",
    messagingSenderId: "138233771546",
    appId: "1:138233771546:web:763c88dc609ffeeba543a3",
    measurementId: "G-VEB330N5VZ"
}
initializeApp(config);

const auth = getAuth();

export const useAuth = () => {
    const user = ref();
    const unsubscribe = auth.onAuthStateChanged(_user => {
        user.value = _user;
    });
    onUnmounted(unsubscribe);
    const isAuthenticated = computed(() => user.value !== null);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            localStorage.setItem('token', token as string);
            router.push('/');
        }).catch((error) => {
            alert(`there has been an error while trying to log-in: ${error}`);
        });
    }
    
    const signOut = async () => {
        await auth.signOut().then(() => {
            localStorage.removeItem('token');
            router.push('/login');
        }).catch((error) => {
            alert(`there has been an error while trying to log-out: ${error}`);
        });
    }

    return { user, isAuthenticated, signIn, signOut };
}

const store = getFirestore();
const messagesCollection = collection(store, 'messages');
const messagesQuery = query(messagesCollection, orderBy('serverTimestamp'), limit(100))

export const useMessages = () => {
    const messages = ref();
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        messages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
    onUnmounted(unsubscribe);
    const {user, isAuthenticated} = useAuth();

    const addAssignmentMessage = async (assignment : {
        name: string,
        size: number,
        type: string,
        url: string
    } ) => {
        if (isAuthenticated.value) {
            const {uid, displayName} = user.value;
            await addDoc(messagesCollection, {
                type: 'assignment',
                assignment,
                versionNumber: parseInt(new Date().getTime().toString()),
                createdAt: dateAndTime(),
                serverTimestamp: serverTimestamp(),
                uid: uid,
                displayName: displayName,
            });
        }else{
            alert('you need to be logged-in to perform this action');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }

    const addMessage = async (text :string) => {
        if (isAuthenticated.value) {
            const {uid, displayName, photoURL} = user.value;
            await addDoc(messagesCollection,{
                type: 'text',
                text,
                createdAt: dateAndTime(),
                serverTimestamp: serverTimestamp(),
                uid: uid,
                displayName: displayName,
                photoURL: photoURL
            });
        }else{
            alert('you need to be logged-in to perform this action');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }
    return { messages, addMessage, addAssignmentMessage };
}

const storage = getStorage();

export const useStorage = () => {
    const {isAuthenticated} = useAuth();
    const addFile = async (file : File) => {
        if (isAuthenticated.value) {
            const storageRef = fireRef(storage, `files/${file.name}-${new Date().getTime().toString()}`);
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef);
            const metadata = await getMetadata(storageRef);
            return{url, metadata};
        }else{
            alert('you need to be logged-in to perform this action');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }
    return { addFile };
}

const dateAndTime = () => {
    const date = new Date()
    const datetime = date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear() + " · "  
                + (date.getHours()<10?'0':'') + date.getHours() + ":"  
                + (date.getMinutes()<10?'0':'') + date.getMinutes();
    return datetime;
}

 