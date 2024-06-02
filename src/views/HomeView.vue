<script setup>
import { ref, watch } from "vue";
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
  open.value = false;

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
            @confirm="confirm(selectitem.id)" @cancel="cancel" >
            <img src="../assets/delete.png" alt="" width="25">
          </a-popconfirm> 
        </a-list>
      </a-modal>

      <!--  <img :src="item.imagen" alt="" width="200" /> -->

      <form @submit.prevent="handleSubmit" class="margin">
        <h1>Agregar un video</h1>
        <a-input type="text" placeholder="Add Url" v-model:value="url" style="width: 500px" />
        <a-button type="primary" html-type="submit" >Agregar</a-button>
      </form>


      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }">
        <a-row>
          <a-list-item v-for="item of urlStore.documents" :key="item.id">
            <img :src="item.imagen" alt="" width="300" @click="showModal(item)"></img>
          </a-list-item>
        </a-row>
      </a-list>
    </a-layout-content>
  </a-layout>
</template>

<style>
.margin {
  margin-bottom: 5%;
  margin-top: 3%
}

.organizar {
  display: flex;
  justify-content: flex-start;
  width: 97vw;
  height: 100vh;
  flex-wrap: nowrap;
  flex-direction: column;
}

.size {
  height: 4%;
  border-radius: 20%;
  display: flex;
}

.espacio {
  width: 50%;
  display: flex;
  position: relative;
}
</style>
