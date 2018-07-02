<template>
  <div id="app">
    <header-kanban></header-kanban>
    <router-view></router-view>
    <footer-kanban></footer-kanban>
  </div>
</template>
<script>
import HeaderKanban from '@/components/HeaderKanban'
import FooterKanban from '@/components/FooterKanban'

export default {
  name: 'App',
  components: {
    HeaderKanban,
    FooterKanban
  } 
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-nav.navbar-center {
  font-family: "Pacifico", cursive;
  position: absolute;
  left: 50%;
  /* width: 100%; */
  transform: translatex(-50%);
  font-size: 25px;
  letter-spacing: 0.01em;
}
a.dropdown-item{
    /* color:#007bff; */
}
a.dropdown-item:hover{
    /* background-color:#ffffff; */
    color: #fff
}

.form-group.invalid input {
  border: 1px solid red;
  background-color: #f2dede;
}

.form-group input:focus {
  border: none;
  outline: 0;
  box-shadow: 0px;
}
.error {
  font-size: 11px;
  color: red;
}

.alert {
  font-size: 12px;
}

.btn:active:focus{
  outline: none;
  /* /* border: none; */
}

</style>
