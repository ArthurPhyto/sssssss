import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config/constants';
import type { Project, RandomURL } from '../types';

const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);

export const projectsCollection = collection(db, 'projects');
export const urlsCollection = collection(db, 'urls');

export const createProject = async (name: string): Promise<Project> => {
  const project = {
    name,
    createdAt: new Date(),
  };
  
  const docRef = await addDoc(projectsCollection, project);
  return { ...project, id: docRef.id };
};

export const getProjectUrls = async (projectId: string): Promise<RandomURL[]> => {
  const q = query(urlsCollection, where("projectId", "==", projectId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as RandomURL));
};

export const deleteUrl = async (urlId: string): Promise<void> => {
  await deleteDoc(doc(urlsCollection, urlId));
};