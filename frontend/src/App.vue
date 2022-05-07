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
#formulaire{
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
.forum{
  background: linear-gradient(to top, rgba(235, 22, 36, 0.87), rgba(1, 17, 86, 0.911));
  display: flex;
  flex-direction: column;
  align-items: center;
}
#bandeau {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.178);
  min-height: 90vh;
}
#articleList, #test{
  display: flex;
  justify-content: center;
  margin: 20px 0 40px 0;
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
#avatar_post {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40px;
  margin: 0 15px 0 15px;
}

.infoUser {
  display: flex;
  padding: 10px 10px 0 10px;
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
.likeComment {
  border-top: 1px solid rgba(0, 0, 0, 0.171);
  display: flex;
  justify-content: flex-end;
}
.likeLength {
  text-align: right;
  padding: 15px 15px 0 15px;
}
.commentLength {
  text-align: right;
  padding: 15px 15px 0 15px;
}
.content {
  text-align: left;
  font-size: 1.2em;
  padding: 0 7% 20px 7%;
}
.user {
    width: 60%;
    background-color: white;
    box-shadow: #4e4e4e 1px 1px 5px;
    border-radius: 20px;
    margin: 20px 0 20px 0;
    padding: 20px 40px 40px 40px;
}
/* Ajouter un article */
.center {
  display: flex;
  justify-content: center;
}
h2 {
  font-size: 1.5em;
  margin: 10px 0 0 0;
  padding-bottom: 7px;
  border-bottom: #e0e0e0 solid 1px;
  width: 95%;
}
#addPostContent {
  flex-direction: column;
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: center;

}
#addPostTitle {
  width: 80%;
  height: 30px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: solid 1px #d6d6d6;
  padding: 5px 10px 5px 10px;
  font-size: 1em;
  font-family: sans-serif;
}
textarea {
  resize: none;
}
#addPostText {
  width: 95%;
  height: 125px;
  border-radius: 30px;
  border: solid 1px #d6d6d6;
  padding: 15px;
  font-size: 1.2em;
  font-size: 1em;
  font-family: sans-serif;

}
.message {
  margin: 15px 0 0 0;
  color: #ff0000cb;
}
#buttonPublier {
  background-color: #FF0000;
  font-size: 20px;
  color: white;
  border: none;
  padding: 5px 15px 5px 15px;
  margin: 5px 0 10px 0;
  border-radius: 15px;
  &:hover {
    box-shadow: #888888 1px 1px 5px;
    cursor: pointer;
  }
}
#modify {
  background-color: #7e7e7e;
}
#delete {
  background-color: #FF0000;
  font-size: 18px;
  color: white;
  border: none;
  padding: 5px 15px 5px 15px;
  margin: 15px 0 20px 0;
  border-radius: 10px;
}
p span {
  font-weight: bold;
}
.avatarProfil {
  position: absolute;
  left: 27%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  }

.avatarProfilImg {
    width: 150px;
    margin-bottom: 10px;
}
.userContainer {
  display: flex;
  justify-content: center;
}
.infoProfil {
  margin: 110px 0 50px 0;
  font-size: 1.2em;
  margin-left: 30%;
  display: flex;
  flex-direction: column;
}
.titlePage {
  font-size: 1.7em;
  padding-bottom: 20px;
}
.profil {
  min-height: 88vh;
}
.name {
  display: flex;
  padding-left: 5%;
  & input {
    height: 30px;
    margin-top : 16px;
    border: none;
    border-radius: 15px;
    box-shadow: #bebebe 1px 1px 5px;
    width: 60%;
    padding: 0 5px 0 10px;
    font-size: 0.9em;
  }
}
#imageProfil {
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 85px;
  margin: 0 0 15px 0;
}
.nameClass {
  font-weight: bold;
  padding-right: 10px;
}
.titleModify {
  position: absolute;
  left: 40%;
  top: 250px;
  color: #ff0000b2;
}
.button {
  font-size: 18px;
  color: white;
  border: none;
  padding: 5px 15px 5px 15px;
  margin: 15px 10px 20px 10px;
  border-radius: 10px;
  &:hover {
    box-shadow: #888888 1px 1px 5px;
    cursor: pointer;
  }
}
.red {
  background-color: #FF0000;
}
.grey {
  background-color: #868686;
}

</style>