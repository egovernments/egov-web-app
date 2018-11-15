var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.Client(),
  consumer = new Consumer(client, [{ topic: "Posts", offset: 0 }], {
    autoCommit: false
  });

consumer.on("message", function(message) {
  console.log(message);
});

consumer.on("error", function(err) {
  console.log("Error:", err);
});

consumer.on("offsetOutOfRange", function(err) {
  console.log("offsetOutOfRange:", err);
});
