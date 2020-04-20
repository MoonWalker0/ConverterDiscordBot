module.exports = {
    buildTable: function (arr, length, width) 
    { 
        var maxLength = this.getMaxLength(arr, length, width);
       
        var result = "```"; 
        result += this.drawTop(width, maxLength); 
        result += this.drawHeaders(width, arr[0], maxLength); 
        result += this.drawMid(width, maxLength); 
        result += this.drawContent(width, length, maxLength, arr);
        result += this.drawBot(width, maxLength);
        result += "```";
        
        console.log(result);
        return result;
    },

    drawContent: function(width, length, maxLength, arr)
    {
        var result = "";
        //[0] are for headers
        for(var i = 1 ; i < length; i++)
        {
            result += "║";
            for(var j = 0 ; j < width ; j++)
            {
                result += arr[i][j];
                if(arr[i][j].length < maxLength[j])
                { 
                    //Add spaces
                    result += new Array(maxLength[j] - arr[i][j].length + 1).join(' '); 
                }
                result += "║";
            } 
            result += "\n";

            if(length - 1 != i)
            {
                result += this.drawMid(width, maxLength); 
            }
        }
        return result;
    },

    drawHeaders: function(width, names, maxLength)
    {
        var result = "║";
        for(var i = 0 ; i < width; i ++)
        {
            result += names[i];

            if(names[i].length < maxLength[i])
            { 
                //Add spaces
                result += new Array(maxLength[i] - names[i].length + 1).join(' ');
            } 
            result += "║";  
        }
        result += "\n";
        return result;
    },

    drawTop: function(width, maxLength)
    {
        return this.drawLine("╔", "═", "╦", "╗\n", width, maxLength); 
    },

    drawMid: function(width, maxLength)
    {
        return this.drawLine("╠", "═", "╬", "╣\n", width, maxLength);
    },

    drawBot: function(width, maxLength)
    {
        return this.drawLine("╚", "═", "╩", "╝", width, maxLength);
    },

    drawLine: function(left, inside, mid, right, width, maxLength)
    {
        var result = left;
        for(var i = 0; i < width ; i++)
        {
            for(var j = 0 ; j < maxLength[i] ; j++)
            {
                result += inside;
            }
            
            if(width - 1 != i)
            {
                result += mid;
            }
            else
            {
                result += right;
            }            
        }
        return result;
    },

    getMaxLength: function(arr, length, width)
    {
        var maxLength = [];

        //Populate array
        for( var i = 0 ; i < width ; i ++)
        {
            maxLength.push(1);
        }

        for( var i = 0 ; i < length ; i ++)
        {
            for (var j = 0 ; j < width ; j ++)
            {
                var tempLength = arr[i][j].length;
                if(maxLength[j] < tempLength)
                {
                    maxLength[j] = tempLength;
                }
            }
        }

        return maxLength;
    }

};