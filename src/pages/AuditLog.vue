<template>
  <div class='space-y-4'>
    <h2 class='text-lg font-semibold'>{{ t('audit.title') }}</h2>
    <AppTable :columns='cols' :rows='rows' :placeholder="t('audit.filterPlaceholder')"/>
  </div>
</template>
<script setup lang="ts">
import AppTable from '../components/AppTable.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
