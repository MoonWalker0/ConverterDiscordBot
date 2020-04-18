const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const request = require('request');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {  
    if(msg.author.username != "ConverterBot")
    {
        request.get(msg.attachments.first().attachment, function (error, response, body) 
        {
            if (!error && response.statusCode == 200) 
            {
                var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 

                var participantsString = "";
                for(var i = 0 ; i < participants.length ; i ++)
                {   
                    participantsString += (i + 1).toString() + ". ";
                    participantsString += participants[`${i}`]["username"];
                    participantsString += "\n";
                    //console.log(participants[`${i}`]["username"]);
                } 
                msg.channel.send(participantsString); 
            }
        });  
    } 
 });

client.login('NzAwNzEyMTg0OTE2NzM4MDY5.XpnPsw.j-J01qP1k21bScoQERyURfuFQzY');