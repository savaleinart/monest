<script setup lang="ts">

const fiches = ref([])
const legendeChips: Ref<string[]> = ref([])
const descriptionChips: Ref<string[]> = ref([])

async function fetchData() {
  fiches.value = await fetch('http://localhost:3001/currencies').then(result => result.json())
}

//Une recherche / Identification de monnaie se fait sur les points suivants = 
//Attribution / Localité / Légende Avers / Description Avers / Légende Revers / Description Revers / Réf. Ouvrage / Observation

function addLegChip() {
  legendeChips.value.push(legendeChips.value[0])
  legendeChips.value[0] = ""
}

function addDescChip() {
  descriptionChips.value.push(descriptionChips.value[0])
  descriptionChips.value[0] = ""
}

function resetForm() {
  legendeChips.value = []
  descriptionChips.value = []
}
</script>

<template>
  <div id="search-form" class="card">
    <div class="card form-container">

      <label for="attribution">Attribution:</label>
      <InputText id="attribution" />

      <label for="localite">Localité:</label>
      <InputText id="localite" />

      <label for="legende">Légende:</label>
      <div>
        <InputText id="legende" v-model="legendeChips[0]" @keyup.enter="addLegChip" />
        <Chip v-show="i != 0" v-for="(txt, i) in legendeChips" :key="i" :label="txt" removable />
      </div>

      <label for="ref">Réf. Ouvrage:</label>
      <InputText id="ref" />

      <label for="description">Description:</label>
      <div>
        <InputText id="description" v-model="descriptionChips[0]" @keyup.enter="addDescChip" />
        <Chip v-show="i != 0" v-for="(txt, i) in descriptionChips" :key="i" :label="txt" removable />
      </div>


      <label for="observation">Observation:</label>
      <InputText id="observation" />


      <div class="card button-panel four">
        <Button style="grid-column: 2" @click="fetchData" label="Rechercher" icon="pi pi-search" />
        <Button style="grid-column: 3" @click="resetForm" severity="danger" label="Réinitialiser" icon="pi pi-times" />
      </div>
    </div>


  </div>
  <div class="card">
    <DataTable :value="fiches" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 25, 50, 100]" size="small">
      <Column field="id" header="ID" sortable></Column>
      <Column field="attribution" header="Attribution" sortable></Column>
      <Column field="localite" header="Localité" sortable></Column>
      <Column field="legendeA" header="Légende avers" sortable></Column>
      <Column field="descriptionA" header="Description avers" sortable></Column>
      <Column field="legendeR" header="Légende revers" sortable></Column>
      <Column field="descriptionR" header="Description revers" sortable></Column>
      <Column field="ref" header="Réf. Ouvrage" sortable></Column>
      <Column field="observation" header="Observation" sortable></Column>

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
  text-align: left;
  padding-top: 6px;
  margin-right: 4px;
  margin-left: 12px;
}

.form-container {
  max-width: 70%;
  display: grid;
  grid-template-rows: repeat(6, 10%);
  grid-template-columns: repeat(2, max-content auto);

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
