<template>
    <div class="wrapper">
     <div class="header-wrapper">
           <TopClient></TopClient>
           <MenuClient></MenuClient>
     </div>
     <div class="page-wrapper" style="margin-top: 0px;padding-left: 0px;padding-right: 0px;">
        <div class="page-content" style="padding-bottom: 0px;">
               <router-view></router-view>
           </div>
     </div>
       <BotClient></BotClient>
  </div>
</template>

<script>
import TopClient from '../components/TopClient.vue';
import MenuClient from '../components/MenuClient.vue';
import BotClient from '../components/BotClient.vue';
export default {
    name: 'app',
    components : {
        TopClient,MenuClient,BotClient
    }

}
</script>

<style >
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

</style>