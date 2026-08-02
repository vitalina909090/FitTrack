import { desc, eq } from "drizzle-orm";
import { db } from "../client";
import { NewProgressPhoto, progress_photos } from "../schema";

export const getAllProgressPhotos = () => {
  return db.select().from(progress_photos).orderBy(desc(progress_photos.createdAt));
};

export const insertProgressPhoto = (photo: NewProgressPhoto) => {
  return db.insert(progress_photos).values(photo);
};

export const deleteProgressPhoto = (id: string) => {
  return db.delete(progress_photos).where(eq(progress_photos.id, id));
};

