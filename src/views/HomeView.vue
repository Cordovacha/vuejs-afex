<script setup>
import { ref } from "vue";
import { useUrlStore } from "@/stores/urlStore";

const urlStore = useUrlStore();

urlStore.getUrls();
urlStore.addUrl();

const url = ref("");

const handleSubmit = () => {
  console.log(url.value);
  urlStore.addUrl(url.value);
};

const confirm = (id) => {
  urlStore.deleteUrl(id);
};
const cancel = () => { };

const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = e => {
  console.log(e);
  open.value = false;
};

</script>

<template>
   <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
            <img :src="item.imagen" alt="" width="100">

            {{ item.title }}

            {{ item.description }}
          </a-modal>

  <a-layout class="organizar">
    <a-layout-content style="padding: 0 50px; width: 100%;">
      <p>Add Video</p>

      <form @submit.prevent="handleSubmit">
        <a-input type="text" placeholder="Add Url" v-model:value="url" style="width: 200px" />
        <a-button type="primary" html-type="submit">Agregar</a-button>
      </form>
      <a-list>
        <a-list-item v-for="item of urlStore.documents" :key="item.id"
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="data">

          <img :src="item.imagen" alt="" width="200" @click="showModal">
         
          </img>

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
