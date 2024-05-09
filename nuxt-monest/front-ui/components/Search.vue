<script setup lang="ts">

const fiches = ref([])

async function fetchData() {
  fiches.value = await fetch('http://localhost:3001/currencies').then(result => result.json())
}


</script>

<template>
  <div id="search-form" class="card">
    <div class="card form-container">
      <label class="one" for="genre">Genre:</label>
      <InputText class="one" id="genre" />
      <label class="two" for="type">Type:</label>
      <InputText class="two" id="type" />
      <label for="vf">Valeur faciale:</label>
      <InputText id="vf" />
      <label for="localite">Localité:</label>
      <InputText id="localite" />
      <div class="card button-panel">
        <Button style="grid-column: 2" @click="fetchData" label="Rechercher" icon="pi pi-search" />
        <Button style="grid-column: 3" class="btn-red" label="Réinitialiser" icon="pi pi-times" />
      </div>
    </div>


  </div>
  <div class="card">
    <DataTable :value="fiches" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 25, 50, 100]" size="small">
      <Column field="id" header="ID" sortable></Column>
      <Column field="genre" header="Genre" sortable></Column>
      <Column field="type" header="Type" sortable></Column>
      <Column field="valeurFaciale" header="Valeur Faciale" sortable></Column>
      <Column field="localite" header="Localité" sortable></Column>
      <Column field="attribution" header="Attribution" sortable></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.button-panel {
  display: flex;
  justify-content: right;
  grid-column: 4;
  grid-row: 3;
}

Button {
  margin-right: 2px;
  min-width: fit-content;
}

label {
  text-align: right;
  padding-top: 6px;
  margin-right: 4px;
}

.btn-red {
  background: var(--red-400);
  border-color: var(--red-700);
}

.btn-red:hover {
  background: var(--red-500);
  border-color: var(--red-700);
}

.form-container {
  max-width: 70%;
  display: grid;
  justify-content: space-evenly;
  grid-template-rows: repeat(4, 10%);
  grid-template-columns: repeat(2, max-content 40%);
}

.one {
  grid-row: 1;
}

.two {
  grid-row: 2;
}

.three {
  grid-row: 3;
}

.four {
  grid-row: 4;
}
</style>
