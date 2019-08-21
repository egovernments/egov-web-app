"use strict";

var kafka = require("kafka-node");
var Consumer = kafka.Consumer;
// let client= new kafka.Client();
var client = new kafka.KafkaClient({ kafkaHost: "kafka-0.kafka.backbone:9092" });

// if (process.env.NODE_ENV !== "development") {
//   client = new kafka.KafkaClient({ kafkaHost: "kafka-0.kafka.backbone:9092" });
// }


var consumer = new Consumer(client, [{ topic: "SMS", offset: 0 }], {
  autoCommit: false
});

consumer.on("message", function (message) {
  console.log(message);
});

consumer.on("error", function (err) {
  console.log("Error:", err);
});

consumer.on("offsetOutOfRange", function (err) {
  console.log("offsetOutOfRange:", err);
});
//# sourceMappingURL=consumer.js.map