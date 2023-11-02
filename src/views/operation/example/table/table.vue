<template>
  <div class="table-container">
    <el-table
      fit
      border
      highlight-current-row
      :data="tableData"
    >
      <el-table-column type="index" label="index" min-width="60" align="center" />
      <el-table-column prop="id" label="ID" min-width="60" align="center" />
      <el-table-column prop="title" label="Title" min-width="150" align="center"/>
      <el-table-column prop="author" label="Author" min-width="70" align="center"/>
      <el-table-column prop="pageViews" label="PageViews" min-width="120" align="center" />
      <el-table-column prop="status" label="status" min-width="60" align="center" >
        <template v-slot="{row}">
          <el-tag
            v-if="row.status === 'draft'"
            type="warning"
          >
            {{ row.status }}
          </el-tag>
          <el-tag
            v-if="row.status === 'published'"
            type="success"
          >
            {{ row.status }}
          </el-tag>
          <el-tag
            v-if="row.status === 'deleted'"
            type="danger"
          >
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="display_time" label="Display_time" min-width="130" align="center" >
        <template v-slot="{ row }">
          <el-icon><Timer/></el-icon>
          <span>{{ row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import { getTableData } from '@/apis/example/table'
import type { TableItemResponse } from '@/apis/example/table/types' 

const tableData: TableItemResponse = reactive([])
let total = ref(0)
onMounted(() => {
  getTableData((data) => {
    tableData.push(...data.data)
    total.value = data.total
  })
})
</script>

<style lang="scss" scoped>
.table-container {
  overflow: auto;
}
</style>
