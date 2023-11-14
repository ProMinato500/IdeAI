import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ideai-370eb.firebaseapp.com",
  projectId: "ideai-370eb",
  storageBucket: "ideai-370eb.appspot.com",
  messagingSenderId: "573607852888",
  appId: "1:573607852888:web:dd2ab7a144d63b432b032d",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    console.log(image_url);
    const response = await fetch(image_url);
    console.log("fetched");
    const buffer = await response.arrayBuffer();
    console.log("buffered");
    const file_name = name.replace(" ", "") + Date.now + ".jpeg";
    const storageRef = ref(storage, file_name);
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    console.log("uploading..");
    const firebase_url = await getDownloadURL(storageRef);
    console.log("uploaded");
    return firebase_url;
  } catch (error) {
    console.error(error);
  }
}
