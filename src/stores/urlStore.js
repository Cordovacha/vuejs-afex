import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfing";
import { tubeApi } from "../request/youtubeApi";

export const useUrlStore = defineStore("Urls", {
  state: () => ({
    documents: [],
  }),
  actions: {
    async getUrls() {
      try {
        const q = query(collection(db, "urls"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async addUrl(id) {
      try {
        if (id === undefined) {
          return;
        }

        const { description, title, img } = await tubeApi(id);
        const objetoDoc = {
          imagen: img,
          title: title,
          description: description,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
        this.$documents.$reset()
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        await deleteDoc(docRef);

        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
//
//codigo para buscar por url directo.
/* const regularExpresion =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
const isYoutubeVideo = regularExpresion.test(url);
console.log(url);

if (!isYoutubeVideo) return; */
