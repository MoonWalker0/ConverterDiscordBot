const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const timeout = 30 * 1000;

client.on('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {  
    if(msg.author.username != "ConverterBot")
    { 
        var messages = require('./menu_printing');
        var carryOn = true;

        if(msg.content == "!help")
        {
            messages.help(msg);
        }
        else if(msg.content == "!start")
        { 
            const filter = response => {return response.author.id === msg.author.id;}
           
            messages.startMenu(msg); 
            messages.stepOne(msg);

            var option;
                        
            //Get first response
            var response = await msg.channel.awaitMessages(filter, {max: 1, time: timeout})
                .then((collected) => 
                {
                    //Timeout handling
                    if(collected.first() == null)
                    {
                        messages.timeout(msg); 
                        carryOn = false;
                        return;
                    }

                    //Check response
                    option = collected.first().toString();
                    if(option != "1" &&
                       option != "2" &&
                       option != "3")
                    {
                        messages.unknownItem(msg); 
                        messages.end(msg);
                        carryOn = false;
                        return;
                    } 
                    messages.knownItem(msg);
                });
    
            //Await JSON
            var handler = require('./json_handler');
            response = await msg.channel.awaitMessages(filter, {max: 1, time: timeout})
            .then((collected) => 
            { 
                if(!carryOn)
                {
                    return;
                }
                
                if(option == "1")
                {
                    handler.requestUsername(msg, collected);
                }
                else if(option == "2")
                {
                    handler.requestUsernameAndDeck(msg, collected);
                }
                messages.end(msg);
            });
 
        }
        //}
        /*
        else
        {   
            msg.channel.send(msg.content);
            request.get(msg.attachments.first().attachment, function (error, response, body) 
            {
                if (!error && response.statusCode == 200) 
                {
                    var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 

                    var participantsString = "";
                    for(var i = 0 ; i < participants.length ; i ++)
                    {   
                        participantsString += (i + 1).toString() + ". ";
                        participantsString += participants[`${i}`]["first_name"];
                        participantsString += "\n";
                        //console.log(participants[`${i}`]["username"]);
                    } 
                    msg.channel.send(participantsString); 
                }
            });  
        }*/
    } 
 });

client.login('NzAwNzEyMTg0OTE2NzM4MDY5.XptJJQ.IhklcKm5tUTJJ5OJgypjdZAHGEU');