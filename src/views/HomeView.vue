<script setup>
import { ref, watchEffect } from "vue";
import { useUrlStore } from "@/stores/urlStore";

const data = ref("")

const urlStore = useUrlStore();
console.log(useUrlStore());
urlStore.getUrls();
urlStore.addUrl();
urlStore.$state.documents
const url = ref("");
let selectedItem = ref(null);

//this is a confirm push id to storeBase
const handleSubmit = () => {
  urlStore.addUrl(url.value);
};

//this delete all objet
const confirm = (id) => {
  urlStore.deleteUrl(id);
};

//this cancel dont work
const cancel = () => { };

const open = ref(false);

const showModal = async (item) => {
  open.value = true;
  selectedItem = item;
};

const handleOk = (e) => {

  open.value = false;
};
watchEffect(async () => {
  if (open.value) {
    data.value = urlStore.documents;
    console.log(urlStore);
    console.log(data.value);
  }
});
</script>

<template>
  <a-layout class="organizar">
    <a-layout-content style="padding: 0 50px; width: 100%">
      <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
        <!--  <img :src="item.imagen" alt="" width="200" /> -->
        <hr />
        <!-- {{ urlStore.documents }} -->
        <hr />
        {{ selectedItem.imagen }}
      </a-modal>

      <p>Add Video</p>

      <form @submit.prevent="handleSubmit">
        <a-input type="text" placeholder="Add Url" v-model:value="url" style="width: 200px" />
        <a-button type="primary" html-type="submit">Agregar</a-button>
      </form>

      <a-list>
        <a-list-item v-for="item of urlStore.documents" :key="item.id">
          <img :src="item.imagen" alt="" width="200" @click="showModal(item)" />

          <a-popconfirm title="estas seguro que quieres eliminar este video?" ok-text="Si" cancel-text="No"
            @confirm="confirm(item.id)" @cancel="cancel">
            <a-button danger>Eliminar</a-button>
          </a-popconfirm>
        </a-list-item>
      </a-list>
    </a-layout-content>
  </a-layout>
</template>

<style>
.organizar {
  display: flex;
  justify-content: flex-start;
  width: 220%;
  flex-wrap: nowrap;
  flex-direction: column;
}

.size {
  height: 4%;
  border-radius: 20%;
  display: flex;
}
</style>
