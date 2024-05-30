<script setup>
import { ref } from "vue";
import { useUrlStore } from "@/stores/urlStore";

const urlStore = useUrlStore();
urlStore.getUrls();
urlStore.addUrl();

const url = ref("");


//this is a confirm push id to storeBase
const handleSubmit = () => {
  urlStore.addUrl(url.value);
};

let selectitem = ref(null)
//this delete all objet
const confirm = (id) => {
  urlStore.deleteUrl(id);
};

//this cancel dont work
const cancel = () => { };

const open = ref(false);


const showModal = async (item) => {
  open.value = true;
  selectitem = item
};

const handleOk = (e) => {
  open.value = false;
};

</script>

<template>
  <a-layout class="organizar">
    <a-layout-content style="padding: 0 50px; width: 100%">
      <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
        <a-list>
          <img :src="selectitem.imagen" alt="" width="300"> {{ selectitem.title }} {{ selectitem.description }}
          <hr>
          <a-popconfirm title="estas seguro que quieres eliminar este video?" ok-text="Si" cancel-text="No"
            @confirm="confirm(selectitem.id)" @cancel="cancel">
            <a-button danger>Eliminar</a-button>
          </a-popconfirm>
          <hr>
        </a-list>
      </a-modal>

      <!--  <img :src="item.imagen" alt="" width="200" /> -->
      <p>Add Video</p>

      <form @submit.prevent="handleSubmit">
        <a-input type="text" placeholder="Add Url" v-model:value="url" style="width: 200px" />
        <a-button type="primary" html-type="submit">Agregar</a-button>
      </form>


      <a-list gap="middle" vertical>
        <a-list-item v-for="item of urlStore.documents" :key="item.id">
          <img :src="item.imagen" alt="" width="200" @click="showModal(item)"></img>
        </a-list-item>
      </a-list>
    </a-layout-content>
  </a-layout>
</template>

<style>
.organizar {
  display: flex;
  justify-content: flex-start;
  width: 96vw;
  height: 99vh;
  flex-wrap: nowrap;
  flex-direction: column;
}

.size {
  height: 4%;
  border-radius: 20%;
  display: flex;
}
</style>
