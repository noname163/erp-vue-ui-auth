<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>Audit Log</h2>
    <AppTable :columns='cols' :rows='rows' placeholder='Filter logs...'/>
  </div>
</template>
<script setup>
import AppTable from '../components/AppTable.vue'
const cols=[
  {key:'date',label:'Date'},
  {key:'screen',label:'Screen'},
  {key:'command',label:'Command'},
  {key:'email',label:'Email'},
  {key:'ip',label:'IP'},
  {key:'agent',label:'User Agent'}
]
const rows=[
  {id:1,date:'2025/10/22 03:02',screen:'Login',command:'Login',email:'dat.huudang+test@agentec.vn',ip:'127.0.0.1',agent:'Chrome'}
]
</script>

