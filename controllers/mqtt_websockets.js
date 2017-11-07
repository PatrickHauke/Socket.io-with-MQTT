const mqtt = require('mqtt'),
    io = require('socket.io'),
    http = require('http');

const socketOverExpress = require('./socketOverExpress');
    
exports.connectToSocket = ()=> {
    let server = socketOverExpress.server(),
        socket = socketOverExpress.socket(),
        express = socketOverExpress.expressApp(),
        mqttClient = mqtt.connect(broker);

    mqttClient.on('connect', ()=>{
        console.log('MQTT is connected to '+ mqttBroker + '.\n'+
        'Verify by running < mosquitto_sub -v -t "#" > through broker.');

        mqttMessageToClient(mqttClient, socket);
    });
}

// let subList = ['+/DeviceMovement'];
let subList = ['+'];
function mqttMessageToClient(mqttClient, socket){
    subList.forEach(topic)=>{
        mqttClient.subscribe(topic);
    };

    mqttClient.on('message', (topic, msg)=>{
        // The message comes in as a buffer
        socket.volatile.emit(topic, msg.string());
    })
}

function clientMessageToMQTT(mqttClient, socket){
    let obj = '';
    // Define connections coming from the client. Maybe pass this as part of the obj?
    socket.on('connect', () =>{
        server.on('ClientLink', (msg)=>{
            obj = JSON.parse(msg);
            console.log(obj);
            // obj : {
            //     deviceId : 'id',
            //     topic : 'topic',
            //     params : 'param'
            // }
            mqttClient.publish(obj.deviceId + '/' +obj.topic, obj.params);
        })
    })
}