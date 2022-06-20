<template>
  <router-view/>
</template>

<style lang="scss">
$red : #FD2D01;
$darkRed : #ff000098;
$bandeauColor : #122c668f;
$inputColor : #f2f2f2;
$buttonRed : #ec0000;
$grey : rgb(87, 87, 87);
$borderLine : #e0e0e0;
$shadow : #888888;
$backgroundPagination : #4E5166;
$blue : rgba(5, 113, 237, 1);
$green : rgb(2, 179, 49);

*{
  box-sizing: border-box; 
}
#app {
  font-family: Lato, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body, .name, .job, .date, .textPagination, .dateArticle, h3 {
  margin: 0;
}
textarea, input {
  font-family: Lato, Arial, sans-serif;
}
.addComment, .oneCommentTop, .topAddPost, .addPostContent, .forum, .addPost, .info, .like, .pagination, .infoUserName, .topPost, .infoUser, .infoLeft, .buttonLike, .photoProfil, .listTitle, .list, .commentContainerAdmin {
  display: flex;
  align-items: center;
}
.inscrire, .connexion, .link, .buttonPP, .modifyPPButton, .buttonPagination, .buttonPublier, .modify, .delete, .buttonLike, .thumbs, .addCommentText, .buttonPaginationComment, .deleteButton, .buttonModify, .buttonCancel, .buttonSave, .buttonModifyComment {
  border: none;
}
.bandeau, .infoUserName, .addPostContent, .articleList, .topAddPost, .addPost, .paginationContainer, .buttonLike, .addComment, .infoProfil, .visible {
  justify-content : center;
}
.forum, .infoUserName, .infoLeft, .addPostContent, .photoProfil, #infoUser, .listPublicationAdmin, #publicationAdmin {
  flex-direction: column;
}
.link, .titlePPModify, .IconCross, .trash:hover, .trashComment:hover {
  color: $red;
}
.buttonPublier, .textPagination, .buttonPagination, .buttonPP, .deleteButton, .buttonModify, .buttonCancel, .buttonSave, .buttonModifyComment {
  color: white;
}
#formulaire, .lien, .publication, .buttonList button, .buttonLike, .user, #publicationAdmin, .buttonVisible, .header {
  background-color: white;
}
.deleteButton, .buttonSave {
  background-color : $buttonRed;
}
.buttonModify, .buttonCancel {
  background-color: $grey;
}
.job, .date, .briefcase, .thumbsPost, .buttonPaginationComment, .dateArticle, .pen, .thumbsgrey, .penComment, .dateComment {
  color: $grey;
}
.buttonPublier:hover,.buttonModifyComment:hover, .shadow:hover, .thumbsPost, .buttonPagination:hover, .buttonPaginationComment:hover, .buttonList button, .thumbs, .buttonLike, .buttonListComment button, .modifyPPButton:hover, .deleteButton:hover, .buttonModify:hover, .buttonCancel:hover, .buttonSave:hover, .buttonAdmin:hover, .IconEye:hover {
  cursor: pointer;
}
.forum{
  background:url("./assets/architecture.webp") fixed;
  min-height: 89vh;
}
.bandeau {
  width: 50%;
  background-color: $bandeauColor;
  min-height: 90vh;
}

// Header Login/Register //
#page {
  background:url("./assets/architecture.webp") no-repeat;
  width: 100%;
  height: 100vh;
}
.logo{
  width: 24%;
}
.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10%;
}
.navRegister {
  align-self: flex-end;
  margin-right: 10%;
  a {
    font-weight: bold;
    font-size: 1.4em;
    color: #2c3e50;
    padding: 1.2em;
    text-decoration: none;
    &.router-link-exact-active {
      color: $red;
    }
  }
}

// Header Post //
#header{
  display: flex;
  height: 100px;
}
.logoPost{
  width: 20%;
  object-fit: contain;
  position: relative;
  left: 10%;
}
.navPost{
  width: 70%;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 5%;
}
.link{
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
  margin: 6% 2% 2% 2%;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.router-link-exact-active {
  color: $red;
}
.IconDeco {
  margin-right: 5px;
  font-size: 22px;
  color: #000000c4;
}

// css signup et login //
#formulaire{
  position: absolute;
  top: 33%;
  left: 35%;
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
    background-color: $inputColor;
    font-size: 16px;
  }
  button {
    background-color: $buttonRed;
    font-size: 22px;
    color: white;
    padding: 5px 15px 5px 15px;
    margin: 15px 0 20px 0;
    border-radius: 10px;
    &:hover {
      box-shadow: $shadow 1px 1px 5px;
      cursor: pointer;
    }
  }
}
.linkForm {
  font-weight: bold;
  padding-left: 3px;
  color: $buttonRed;
  &:hover {
    text-decoration: underline;
  }
}
.textUnderButton {
  font-size: 18px;
}

// Info User //
.infoUser {
  display: flex;
  padding: 10px 10px 0 10px;
}
.info {
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
}
.avatar_post {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40px;
  margin: 0 15px 0 15px;
}
.name {
  font-weight: 900;
  font-size: 1em;
  text-align: left;
}
.job {
  padding-top: 5px;
  font-size : 13px;
}
.date{
  font-size: 1em;
}
.briefcase {
  margin-right: 5px;
  font-size: 13px;
}

//-------------- Forum text et multimedia --------------//
// Ajouter un article //
.addArticle {
  font-size: 1.5em;
  margin: 10px 0 0 0;
  padding-bottom: 7px;
  border-bottom: $borderLine solid 1px;
  width: 95%;
}
.addPostContent {
  width: 80%;
}
#addPostTitle {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: solid 1px $borderLine;
  padding: 5px 10px 5px 10px;
  font-size: 1em;
}
textarea {
  resize: none;
}
#addPostText {
  width: 95%;
  height: 125px;
  border-radius: 10px;
  border: solid 1px $borderLine;
  padding: 15px;
  font-size: 1em;
}
.message {
  margin: 15px 0 0 0;
  color: $buttonRed;
}
.buttonPublier {
  background-color: $buttonRed;
  font-size: 18px;
  padding: 5px 15px 5px 15px;
  margin: 5px 0 10px 0;
  border-radius: 7px;
  &:hover {
    box-shadow: $shadow 1px 1px 5px;
  }
}

// Post List //
.articleList{
  display: flex;
  margin: 20px 0 10px 0;
}
.lien {
  width: 97%;
  border-radius: 5px;
  text-decoration: none;
  color: black;
}
.h2 {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom : 10px
}
.content {
  text-align: justify;
  font-size: 1.05em;
  padding: 0 6% 10px 6%;
  margin: 10px 7% 0 7%;
}
.image {
  width: 80%;
  height: 300px;
  padding-bottom: 5px;
  object-fit: contain;
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
}
.up {
  padding-bottom : 2px;
}

// Pagination //
.pagination {
  margin-bottom: 30px;
  justify-content: flex-end;
  padding-right: 20px;
  & .textPagination {
    padding: 10px;
    font-size: 20px;
  }
  & .buttonPagination {
    background: none;
    font-size: 20px;
    &:hover {
      background: $backgroundPagination;
      border-radius: 15px;
    }
  }
}
.paginationContainer {
  display: flex;
}
.textPaginationComment {
  color: black;
}
.buttonPaginationComment {
  background: none;
  font-size: 1em;
  font-weight: bolder;
  padding:  10px;
  width: 60%;
  border-top : 1px solid $borderLine;
  &:hover {
    color: black;
  }
}

// ---------------- ONE ARTICLE ------------------//
/* Article Content */
.publication {
  border-radius: 10px;
  width: 95%;
  margin: 20px;
  padding-bottom: 20px;
}
#article {
  width: 100%;
  margin-top : 10px;
}
.topPost {
  justify-content: space-between;
}
#titleOnePost {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom : 10px
}
.dateArticle {
  padding-bottom: 5px;
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
}
.pen {
  font-size: 17px;
  &:hover {
    color: black;
  }
}
.trash {
  color: $darkRed;
  font-size: 17px;
}
#titleOnePost input {
  border: none;
  border-radius: 10px;
  box-shadow: $shadow 1px 1px 5px;
  width: 50%;
  padding: 0 5px 5px 10px;
  font-size: 0.8em;
  min-height: 30px;
}
#contentText textarea {
  margin-top : 10px;
  border: none;
  border-radius: 15px;
  box-shadow: $shadow 1px 1px 5px;
  width: 70%;
  padding: 5px 5px 0 10px;
  font-size: 1.3em;
  min-height: 100px;
}

// Like //
.like {
  border-bottom: 1px solid $borderLine;
  justify-content: flex-end;
  padding-right: 10% ;
}
.thumbs {
  height: 20px;
  width: 25px;
}
.blue {
  color: $blue;
}
.buttonLike {
  gap: 7px;
  font-size: 1.1em;
  margin: 0 13px 10px 0;
}
.penComment {
  font-size: 14px;
  &:hover {
    color: black;
  }
}
.trashComment {
  color: $darkRed;
  font-size: 14px;
}

// Commentaires //
.h3 {
  padding: 10px 0 10px 0;
  font-weight: bolder;
  font-size: 1.1em;
}
.allComment {
  width: 100%;
}
.commentsList {
  margin-top: 15px;
}
.oneComment {
  text-align: left;
}
.dateComment{
  font-size: 0.9em;
  margin:  2px 0 10px 0;
  padding-left: 13%;
}
.oneCommentTop{
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
  background-color: $inputColor;
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
  margin: 0px 25px 0 0;
  max-width: 80%;
  min-width: 40%;
}
.commentTop {
  display: flex;
  justify-content: space-between;
}
.comment{
  margin: 5px 0 0 0;
  text-align: left;
  font-size: 1em;
  word-wrap : break-word;
}
.buttonModifyComment {
  width: 30%;
  margin: 10px 0 0 35%;
  background-color: $buttonRed;
  font-size: 18px;
  padding: 5px 15px 5px 15px;
  border-radius: 7px;
  &:hover {
    box-shadow: $shadow 1px 1px 5px;
  }
}
.contentComment {
  flex-direction: column;
  display: flex;
}
.contentComment textarea{
  width: 98%;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  padding: 5px;
  margin: 15px 0 0 0;
}
 textarea:focus {
   outline: none;
  }

// Add Comment //
.addCommentText {
  background-color: $inputColor;
  margin: 10px;
  width: 70%;
  padding: 10px 15px 0 15px;
  font-size: 1.1em;
  border-radius: 10px;
}
.messageComment {
  margin: 0 0 0 15px;
  color: $darkRed;
}
.buttonListComment {
  margin-left: 15px;
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
}
.photoProfil {
  position: absolute;
  right: 23%;
  width: 20%;
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
    padding: 5px 15px 5px 15px;
    margin: 5px 10px 20px 10px;
    border-radius: 7px;
    &:hover {
      box-shadow: $shadow 1px 1px 5px;
      cursor: pointer;
    }
  }
  & .buttonPP {
    width: 40%;
    border-radius: 5px;
    padding: 5px 15px 5px 15px;
    margin: 15px 10px 20px 10px;
    font-size: 15px;
    &:hover {
      box-shadow: $shadow 1px 1px 5px;
    }
  }
}
.user {
  width: 60%;
  border-radius: 20px;
  margin: 20px 0 20px 0;
  padding: 20px 40px 40px 40px;
}
#infoUser {
  margin: 60px 0 10px 5%;
  font-size: 1.2em;
  width: 60%;
  display: flex;
  & .infoProfil {
    display: flex;
    padding-left: 5%;
    & .infoProfilDetail {
      font-weight: bold;
      padding-right: 10px;
    }
    & input {
      height: 30px;
      margin-top : 16px;
      border: none;
      border-radius: 15px;
      box-shadow: #cecece 1px 1px 5px;
      width: 60%;
      padding: 0 5px 0 10px;
      font-size: 0.9em;
    }
  }
}
#profilButton {
  text-align: start;
  margin-left: 14%;
}
.deleteButton, .buttonModify, .buttonSave, .buttonCancel {
    font-size: 18px;
    padding: 5px 15px 5px 15px;
    margin: 15px 10px 20px 10px;
    border-radius: 10px;
    &:hover {
      box-shadow: $shadow 1px 1px 5px;
    }
  }

//----------------------- ADMIN ---------------------------//
#headerAdmin{
  display: flex;
  height: 100px;
}
.logoAdmin{
  width: 20%;
  object-fit: contain;
  position: relative;
  left: 40%;
}
.navAdmin{
  width: 70%;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 5%;
}
.linkAdmin{
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
  padding: 6% 2% 2% 2%;
  text-decoration: none;
  &.router-link-exact-active {
      color: $red;
  }
}
.linkAdmin:hover{
  text-decoration: underline;
}
.IconDeco {
  margin-right: 5px;
  font-size: 22px;
  color: #000000c4;
}
#bandeauAdmin {
  width: 70%;
  background-color: $bandeauColor;
  min-height: 89vh;
  & .listPublicationAdmin {
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
.IconCheck {
  color: $green;
}
.buttonAdmin {
  border: none;
  border-radius: 3px;
  font-weight: bold;
  height: 25px;
  &:hover {
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
  color: black;
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
  color: #525252bd;
  width: 35%;
  & .IconEye {
    padding-right: 10px;
  }
}
.green:hover {
  color: $green;
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
  gap: 15px;
  border-top: 1px solid rgb(245, 245, 245);
  padding: 0 10px 0 10px;
}
.numberCommentAdmin {
  padding: 10px 0 10px 0;
  font-weight: bold;
}
.commentAdmin {
  width: 57%;
  word-break: break-all;
  white-space: normal;
  text-align: justify;
}
.nameAdmin {
  width : 16%;
}
.postContentAdmin {
  width: 66%;
  padding: 10px;
} 
#imageAdmin {
  width: 70%;
}

//---------------- RESPONSIVE ------------------//
// TELEPHONE //
@media screen and (max-width:768px) {
#formulaire{
  margin: 25% 0 35% 0;
  top: 15%;
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
.textUnderButton{
  font-size: 14px;
  padding: 0 15px 0 15px;
}
h1 {
  font-size: 4vh;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0; 
}
.logo{
    width: 80%;
    padding: 10px 3px 10px 3px;
}
.navRegister {
  display: none;
}
}

// TABLETTE //
@media screen and (min-width:768px) and (max-width:1200px)
{
  .header {
    gap: 8%;
  }
  .navRegister {
    margin-right: 7%;
  }
  .logo {
    width: 40%;
  }
  #formulaire {
    width: 50%;
    left: 25%;
  }
}
</style>