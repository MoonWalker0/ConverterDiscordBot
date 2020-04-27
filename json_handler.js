const request = require('request');
module.exports = {
    requestUsername: function (msg, client, channel) 
    { 
        var messages = require('./menu_printing');
        try
        {
            request.get(msg.attachments.first().attachment, function (error, response, body) 
            {
                if (!error && response.statusCode == 200) 
                { 
                    try
                    {
                        var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                    }
                    catch(error)
                    {
                        messages.jsonError(msg);
                        return;
                    }
    
                    var tableData = [];
                    tableData.push(["Lp.", "Uczestnik"]);
                    for(var i = 0 ; i < participants.length ; i ++)
                    {   
                        tableData.push([(i+1).toString(), participants[`${i}`]["first_name"]]); 
                    } 

                    var arrayHandler = require('./table_handler'); 

                    var printArray = arrayHandler.buildTable(tableData, participants.length, 2);
                    for(var i = 0 ; i < printArray.length ; i++)
                    {
                        if(channel == "0")
                        {
                            msg.channel.send(printArray[i]);
                        }
                        else
                        {
                            client.channels.cache.get(channel).send(printArray[i]);
                        }
                    }
    
                }
                else
                {
                    messages.requestError(msg);
                }
            }); 
        }
        catch(error)
        {
            messages.jsonError(msg); 
            return;
        }
    },

    requestUsernameAndDeck: function (msg, client, channel)
    {
        var messages = require('./menu_printing');
        try
        {
            request.get(msg.attachments.first().attachment, function (error, response, body) 
            {
                if (!error && response.statusCode == 200) 
                { 
                    try
                    {
                        var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                        var decks = JSON.parse(body)["data"]["entityGroupMap"]["Deck:#"]["entities"];
                    }
                    catch(error)
                    {
                        messages.jsonError(msg);
                        return;
                    }
    
                    var tableData = [];
                    tableData.push(["Lp.", "Uczestnik", "Talia"]);
                    for(var i = 0 ; i < participants.length ; i ++)
                    {   
                        tableData.push([(i+1).toString(), participants[`${i}`]["first_name"], decks[`${i}`]["name"]]); 
                    }  

                    //Safety for sealed format
                    if(tableData[1][2] == null)
                    {
                        messages.noDecks(msg);
                        return;
                    }

                    var arrayHandler = require('./table_handler'); 

                    var printArray = arrayHandler.buildTable(tableData, participants.length, 3);
                    for(var i = 0 ; i < printArray.length ; i++)
                    {
                        if(channel == "0")
                        {
                            msg.channel.send(printArray[i]);
                        }
                        else
                        {
                            client.channels.cache.get(channel).send(printArray[i]);
                        }
                    }
                }
                else
                {
                    messages.requestError(msg);
                }
            }); 
        }
        catch(error)
        {
            messages.jsonError(msg); 
            return;
        }
    },

    requestParings: function (msg, client, channel) 
    { 
        var messages = require('./menu_printing');
        try
        {
            request.get(msg.attachments.first().attachment, function (error, response, body) 
            {
                if (!error && response.statusCode == 200) 
                { 
                    try
                    {
                        var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                        var currentRound = JSON.parse(body)["data"]["entityGroupMap"]["Tournament:#"]["entities"]["0"]["current_round"];
                        var matchesInfo = JSON.parse(body)["data"]["entityGroupMap"]["Match:#"]["entities"];
                        var matches = JSON.parse(body)["data"]["entityGroupMap"]["MatchParticipant:#"]["entities"]; 
                    }
                    catch(error)
                    {
                        messages.jsonError(msg); 
                        return;
                    }
    
                    //Collect full array of players [player_id][player_name][score = 0]
                    var participantsArr = [];
                    for(var i = 0 ; i < participants.length ; i ++)
                    {   
                        participantsArr.push([participants[`${i}`]["pk"], participants[`${i}`]["first_name"], 0]); 
                    } 

                    //Collect [match_id][round] array
                    var matchesArr = [];
                    for(var i = 0 ; i < matchesInfo.length ; i ++)
                    {
                        matchesArr.push([matchesInfo[`${i}`]["pk"], matchesInfo[`${i}`]["round"]]); 
                    } 

                    //Iterate throught matches add score if not current round OR start logging if current round
                    var tableData = [];
                    tableData.push(["Lp.", "Gracz 1", "Gracz 2", "Wynik gracza 1", "Wynik gracza 2"]);
                    var currentMatchIndex = 1;  
                    for(var i = 0 ; i < matches.length ; i ++)
                    {    
                        //Match match's id with its round
                        var tempRound;
                        for(var j = 0 ; j < matchesArr.length ; j++)
                        { 
                            if(matchesArr[j][0] == matches[`${i}`]["match_pk"])
                            {
                                tempRound = matchesArr[j][1];
                                break;
                            }
                        }  

                        //Current round - do not calculate score - just log
                        if(tempRound == currentRound)
                        {
                            var tempGracz1, tempGracz2;
                            var tempScore1, tempScore2;

                            //Get whole pair na add to table
                            for(var j = 0 ; j < participantsArr.length ; j++)
                            {
                                if(participantsArr[j][0] == matches[`${i}`]["participant_pk"])
                                {
                                    tempGracz1 = participantsArr[j][1];
                                    tempScore1 = participantsArr[j][2].toString() + ":" + Math.abs(participantsArr[j][2] - currentRound + 1).toString();
                                }
                                if(participantsArr[j][0] == matches[`${i+1}`]["participant_pk"])
                                {
                                    tempGracz2 = participantsArr[j][1];
                                    tempScore2 = participantsArr[j][2] + ":" + Math.abs(participantsArr[j][2] - currentRound + 1).toString();
                                }
                            }

                            tableData.push([currentMatchIndex.toString(), 
                                            tempGracz1,
                                            tempGracz2,
                                            tempScore1,
                                            tempScore2]);
                            currentMatchIndex++; 
                            i++;
                        }
                        //Previous round - add previous score
                        else
                        { 
                            for(var j = 0 ; j < participantsArr.length ; j++)
                            {  
                                if(participantsArr[j][0] == matches[`${i}`]["participant_pk"])
                                { 
                                    participantsArr[j][2] += matches[`${i}`]["points_earned"]; 
                                    break;
                                }
                            }
                        }
                    } 
 
                    var arrayHandler = require('./table_handler'); 

                    var printArray = arrayHandler.buildTable(tableData, currentMatchIndex, 5);
                    for(var i = 0 ; i < printArray.length ; i++)
                    {
                        if(channel == "0")
                        {
                            msg.channel.send(printArray[i]);
                        }
                        else
                        {
                            client.channels.cache.get(channel).send(printArray[i]);
                        }
                    }

    
                }
                else
                {
                    messages.requestError(msg);
                }
            }); 
        }
        catch(error)
        {
            messages.jsonError(msg); 
            return;
        }
    },

    requestTopScores: function (msg, client, channel)
    {
        var messages = require('./menu_printing');
        try
        {
            request.get(msg.attachments.first().attachment, function (error, response, body) 
            {
                if (!error && response.statusCode == 200) 
                { 
                    try
                    { 
                        var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                    }
                    catch(error)
                    {
                        messages.jsonError(msg);
                        return;
                    }

                    var sortedParticipants = [];
                    var presentParticipants = [];
                    for(var i = 0 ; i < participants.length ; i ++)
                    {    
                        //Remove duplicates - no clue why they are there 
                        if(presentParticipants.includes(participants[`${i}`]["first_name"]))
                        {
                            continue;
                        }

                        sortedParticipants.push([participants[`${i}`]["first_name"],
                                                 (participants[`${i}`]["previous_tournament_wins"] == null) ? 0 : participants[`${i}`]["previous_tournament_wins"],
                                                 (participants[`${i}`]["previous_tournament_losses"] == null) ? 0 : participants[`${i}`]["previous_tournament_losses"],
                                                 participants[`${i}`]["previous_tournament_sos"],
                                                 participants[`${i}`]["previous_tournament_esos"]]);
                        presentParticipants.push(participants[`${i}`]["first_name"]);
                    }
                     
                    //Super-duper complex sorting Score -> SOS -> ESOS 
                    var changed = false;
                    var tempElement;
                    var i = 0;   
                    //[1] - wins | [3] - SOS | [4] - ESOS
                    for(var i = 0 ; i < sortedParticipants.length ; i++)
                    {  
                        //More wins - simple switch
                        if(sortedParticipants[i+1][1] > sortedParticipants[i][1])
                        { 
                            tempElement = sortedParticipants[i];
                            sortedParticipants[i] = sortedParticipants[i+1];
                            sortedParticipants[i+1] = tempElement;
                            changed = true;   
                        } 
                        //Equal wins - check SOS                        
                        else if(sortedParticipants[i+1][1] == sortedParticipants[i][1])
                        {
                            //More SOS - simple switch
                            if(parseFloat(sortedParticipants[i+1][3]) > parseFloat(sortedParticipants[i][3]))
                            {
                                tempElement = sortedParticipants[i];
                                sortedParticipants[i] = sortedParticipants[i+1];
                                sortedParticipants[i+1] = tempElement;
                                changed = true;
                            }
                            //Equal SOS - check ESOS
                            else if(parseFloat(sortedParticipants[i+1][3]) == parseFloat(sortedParticipants[i][3]))
                            {
                                //More ESOS - simple switch
                                if(parseFloat(sortedParticipants[i+1][4]) > parseFloat(sortedParticipants[i][4]))
                                {
                                    tempElement = sortedParticipants[i];
                                    sortedParticipants[i] = sortedParticipants[i+1];
                                    sortedParticipants[i+1] = tempElement;
                                    changed = true;
                                }
                                //Equal ESOS - what now?                                 
                            }
                        } 
                        
                        //End of array check lets try again
                        if((i + 2) >= sortedParticipants.length)
                        {
                            //If change occurred - restart loop
                            if(changed)
                            { 
                                i = -1;
                                changed = false; 
                            } 
                            else
                            {
                                break;
                            }
                        } 
                    } 
    
                    var tableData = [];
                    tableData.push(["Miejsce", "Uczestnik", "Wynik", "SOS", "ESOS"]);
                    for(var i = 0 ; i < sortedParticipants.length ; i ++)
                    {   
                        tableData.push([(i+1).toString(), 
                                        sortedParticipants[i][0],
                                        sortedParticipants[i][1].toString() + ":" + sortedParticipants[i][2].toString(),
                                        sortedParticipants[i][3],
                                        sortedParticipants[i][4]]); 
                    } 

                    var arrayHandler = require('./table_handler');

                    var printArray = arrayHandler.buildTable(tableData, tableData.length, 5);
                    for(var i = 0 ; i < printArray.length ; i++)
                    {
                        if(channel == "0")
                        {
                            msg.channel.send(printArray[i]);
                        }
                        else
                        {
                            client.channels.cache.get(channel).send(printArray[i]);
                        }
                    }
    
                }
                else
                {
                    messages.requestError(msg);
                }
            }); 
        }
        catch(error)
        {
            messages.jsonError(msg); 
            return;
        }
    }
};