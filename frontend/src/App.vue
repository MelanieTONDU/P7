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
}
.center {
  display: flex;
  align-items: center;
}
.forum{
  background:url("./assets/architecture.jpg") fixed;
  min-height: 89vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bandeau {
  width: 50%;
  background-color: #122c668f;
  min-height: 90vh;
  justify-content: center;
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

// Info User //
.infoUser {
  display: flex;
  padding: 10px 10px 0 10px;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.avatar_post {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40px;
  margin: 0 15px 0 15px;
}
.name {
  font-weight: bold;
  font-size: 1em;
  margin: 0;
  text-align: left;
}
.date{
  font-size: 0.9em;
  margin: 0;
}

//-------------- Forum text et multimedia --------------//

// Ajouter un article //
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
  background-color: #ed0303;
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

// Post List //
.articleList{
  display: flex;
  justify-content: center;
  margin: 20px 0 30px 0;
}
.lien {
  width: 97%;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  background-color: white;
  cursor: pointer;
  & .topAddPost {
    justify-content: center;
  }
  & .addPost {
    justify-content: center;
  }
}
.title {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom : 10px
}
.content {
  text-align: left;
  font-size: 1em;
  padding: 0 7% 20px 7%;
}
.image {
  width: 80%;
  padding-bottom: 20px;
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
// Pagination //
.pagination {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  & .textPagination {
    color: white;
    padding: 10px;
    font-size: 20px;
    margin: 0;
  }
  & .buttonPagination {
    background: none;
    color: white;
    border: none;
    font-size: 20px;
    &:hover {
      cursor: pointer;
      background: #80808054;
      border-radius: 15px;
    }
  }
}
.paginationContainer {
  display: flex;
  justify-content: center;
}
.textPaginationComment {
  color: black;
}
.buttonPaginationComment {
  color: rgb(71, 71, 71);
  background: none;
  border: none;
  font-size: 1em;
  font-weight: bolder;
  padding:  10px;
  width: 60%;
  border-top : 1px solid rgba(226, 226, 226, 0.658);
  &:hover {
    cursor: pointer;
    background-color: #eeeeee5d;
  }
}

// ---------------- ONE ARTICLE ------------------//
/* Article Content */
.publication {
  box-shadow: #c4c4c4 1px 1px 3px;
  border-radius: 10px;
  width: 95%;
  text-decoration: none;
  flex-direction: column;
  color: black;
  background-color: white;
  margin: 20px;
}
#article {
  width: 100%;
  margin-top : 10px;
}
.topPost {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#titleOnePost {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom : 10px
}
.imageArticle {
  width: 80%;
}
.imageContent {
  width: 100%;
}
// Modify and Delete //
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
#contentText textarea {
  height: 30px;
  margin-top : 16px;
  border: none;
  border-radius: 15px;
  box-shadow: #bebebe 1px 1px 5px;
  width: 70%;
  padding: 0 5px 0 10px;
  font-size: 1.2em;
  min-height: 100px;
}

// Like //
.like {
  border-bottom: 1px solid rgba(0, 0, 0, 0.171);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10% ;
}
.thumbs {
  height: 20px;
  width: 25px;
  border: none;
  cursor: pointer;
}
.blue {
  color: rgb(36, 36, 230);
}
.buttonLike {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 1.1em;
  background-color: white;
  border: none;
  cursor: pointer;
  margin: 0 13px 10px 0;
}
.buttonListComment {
  & button {
    border: none;
    cursor: pointer;
  }
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

// Commentaires //
.numberComment {
  margin: 10px 0 5px 0;
  font-weight: bolder;
}
.allComment {
  width: 100%;
}
.oneComment{
  display: flex;
  align-items: center;
  margin: 0 15px 0 15px;
  width: 100%;
}
.avatar_comment {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin: 0 15px 0 15px;
  border-radius: 25px;
}
.commentaire{
  background-color:rgb(240, 240, 240);
  border-radius: 15px;
  padding: 10px 20px 10px 20px;
  margin: 10px 25px 10px 0;
  display: flex;
  gap: 20px;
}
.comment{
  margin: 5px 0 0 0;
  text-align: left;
  font-size: 1.1em;
}

// Add Comment //
.addComment{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 15px 15px ;
}
.addCommentText {
  border: none;
  background-color:rgb(240, 240, 240);
  margin: 10px;
  width: 70%;
  padding: 10px 15px 0 15px;
  font-size: 1.2em;
  border-radius: 30px;
  font-family: sans-serif;
}

// ------------------PAGE DE PROFIL ------------------//
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
.user {
  width: 60%;
  background-color: white;
  box-shadow: #4e4e4e 1px 1px 5px;
  border-radius: 20px;
  margin: 20px 0 20px 0;
  padding: 20px 40px 40px 40px;
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

//----------------------- ADMIN ---------------------------//
#bandeauAdmin {
  width: 70%;
  background-color: #122c668f;
  min-height: 89vh;
  & .listPublicationAdmin {
    flex-direction: column;
    margin: 0 0 25px 0;
  }
  & .list {
    color: black;
    font-size: 2em;
    width: 95%;
    background-color: rgb(255, 255, 255);
    margin: 0 10px 0 10px;
    border-top: 1px solid rgb(238, 238, 238);
    & p {
      margin: 0;
      font-size: 0.5em;
      padding: 0 10px 0 10px;
    }
    & .contentAdmin {
      overflow: hidden ;
      text-overflow: ellipsis;
      height: max-content;
      text-align: justify;
      padding-top: 5px;
    }
  }
}
.listTitle {
  margin: 25px 10px 25px 10px;
  color: black;
  width: 95%;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  & p {
    border-right: 1px solid black;
  }
}
.visibleAdmin, .visible {
  width: 5%;
}
.nameAdmin {
  width : 14%;
}
.titleAdmin {
  font-weight: bold;
}
.postContentAdmin {
  width: 66%;
  padding: 10px;
}
.dateAdmin {
  width: 9%;
}
.IconCross {
  color: red;
}
.IconCheck {
  color: rgb(2, 179, 49);
}
.visible {
  justify-content: center;
}
.buttonAdmin {
  border: none;
  border-radius: 3px;
  font-weight: bold;
  height: 25px;
  &:hover {
    cursor: pointer;
    background-color: rgb(209, 246, 218);
  }
}
.imageAdmin {
  height: 200px;
}
#publicationAdmin {
  box-shadow: #c4c4c4 1px 1px 3px;
  border-radius: 10px;
  width: 95%;
  text-decoration: none;
  flex-direction: column;
  color: black;
  background-color: white;
  margin: 20px;
}

// Comment Admin //
.publicationStatusContainer {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  padding: 30px 30px 0 30px;
}
.buttonVisible {
  height: 40px;
  border: none;
  font-size: 1em;
  background-color: white;
  color: #525252bd;
  width: 35%;
  & .IconEye {
    padding-right: 10px;
  }
  &:hover {
    cursor: pointer;
  }
}
.green:hover {
  color: rgb(2, 179, 49);
}
.red:hover {
  color: #ff0000b2;
}
.publicationStatus {
  display: flex;
  padding-left: 15px;
  gap: 20px;
  background-color: rgba(209, 246, 218, 1);
  width: 25%;
  font-weight: bold;
}
.allCommentAdmin {
  width: 100%;
}
.commentContainerAdmin {
  width: 100%;
  gap: 20px;
  border-top: 1px solid rgb(245, 245, 245);
  padding: 0 20px 0 20px;
}
.numberCommentAdmin {
  padding-top: 10px ;
  font-weight: bold;
}
.commentAdmin {
  width: 45%;
}
.nameAdmin {
  width : 14%;
}
.postContentAdmin {
  width: 66%;
  padding: 10px;
} 
#imageAdmin {
  width: 70%;
}

//---------------- RESPONSIVE ------------------//
@media screen and (max-width:768px) {
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
}}
</style>