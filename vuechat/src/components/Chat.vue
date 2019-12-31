<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja Chat</h2>
    <div class="card">
      <div class="card-cotnent">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }} said: </span>
            <span class="grey-text text-darker-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>
<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import moment from "moment";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage
  },
  data() {
    return {
      //this is populated real time from db, populated in the ui with v-for
      messages: []
    };
  },
  created() {
    //listening to db changes, to display them in real time in the window
    let ref = db.collection("messages").orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      //snapshot is the full db. we only need the changes, so:
      //console.log(snapshot.docChanges());
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          //output in the template
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            //formatting here with moment to the correct format
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>
>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}

.chat .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
</style>
