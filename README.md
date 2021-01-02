# Kafka with node.js
*A simple implementation of a consumer, producer and topic to communicate over Kafka from node.js.*

## Running Kafka as a Docker container

To run Kafka, it is required to have Zookeeper running as well. 
They can be both run as a docker container: 

**Run Zookeeper**
```
docker run --name zookeeper -p 2181:2181 zookeeper
```

**Get the Zookeeper address (for the `KAFKA_ZOOKEEPER_CONNECT` variable):**

```
docker inspect zookeeper --format='{{ .NetworkSettings.IPAddress }}'
```

**Run Kafka**
```
docker run -p 9092:9092 --name kafka  \
-e KAFKA_ZOOKEEPER_CONNECT=172.17.0.2:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
-d confluentinc/cp-kafka
```


## Instalation
Install dependencies: 
```
npm i
```

## Sending and receiving
Create a topic: 
```
node topic.js
```

Subscribe to a topic and start listening (leave it open): 
```
node consumer.js
```

Send messages (from another terminal window): 
```
node producer.js "Some message"
```