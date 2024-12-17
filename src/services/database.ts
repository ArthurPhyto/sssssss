import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { Project, RandomURL, TargetURL } from '../types';

// Collections
const COLLECTIONS = {
  PROJECTS: 'projects',
  URLS: 'urls',
} as const;

// Projects
export const createProject = async (name: string): Promise<Project> => {
  const projectData = {
    name,
    createdAt: new Date(),
  };
  
  const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), projectData);
  return { ...projectData, id: docRef.id };
};

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.PROJECTS));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
};

// URLs
export const createRandomUrl = async (
  projectId: string,
  path: string,
  targets: Omit<TargetURL, 'id'>[]
): Promise<RandomURL> => {
  const urlData = {
    projectId,
    path,
    targets: targets.map((target, index) => ({ ...target, id: `target-${index}` })),
    createdAt: new Date(),
  };
  
  const docRef = await addDoc(collection(db, COLLECTIONS.URLS), urlData);
  return { ...urlData, id: docRef.id };
};

export const getProjectUrls = async (projectId: string): Promise<RandomURL[]> => {
  const q = query(
    collection(db, COLLECTIONS.URLS),
    where("projectId", "==", projectId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as RandomURL));
};

export const updateUrlTargets = async (
  urlId: string,
  targets: TargetURL[]
): Promise<void> => {
  const urlRef = doc(db, COLLECTIONS.URLS, urlId);
  await updateDoc(urlRef, { targets });
};

export const deleteUrl = async (urlId: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTIONS.URLS, urlId));
};