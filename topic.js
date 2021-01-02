const {Kafka} = require("kafkajs")
const topicName = "Users";

run();
async function run(){
    try {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")

        // We will have 2 partitions, to spit messages alphabetically 
        await admin.createTopics({
            "topics": [{
                "topic" : topicName,
                "numPartitions": 2
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();

    } catch(e){
        console.error(`Something bad happened ${e}`)

    } finally{
        process.exit(0);
    }


}