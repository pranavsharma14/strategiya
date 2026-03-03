import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { FormData } from "../components/StepForm/StepForm";

export async function submitIdea(data: FormData) {
  try {
    console.log("Saving to Firebase:", data);

    const docRef = await addDoc(collection(db, "ideas"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new"
    });

    console.log("Document saved:", docRef.id);

    return true;
  } catch (error) {
    console.error("Firebase Error:", error);
    return false;
  }
}