var kafka = require("kafka-node");

const Producer = kafka.Producer;
// const client = new kafka.KafkaClient({ kafkaHost: "localhost:8082" });
const client = new kafka.Client();
const producer = new Producer(client);

producer.on("ready", function() {
  console.log("Producer is ready");
});

producer.on("error", function(err) {
  console.log("Producer is in error state");
  console.log(err);
});

export default producer;
