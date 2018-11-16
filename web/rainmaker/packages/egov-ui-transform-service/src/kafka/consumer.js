const kafka = require("kafka-node");
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "kafka-0.kafka.backbone:9092" });
// const client = new kafka.Client();
const consumer = new Consumer(client, [{ topic: "Posts", offset: 0 }], {
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
