<script setup lang="ts">

const items = ref([
  { label: 'Recherche', icon: 'pi pi-search' },
  { label: 'Fiche', icon: 'pi pi-file' },
  { label: 'Tableau de bord', icon: 'pi pi-chart-pie' },
  { label: 'Options', icon: 'pi pi-cog' }
]);

const activeId = ref(0)

const toast = useToast()

const toastMessage = (severity: any, summary: string, content: string) => {
  toast.add({ severity: severity, summary: summary, detail: content, life: 3000 });
};

</script>

<template>
  <Toast position="bottom-right" />
  <div class="card">
    <TabMenu v-model:activeIndex="activeId" :model="items" />
  </div>
  <Search v-if="activeId == 0"
    @toast-success="(severity: any, summary: string, content: string) => toastMessage(severity, summary, content)" />
  <Currency v-if="activeId == 1" />
</template>
