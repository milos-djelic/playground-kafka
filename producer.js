/**
 * Producer creates a message and sends it to the selected topic
 * User passes the message as a first argument when executing the file
 */

const {Kafka} = require("kafkajs")
const msg = process.argv[2];
const topicName = "Users";

run();

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")

        // We defined 2 partitions, 
        // one will store the messages with the first letter between A-M, second between N-Z
        
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic" : topicName,
            "messages" : [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log(`Created Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(e){
        console.error(`Something bad happened ${e}`)
    }
    finally{
        process.exit(0);
    }
}