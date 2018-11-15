import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import producer from '../kafka/producer';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version,greeting: "Kafka Consumer" });
	});

  api.post('/send-msg',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    let payloads = [
        { topic: req.body.topic, messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
            res.json(data);
    });
  })

	return api;
}
