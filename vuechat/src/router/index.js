import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import Chat from "@/components/Chat";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      // to pass the username from the welcome screen to /chat, we need props enabled. also need t oaccept them in Chat.vue as props. the actual passing happens in Welcome.vue enterChat() and surprisingly not with props but with params ($router)
      props: true,
      //route guard, so if user doesn't enter name, they can't access the chat component
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next();
        } else {
          next({ name: "Welcome" });
        }
      }
    }
  ]
});
