"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var kafka = require("kafka-node");

var Producer = kafka.Producer;
// let client= new kafka.Client();
var client = new kafka.KafkaClient({ kafkaHost: "kafka-0.kafka.backbone:9092" });

// if (process.env.NODE_ENV !== "development") {
//   client = new kafka.KafkaClient({ kafkaHost: "kafka-0.kafka.backbone:9092" });
// }

var producer = new Producer(client);

producer.on("ready", function () {
  console.log("Producer is ready");
});

producer.on("error", function (err) {
  console.log("Producer is in error state");
  console.log(err);
});

exports.default = producer;
//# sourceMappingURL=producer.js.map