<template>
    <router-view/>
</template>

<style lang="scss">
$primary : #ff00009d;
*{
    box-sizing: border-box; 

}
body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// css signup et login //
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
}

//css Forum text et multimedia //
#forum{
  background: linear-gradient(to top, rgba(235, 22, 36, 0.87), rgba(1, 17, 86, 0.911));
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
}
#bandeau {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.178);
  min-height: 90vh;
}
#articleList, #test{
  display: flex;
  justify-content: center;
  margin: 40px 0 40px 0;
}
#link {
  width: 95%;
  box-shadow: #4e4e4e 1px 1px 5px;
  border-radius: 20px;
  text-decoration: none;
  color: black;
  background-color: white;
}
.avatar_post {
  width: 90px;
  object-fit: contain;
  padding: 0 15px 0 15px;
}
.infoUser {
  display: flex;
  padding: 10px;
}
#name {
  font-weight: bold;
  font-size: 1em;
  margin: 0;
}
#title {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 0;
}
.date{
  font-size: 0.9em;
  margin: 0;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.commentLength {
  text-align: right;
  padding: 15px 15px 0 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.171);

}
.content {
  text-align: left;
  font-size: 1.2em;
  padding: 0 7% 20px 7%;
}
</style>