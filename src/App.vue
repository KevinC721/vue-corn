<template>
  <div id="app">
    <div class="nav">
      <el-row>
        <router-link to="/">
          <el-button type="primary">Corn</el-button>
        </router-link>
        <router-link to="/tree">
          <el-button type="success">Tree</el-button>
        </router-link>
        <router-link to="/treeantx">
          <el-button type="success">treeAntx</el-button>
        </router-link>
      </el-row>
    </div>
    <div class="viewer">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.nav {
  margin-bottom: 50px;
}
</style>
