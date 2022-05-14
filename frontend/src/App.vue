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
  background:url("./assets/architecture.jpg") fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#bandeau {
  width: 50%;
  background-color: #122c668f;
  min-height: 90vh;
}
#articleList, #test{
  display: flex;
  justify-content: center;
  margin: 20px 0 30px 0;
}
#link {
  width: 97%;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  background-color: white;
  cursor: pointer;
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
  text-align: left;
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
  font-size: 1.2em;
  margin: 12px;
}
.commentLength {
  text-align: right;
  margin: 12px;
  padding: 0 15px  0 15px;

}
.content {
  text-align: left;
  font-size: 1em;
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
.contentText textarea {
    height: 30px;
    margin-top : 16px;
    border: none;
    border-radius: 15px;
    box-shadow: #bebebe 1px 1px 5px;
    width: 70%;
    padding: 0 5px 0 10px;
    font-size: 0.9em;
    min-height: 100px;
    max-height: auto;
  }
  .thumbsPost {
    padding-left: 10px;
     font-size: 20px;
     color: #808080;
    border: none;
    cursor: pointer;
  }
  .up {
    padding-bottom : 2px;
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
  border-radius: 8px;
  border: solid 1px #d6d6d6;
  padding: 5px 10px 5px 10px;
  font-size: 1em;
  font-family: sans-serif;
}
textarea {
  resize: none;
  font-family: sans-serif;
}
#addPostText {
  width: 95%;
  height: 125px;
  border-radius: 10px;
  border: solid 1px #d6d6d6;
  padding: 15px;
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
  border-radius: 7px;
  &:hover {
    box-shadow: #888888 1px 1px 5px;
    cursor: pointer;
  }
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

.userContainer {
  display: flex;
  justify-content: center;
}


/* Article Content */
.topPost {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttonList {
  margin-right: 40px;
  & button {
    background-color: white;
    border: none;
    cursor: pointer;
  }
}
.pen {
  font-size: 17px;
  color: #444444;
  &:hover {
    color: black;
  }
}
.trash {
  color: #ff000098;
  font-size: 17px;
  &:hover {
  color: #ff0000;
  }
}

/* Commentaires */
#discussion{
    display: flex;
    align-items: center;
    margin: 0 15px 0 15px;
    #commentaire{
        background-color:rgb(240, 240, 240);
        border-radius: 15px;
        padding: 10px 20px 10px 20px;
        margin: 10px 25px 10px 0;
        display: flex;
        gap: 20px;
        .comment{
            margin: 5px 0 0 0;
            text-align: left;
            font-size: 1.1em;
        }
        #nameComment{
          font-weight: bold;
          font-size: 0.9em;
          margin: 0;
          text-align: start;
        }
    }
}
.top {
    border-top: 1px solid rgba(0, 0, 0, 0.171);
}
.allComment {
    width: 100%;
}
.oneComment {
    width: 100%;
}
#addComment {
    background-color: white;
    width: 30%;
    border-radius: 15px;
}
.avatar_comment {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin: 0 15px 0 15px;
  border-radius: 25px;
}

 .likeandComment {
  border-bottom: 1px solid rgba(0, 0, 0, 0.171);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10% ;
  & p {
    margin: 8px 0 8px 0;
  }
  & button {
   background-color: white;
   border: none;
   cursor: pointer;
   margin-right: 13px;
 }
}
.thumbs {
     font-size: 20px;
    border: none;
    cursor: pointer;
   }
.blue {
    color: #FF0000;
}
.thumbsGrey {
  color: #444444;
}
.buttonLike {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 1.4em;
}
.buttonListComment {
  & button {
    border: none;
    cursor: pointer;
  }
}
.topComment {
  margin-bottom: 5px;
}

#addComment {
  border: none;
  background-color:rgb(240, 240, 240);
  margin: 10px;
  width: 70%;
  min-height: 10px;
  padding: 10px 15px 0 15px;
  font-size: 1.2em;
  &:focus-visible {
    outline: none;
  }

}
.addComment{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px ;
  }
.penComment {
  font-size: 14px;
  color: #444444;
  &:hover {
    color: black;
  }
}
.trashComment {
  color: #ff000098;
  font-size: 14px;
  &:hover {
  color: #ff0000;
  }
}

/*Page de profil */
.profil {
  min-height: 89vh;
}
.titlePP {
  font-size: 1.7em;
  padding-bottom: 20px;
}
.titlePPModify {
  position: absolute;
  left: 27%;
  top: 210px;
  color: #ff0000b2;
}

#photoProfil {
  position: absolute;
  right: 23%;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  & .imagePP {
    width: 170px;
    height: 170px;
    object-fit: cover;
    border-radius: 85px;
    margin: 0 0 15px 0;
  }
  & .modifyPPButton {
    font-size: 15px;
    border: none;
    padding: 5px 15px 5px 15px;
    margin: 5px 10px 20px 10px;
    border-radius: 7px;
    &:hover {
      box-shadow: #888888 1px 1px 5px;
      cursor: pointer;
    }
  }
  & .buttonPP {
    width: 40%;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 15px 5px 15px;
    margin: 15px 10px 20px 10px;
    font-size: 15px;
    &:hover {
      box-shadow: #888888 1px 1px 5px;
      cursor: pointer;
    }
  }
}

#infoUser {
  margin: 60px 0 10px 5%;
  font-size: 1.2em;
  width: 60%;
  display: flex;
  flex-direction: column;
  & .infoProfil {
    display: flex;
    padding-left: 5%;
    justify-content: center;
    & .infoProfilDetail {
      font-weight: bold;
      padding-right: 10px;
    }
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
}
#profilButton {
  text-align: start;
  margin-left: 14%;
  & .profilButton {
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
}
.red {
  background-color: #FF0000;
}
.grey {
  background-color: #a3a3a3;
}


@media screen and (max-width:768px)
{
#formulaire{
  margin: 25% 0 35% 0;
  top: 8%;
  left: 10%;
  width: 80%;
  border-radius: 20px;
  input {
    font-size: 2.5vh;
  }
  button {
    font-size: 3.5vh;
    margin: 0;
  }
}
.textUnderButton {
  font-size: 2.9vh;
  padding: 0 15px 0 15px;
}
h1 {
  font-size: 4vh;
}
}

/* Pagination */
.pagination {
  margin-bottom: 10vh;
  display: flex;
  justify-content: center;
}
</style>