<template>
  <div>
    <p>Publication</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PostView',
  beforeCreate() {
    axios.get("http://localhost:3000/api/article")
      .then(response => {
      console.log(response.data)
    })
  }
}

</script>

<style scoped lang="scss">

</style>