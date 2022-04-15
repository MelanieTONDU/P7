<template>
  <div class="home">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

form{
  position: absolute;
  top: 35%;
  left: 35%;
  background-color: white;
  width: 30%;
  border-radius: 26px;
  .form-group{
    padding: 8px;
  }
  input {
    width: 80%;
    height: 2em;
    border-radius: 10px;
    border: none;
    padding-left: 25px;
    background-color: #f2f2f2;
    font-size: 16px;
  }
  button {
    background-color: #FF0000;
    font-size: 22px;
    color: white;
    border: none;
    padding: 5px 15px 5px 15px;
    margin: 15px 0 20px 0;
    border-radius: 10px;
  }
  .link{
    text-decoration: none;
    color: #ff00009d;
    font-weight: bold;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
