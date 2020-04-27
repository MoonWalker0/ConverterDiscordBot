module.exports = {
    fullHelp : function (msg)
    {
        msg.channel.send(
                         "Bot pozwala na wygenerowanie różnych tabel z danymi z plików JSON (folder Backup) z systemu GEM.\n\n"+
                         "Bota używa się poprzez przesłanie załacznika z odpowiednim opisem/komentarzem:\n"+     
                         "```!start OPCJA ID_KANAŁU```\n" + 
                        
                         "Aktualnie dostępne wartości OPCJA:\n" +
                         "1 - Pobierz listę uczestników.\n" +
                         "2 - Pobierz listę uczestników i talii.\n" +
                         "3 - Pobierz listę paringów.\n"+
                         "4 - Pobierz statystyki graczy (wynik/SOS/ESOS).\n\n" +
                        
                         "ID_KANAŁU równe 0 powoduje wypisanie odpowiedzi w tym miejscu. Inna wartość skieruje wiadomość do wskazanego kanału.\n"+
                         "Aby pobrać ID kanału należy wejść w [Ustawienia] -> [Wygląd] -> [Tryb Dewelopera].\n"+
                         "Następnie prawym przyciskiem myszy kliknąć na wybranym kanale i wybrać [Kopiuj ID]\n\n" +

                         "Przykład:\n"+
                         "Załącznik przesłany z komentarzem ```!start 1 0``` spowoduje wygenerowanie listy uczestników turnieju w aktualnym oknie czatu.\n\n"+
                         "Załącznik przesłany z komentarzem ```!start 3 123``` spowoduje przesłanie aktualnych paringów do kanału o ID równym 123. \n\n"+

                         "Uwaga - jeżeli wiadomości nie pojawiają się na wskazanym kanale należy sprawdzić czy jest nadana tam rola ```ConverterBot``` z możliwościa pisania wiadomości."
                         );
    },
    messageSizeError: function(msg)
    {
        msg.channel.send("Niepoprawnie zbudowana komenda. Sprawdź składnie poprzez ```!help```")
    },
    notNumberError: function(msg)
    {
        msg.channel.send("Wprowadzone dane powinny być liczbami.");
    },
    startMenu: function (msg) 
    {
        msg.channel.send("Proces uruchomiony!");   
    },
    stepOne: function (msg)
    {
        msg.channel.send("Co robimy? Możliwe opcje:");
        msg.channel.send("1 - Pobierz listę uczesntików.\n" +
                         "2 - Pobierz listę uczestników i talii.\n" +
                         "3 - Pobierz listę paringów\n" +
                         "4 - Pobierz statystyki graczy (wynik/SOS/ESOS)\n");
    },
    stepTwo: function (msg)
    {
        msg.channel.send("Gdzie skierować wynik?\n"+
                         "Podaj ID kanału lub 0, aby wypisać tutaj.\n\n"+
                         "Aby pobrać ID kanału należy wejść w [Ustawienia] -> [Wygląd] -> [Tryb Dewelopera].\n"+
                         "Następnie prawym przyciskiem myszy na kanale i wybrać [Kopiuj ID]");
    },
    noDecks: function(msg)
    {
        msg.channel.send("Brak talii do pokazania.");
    },
    knownItem: function(msg)
    {
        msg.channel.send("Zrozumiałem!");
    },
    giveJSON: function(msg)
    {
        msg.channel.send("Proszę o plik z JSONem.");
    },
    unknownItem: function(msg)
    {
        msg.channel.send("OPCJA nierozpoznana.");
    },
    idError: function(msg)
    {
        msg.channel.send("ID musi zawierać tylko cyfry.");
    },
    jsonError: function(msg)
    {
        msg.channel.send("Niepoprawny plik JSON lub jego brak.");
    },
    requestError: function(msg)
    {
        msg.channel.send("Błąd podczas procesowania załącznika.")
    },
    timeout: function (msg)
    {
        msg.channel.send("Przekroczono czas na reakcję.");
    },
    end: function(msg)
    {
        msg.channel.send("Koniec procesu.");
    },
    help: function(msg)
    {
        msg.channel.send("Wprowadź '!start', aby uruchomić bota.");
    }
  };
  