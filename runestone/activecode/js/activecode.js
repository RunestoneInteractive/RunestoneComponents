/**
 * Created by bmiller on 3/19/15.
 */

var activeCodeLocalizationColl = {
    "en": {
        RunButtonCaption: "Run",
        LoadButtonCaption: "Load",
        SaveButtonCaption: "Save",
        FeedbackButtonCaption: "Show Feedback",
        ShowHideCodeButtonCaption: "Show/Hide Code",
        CodeLensButtonCaptionShow: "Show CodeLens",
        CodeLensButtonCaptionShowIn: "Show in CodeLens",
        CodeLensButtonCaptionHide: "Hide CodeLens",
        CodeCoachButtonCaption: "Code Coach",
        AudioTourButtonCaption: "Audio Tour",
        ErrorSaveRedirected: "Did not save! It appears you are not logged in properly",
        ErrorSaveOther: "Error: Program not saved",
        PromptLoginToLoad: "Login to load your code",
        PromptLoginToSave: "Login to save your code",
        InformCodeSaved: "Saved your code.",
        PromptSavingEmptyProgram: "You are about to save an empty program, this will overwrite a previously saved program. Continue?",
        ErrorRequestFailed: "Request Failed for",
        InformSavedCodeLoaded: "Loaded your saved code.",
        InformSavedCodeNotFound: "No saved code.",
        LabelGradeReportTitle: "Grade Report",
        LabelGradeReportThisAssignment: "This assignment:",
        LabelGradeReportNumOfAssignments: "Number of graded assignments:",
        LabelGradeReportAverageScore: "Average score:",
        ErrorNoGradeInformationReceived: "The server did not return any grade information",
        LabelAssignmentFeedbackTitle: "Assignment Feedback",
        LabelCodeRunErrorTitle: "Error",
        LabelCodeRunErrorDescription: "Description",
        LabelCodeRunErrorFixing: "To Fix",
        ErrorFileNotFound: "File not found:",
        LabelAudioTourTitle: "Take an audio tour!",
        LabelAudioTourBtnFirst: "Play first audio in tour",
        LabelAudioTourBtnPrevious: "Play previous audio in tour",
        LabelAudioTourBtnPause: "Pause current audio",
        LabelAudioTourBtnNext: "Play next audio in tour",
        LabelAudioTourBtnLast: "Play last audio in tour",
        InformAudioTourStartingTour: "Starting the",
        ErrorAudioTourBrowserDoesntSupport: "Your browser does not support the audio tag",
        InformAudioTourEndedPrefix: "The ",
        InformAudioTourEndedPostfix: " ended",
        InformAudioTourPlayingPrefix: "Playing the ",
        InformAudioTourLoading: "Loading audio.  Please wait.   If it doesn't start soon close this window (click on the red X) and try again",
        LabelAudioTourBtnPauseCurrent: "Pause current audio",
        LabelAudioTourBtnPlayPaused: "Play paused audio",
        LabelInputForProgram: "Input for Program",
        ErrorCompileErrors: "There were errors compiling your code. See below.",
        ErrorTimeLimitExceeded: "Time Limit Exceeded on your program",
        ErrorServerError: "A server error occurred: ",
        InformCompilingCode: "Compiling and Running your Code Now...",
        ErrorServerCommunication: "Error communicating with the server.",
        LabelError: "Error",
        LabelScratchActiveCode: "Scratch ActiveCode",

        ErrorFromCodeRun_ParseError:
                "A parse error means that Python does not understand the syntax on the line the error message points out. " +
                "Common examples are forgetting commas beteween arguments or forgetting a : on a for statement",

        ErrorFromCodeRun_ParseErrorFix:
                "To fix a parse error you just need to look carefully at the line with the error and possibly " +
                "the line before it. Make sure it conforms to all of Python's rules.",

        ErrorFromCodeRun_TypeError:
                "Type errors most often occur when an expression tries to combine two objects with types that should not " +
                "be combined. Like raising a string to a power",

        ErrorFromCodeRun_TypeErrorFix:
                "To fix a type error you will most likely need to trace through your code and make sure the variables have " +
                "the types you expect them to have.  It may be helpful to print out each variable along the way to be sure its " +
                "value is what you think it should be.",

        ErrorFromCodeRun_NameError:
                "A name error almost always means that you have used a variable before it has a value. Often this may be a simple typo, so check the spelling carefully.",

        ErrorFromCodeRun_NameErrorFix:
                "Check the right hand side of assignment statements and your function calls, this is the most likely place for a NameError to be found.",

        ErrorFromCodeRun_ValueError:
                "A ValueError most often occurs when you pass a parameter to a function and the function is expecting one type and you pass another.",

        ErrorFromCodeRun_ValueErrorFix:
                "The error message gives you a pretty good hint about the name of the function as well as the value that is incorrect. " +
                "Look at the error message closely and then trace back to the variable containing the problematic value.",

        ErrorFromCodeRun_AttributeError:
                "This error message is telling you that the object on the left hand side of the dot, does not have the attribute or method on the right hand side.",

        ErrorFromCodeRun_AttributeErrorFix:
                "The most common variant of this message is that the object undefined does not have attribute X. This tells you that the object " +
                "on the left hand side of the dot is not what you think. Trace the variable back and print it out in various places until you " +
                "discover where it becomes undefined. Otherwise check the attribute on the right hand side of the dot for a typo.",

        ErrorFromCodeRun_TokenError: "Most of the time this error indicates that you have forgotten a right parenthesis or have forgotten to close a pair of quotes.",

        ErrorFromCodeRun_TokenErrorFix: "Check each line of your program and make sure that your parenthesis are balanced.",

        ErrorFromCodeRun_TimeLimitError:
                "Your program is running too long. Most programs in this book should run in less than 10 seconds easily. " +
                "This probably indicates your program is in an infinite loop.",

        ErrorFromCodeRun_TimeLimitErrorFix:
                "Add some print statements to figure out if your program is in an infinte loop. If it is not you can increase the run time with sys.setExecutionLimit(msecs)",

        ErrorFromCodeRun_Error:
                "Your program is running for too long. Most programs in this book should run in less than 30 seconds easily. " +
                "This probably indicates your program is in an infinite loop.",

        ErrorFromCodeRun_ErrorFix:
                "Add some print statements to figure out if your program is in an infinte loop. If it is not you can increase the run time with sys.setExecutionLimit(msecs)",

        ErrorFromCodeRun_SyntaxError:
                "This message indicates that Python can't figure out the syntax of a particular statement. Some examples are assigning to a literal, or a function call",

        ErrorFromCodeRun_SyntaxErrorFix:
                 "Check your assignment statments and make sure that the left hand side of the assignment is a variable, not a literal or a function.",

        ErrorFromCodeRun_IndexError:
                "This message means that you are trying to index past the end of a string or a list.  For example if your list has " +
                "3 things in it and you try to access the item at position 3 or more.",

        ErrorFromCodeRun_IndexErrorFix:
                "Remember that the first item in a list or string is at index position 0, quite often this message comes about " +
                "because you are off by one.  Remember in a list of length 3 the last legal index is 2",

        ErrorFromCodeRun_URIError: "",
        ErrorFromCodeRun_URIErrorFix: "",

        ErrorFromCodeRun_ImportError: "This error message indicates that you are trying to import a module that does not exist",

        ErrorFromCodeRun_ImportErrorFix:
                "One problem may simply be that you have a typo. It may also be that you are trying to import a module that exists " +
                "in 'real' Python, but does not exist in this book. If this is the case, please submit a feature request to have the module added.",

        ErrorFromCodeRun_ReferenceError: "This is most likely an internal error, particularly if the message references the console.",

        ErrorFromCodeRun_ReferenceErrorFix: "Try refreshing the webpage, and if the error continues, submit a bug report along with your code",

        ErrorFromCodeRun_ZeroDivisionError:
                "This tells you that you are trying to divide by 0. Typically this is because the value of the variable in the denominator " +
                "of a division expression has the value 0",

        ErrorFromCodeRun_ZeroDivisionErrorFix:
                "You may need to protect against dividing by 0 with an if statment, or you may need to rexamine your assumptions about the legal " +
                "values of variables, it could be an earlier statment that is unexpectedly assigning a value of zero to the variable in question.",

        ErrorFromCodeRun_RangeError: "This message almost always shows up in the form of Maximum call stack size exceeded.",

        ErrorFromCodeRun_RangeErrorFix:
                "This always occurs when a function calls itself. Its pretty likely that you are not doing this on purpose. " +
                "Except in the chapter on recursion. If you are in that chapter then its likely you haven't identified a good base case.",

        ErrorFromCodeRun_InternalError: "An Internal error may mean that you've triggered a bug in our Python",

        ErrorFromCodeRun_InternalErrorFix: "Report this error, along with your code as a bug.",

        ErrorFromCodeRun_IndentationError:
                "This error occurs when you have not indented your code properly. This is most likely to happen as part of an if, for, while or def statement.",

        ErrorFromCodeRun_IndentationErrorFix:
                "Check your if, def, for, and while statements to be sure the lines are properly indented beneath them. Another source of this error " +
                "comes from copying and pasting code where you have accidentally left some bits of code lying around that don't belong there anymore.",

        ErrorFromCodeRun_NotImplementedError:
                "This error occurs when you try to use a builtin function of Python that has not been implemented in this in-browser version of Python.",

        ErrorFromCodeRun_NotImplementedErrorFix:
                "For now the only way to fix this is to not use the function. There may be workarounds. If you really need this builtin function " +
                "then file a bug report and tell us how you are trying to use the function.",

        ErrorFromCodeRun_IOError:
                "The program code tried to read or write information (input/output), but was not able to finish that operation correctly. " +
                "There are numerous case-specific reasons for this error to occur, such as incorrect file names and paths, file system corruption, " +
                "congested or broken network connection, and physical device breakage.",

        ErrorFromCodeRun_IOErrorFix:
                "If your program tried for example to read an image file, ensure the right spelling of its file name and path.",
    },
    "fi": {
        RunButtonCaption: "Suorita",
        LoadButtonCaption: "Lataa",
        SaveButtonCaption: "Tallenna",
        FeedbackButtonCaption: "Näytä palaute",
        ShowHideCodeButtonCaption: "Näytä/piilota ohjelmakoodi",
        CodeLensButtonCaptionShow: "Näytä Koodilinssi",
        CodeLensButtonCaptionShowIn: "Näytä Koodilinssissä",
        CodeLensButtonCaptionHide: "Piilota Koodilinssi",
        CodeCoachButtonCaption: "Näytä Koodausapuri",
        AudioTourButtonCaption: "Toista ääniselite",
        ErrorSaveRedirected: "Koodia ei voitu tallentaa. Oletko varmasti sisäänkirjautunut kurssisivustolle?",
        ErrorSaveOther: "Tapahtui odottamaton virhe, jonka vuoksi koodia ei voitu tallentaa.",
        PromptLoginToLoad: "Aiemmin tallennetun ohjelmakoodin lataaminen kurssipalvelimelta edellyttää sisäänkirjautumista.",
        PromptLoginToSave: "Ohjelmakoodin tallentaminen kurssipalvelimelle edellyttää sisäänkirjautumista.",
        InformCodeSaved: "Ohjelmakoodisi on tallennettu.",
        PromptSavingEmptyProgram: "Olet tallentamassa pelkkää tyhjää, joka ylikirjoittaa mahdollisen aiemmin tallennetun ohjelmakoodin.\n\nHaluatko varmasti jatkaa?",
        ErrorRequestFailed: "Seuraavaan osoitteeseen lähetetty pyyntö epäonnistui:\n",
        InformSavedCodeLoaded: "Aiemmin tallennettu ohjelmakoodi on ladattu.",
        InformSavedCodeNotFound: "Aiemmin tallennettua ohjelmakoodia ei löytynyt.",
        LabelGradeReportTitle: "Arvosanatiedote",
        LabelGradeReportThisAssignment: "Tämä tehtävä:",
        LabelGradeReportNumOfAssignments: "Arvioitujen tehtävien määrä:",
        LabelGradeReportAverageScore: "Pisteiden keskiarvo:",
        ErrorNoGradeInformationReceived: "Kurssipalvelin ei palauttanut arvostelutietoja",
        LabelAssignmentFeedbackTitle: "Tehtäväpalaute",
        LabelCodeRunErrorTitle: "Virheilmoitus",
        LabelCodeRunErrorDescription: "Virheen kuvaus",
        LabelCodeRunErrorFixing: "Korjausvihjeitä",
        ErrorFileNotFound: "Seuraavaa tiedostoa ei löydy:",
        LabelAudioTourTitle: "Tervetuloa ääniselitteiden pariin!",
        LabelAudioTourBtnFirst: "Toista ensimmäinen ääniselite",
        LabelAudioTourBtnPrevious: "Toista edellinen ääniselite",
        LabelAudioTourBtnPause: "Pysäytä parhaillaan toistettava ääniselite",
        LabelAudioTourBtnNext: "Toista seuraava ääniselite",
        LabelAudioTourBtnLast: "Toista viimeinen ääniselite",
        InformAudioTourStartingTour: "Aletaan toistamaan ääniselitettä",
        ErrorAudioTourBrowserDoesntSupport: "Selaimesi ei tue ääniselitteen toistamista",
        InformAudioTourEndedPrefix: "Ääniselitteen ",
        InformAudioTourEndedPostfix: " toistaminen on päättynyt",
        InformAudioTourPlayingPrefix: "Toistetaan ääniselitettä ",
        InformAudioTourLoading: "Ladataan ääniselitettä.  Ole hyvä ja odota.  Jos ääniselitteen toisto ei ala pian, sulje tämä ikkuna ja yritä uudelleen.",
        LabelAudioTourBtnPauseCurrent: "Pysäytä parhaillaan toistettava ääniselite",
        LabelAudioTourBtnPlayPaused: "Toista pysäytetty ääniselite",
        LabelInputForProgram: "Ohjelman saama syöte",
        ErrorCompileErrors: "Ohjelmakoodia käännettäessä sattuivat alla kuvatut virheet:",
        ErrorTimeLimitExceeded: "Ohjelman suorittaminen kesti liian pitkään",
        ErrorServerError: "Tapahtui seuraava palvelinvirhe: ",
        InformCompilingCode: "Ohjelmakoodia käännetään ja suoritetaan...",
        ErrorServerCommunication: "Virhe tiedonsiirrossa palvelimen kanssa.",
        LabelError: "Virhe",
        LabelScratchActiveCode: "Scratch ActiveCode",

        ErrorFromCodeRun_ParseError:
                "<i>Parse error</i> eli <i>jäsennysvirhe</i> tarkoittaa, ettei Python-tulkki/kääntäjä ymmärrä jotain virheessä osoitetulla rivillä olevaa ohjelmakoodinosaa. " +
                "Yleisiä syitä tähän ovat esimerkiksi parametreja toisistaan erottavien pilkkujen tai esimerkiksi for-lauseeseen kuuluvan kaksoispisteen unohtaminen.",

        ErrorFromCodeRun_ParseErrorFix:
                "Jäsennysvirheen korjaamiseksi täytyy virheilmoituksessa osoitettua ohjelmakoodiriviä sekä sitä edeltävää koodia tarkastella huolellisesti " +
                "yrittäen löytää kohta, joka ei ole Python-kielen kieliopin mukainen. Virheilmoituksessa ilmoitettu kohta ohjelmakoodissa on kohta, jolla koodia " +
                "ymmärtää yrittävä tulkki tai kääntäjä ei enää pysty tulkitsemaan sitä Pythonin kielioppisääntöjen mukaisesti; tämä kohta ei kuitenkaan " +
                "välttämättä ole se, jolla kieliopista poikkeaminen on tapahtunut: Usein esimerkiksi edellisen rivin lopusta on unohtunut pilkku, kaksoispiste, " +
                "plus-merkki tai muu sellainen, mikä huomataan vasta myöhemmin, jossain vaiheessa tätä kohtaa seuraavan ohjelmakoodin tulkitsemista yritettäessä. " +
                "<br /><br />Kannattaa myös muistaa, että usein ihminen on sokea omille virheilleen ja virhe, jota itse ei ole millään löytää, saattaa pistää toisen " +
                "ihmisen silmiin kuin suuri punainen rasti keskellä koodia. Kannattaa siis pyytää Pythonia ymmärtävää kaveria vilkaisemaan, ellei itse keksi, " +
                "missä ongelma sijaitsee.",

        ErrorFromCodeRun_TypeError:
                "<i>Type error</i> eli <i>tyyppivirhe</i> seuraa usein tilanteesta, jossa lausekkeessa yritetään yhdistää kaksi oliota tavalla, joka ei ole sallittua. " +
                "Esimerkiksi merkkijonon korottaminen potenssiin tai jakaminen luvulla ei tarkoita mitään järkevää, ellei tllaisia operaatioita erikseen määritellä.",

        ErrorFromCodeRun_TypeErrorFix:
                "Tyyppivirheen korjaamiseksi kannattaa varmistaa, että ohjelmakoodin jokaisella muuttujalla on juuri se tyyppi, jonka sillä olettaa olevan. " +
                "Voi myös olla hyödyllistä lisätä ohjelmaan väliaikaisia tulostuskäskyjä muuttujien arvojen tulostamiseksi.",

        ErrorFromCodeRun_NameError:
                "<i>Name error</i> eli <i>nimivirhe</i> tarkoittaa lähes aina, että joko muuttujaa on käytetty ennen kuin sillä on arvo, tai jokin " +
                "ohjelmakoodiin sisältyvistä nimistä (muuttujat, funktiot, oliot ja niin edelleen) on väärin kirjoitettu. Python-koodia lukeva tulkki/kääntäjä ei " +
                "voi tietää, onko jonkin nimen tarkoitus olla juuri sellainen vai onko se väärin kirjoitettu; tietokone ei ymmärrä mitään samoin kuin ihminen.",

        ErrorFromCodeRun_NameErrorFix:
                "Tarkastele ohjelmakoodia selvittääksesi, onko virheilmoituksen osoittama nimi oikein kirjoitettu, ja jos on, niin onko se määritelty ja onko " +
                "kyseinen määrittely varmasti oikein kirjoitettu.",

        ErrorFromCodeRun_ValueError:
                "<i>Value error</i> eli <i>arvovirhe</i> tarkoittaa, että ohjelmassa yritetään käyttää jotain arvoa tavalla, joka ei ole sallittu. " +
                "Eräs mahdollisuus virheen syyksi on, että funktio olettaa saavansa parametrikseen toisen tyyppisen arvon kuin mitä se todellisuudessa saa. " +
                "Toisaalta, ohjelma saattaa esimerkiksi yrittää vertailla toisiinsa vaikkapa funktiota ja lukuarvoa (esim. \"2 < print\"), mikä ei tietenkään " +
                "oletettavasti tarkoita mitään.",

        ErrorFromCodeRun_ValueErrorFix:
                "Virheen sijainti ja virheellinen arvo selviävät mahdollisesti suoraan virheilmoituksesta. Nämä tietäen kannattaa etsiä virheellisen arvon sisältävä " +
                "kohta sekä selvittää, miksi tässä kohdassa vaaditaan toisenlainen arvo sekä miksi siinä kohdassa todellisuudessa oli vääränlainen arvo.",

        ErrorFromCodeRun_AttributeError:
                "<i>Attribute error</i> eli <i>ominaisuusvirhe</i> kertoo, ettei pisteen vasemmalla puolella olevalla oliolla ole pisteen oikealla puolella " +
                "mainittua ominaisuutta tai metodia.",

        ErrorFromCodeRun_AttributeErrorFix:
                "Yleisimmin tämä virhe ilmoittaa, ettei oliolla \"undefined\" ole jotain attribuuttia X. Tästä voi päätellä, että joko pisteen oikealla puolella on " +
                "kirjoitusvirhe, tai sen vasemmalla puolella olio ei todellisuudessa ole se, joka sen on tarkoitettu olevan. Oliomuuttujan arvojen järjestelmällinen " +
                "tulostaminen useassa kohdassa ennen virhettä auttaa huomaamaan, missä kohden muuttujan arvoksi tulee \"undefined\".",

        ErrorFromCodeRun_TokenError: "<i>Token error</i> eli <i>symbolivirhe</i> tarkoittaa usein käytännössä, että oikeanpuoleinen sulje- tai lainausmerkki on unohtunut.",

        ErrorFromCodeRun_TokenErrorFix: "Kannattaa varmistaa, että ohjelman jokaisella avaavalla sulkeella on vastaava sulkeva pari ja että ne ovat oikeassa järjestyksessä.",

        ErrorFromCodeRun_TimeLimitError:
                "Ohjelman suoritus kestää liian pitkään. Tämän oppikirjan ohjelmista suurimman osan suorituksen pitäisi kestää korkeintaan 10 sekuntia. " +
                "Eräs syy tähän virheeseen on, että ohjelmassa on päättymätön silmukka.",

        ErrorFromCodeRun_TimeLimitErrorFix:
                "Kannattaa lisätä ohjelmaan sopiviin kohtiin tulostuslauseita, joiden tulosteista voi päätellä, ettei ohjelmassa ole päättymätöntä silmukkaa. Jos " +
                "tällaista silmukkaa ei löydy, voi kokeilla kasvattaa ohjelmalle asetettua suoritusaikarajaa kutsulla sys.setExecutionLimit(<i>millisekuntimäärä</i>).",

        ErrorFromCodeRun_Error:
                "Ohjelman suoritus kestää liian pitkään. Tämän oppikirjan ohjelmista suurimman osan suorituksen pitäisi kestää korkeintaan 10 sekuntia. " +
                "Eräs syy tähän virheeseen on, että ohjelmassa on päättymätön silmukka.",

        ErrorFromCodeRun_ErrorFix:
                "Kannattaa lisätä ohjelmaan sopiviin kohtiin tulostuslauseita, joiden tulosteista voi päätellä, ettei ohjelmassa ole päättymätöntä silmukkaa. Jos " +
                "tällaista silmukkaa ei löydy, voi kokeilla kasvattaa ohjelmalle asetettua suoritusaikarajaa kutsulla sys.setExecutionLimit(<i>millisekuntimäärä</i>).",

        ErrorFromCodeRun_SyntaxError:
                "<i>Syntax error</i> eli <i>kielioppivirhe</i> tarkoittaa, ettei Python-tulkki/kääntäjä ymmärrä jonkin lauseen kielioppia, koska lause " +
                "ei ole Python-kielen mukainen. Tällaisia tilanteita ovat esimerkiksi sijoittaminen lukuun (23 = muuttuja) tai funktioon (auto.aja() = \"heippa\").",

        ErrorFromCodeRun_SyntaxErrorFix:
                 "Kannattaa tarkistaa sijoituslauseet varmistaen, että niiden vasemmat puolet ovat muuttujia eivätkä esimerkiksi lukuja, muuttujia tai functioita.",

        ErrorFromCodeRun_IndexError:
                "<i>Index error</i> eli <i>osoitusvirhe</i> tarkoittaa, että ohjelmakoodissa yritetään osoittaa esimerkiksi merkkijonon tai listan \"reunojen\" ulkopuolelle. " +
                "Tämä virhe sattuu esimerkiksi yritettäessä osoittaa kolmialkioisen listan alkioita numeroilla 3 tai -4 (listan alkioiden numerot ovat 0, 1 ja 2).",

        ErrorFromCodeRun_IndexErrorFix:
                "Muista, että listan ensimmäisen alkion numero on 0 sekä että vaikkapa 6-alkioisen listan viimeisen alkion numero on 5. Usein on kyse " +
                "yksinkertaisesesta ajatus- tai laskuvirheestä, josta käytetään englanniksi nimeä off-by-one (yhdellä ohi): Laskeminen alkaa tai päättyy " +
                "yhden alkion päässä siitä/siinä, mistä/missä sen todellisuudessa tulisi alkaa/päättyä.",

        ErrorFromCodeRun_URIError: "",
        ErrorFromCodeRun_URIErrorFix: "",

        ErrorFromCodeRun_ImportError:
                "<i>Import error</i> eli <i>tuontivirhe</i> tarkoittaa, että ohjelmakoodi yrittää tuoda import-lauseella käyttöön moduulia, jota ei löydy.",

        ErrorFromCodeRun_ImportErrorFix:
                "Ensimmäiseksi kannattaa tarkistaa, että import-lauseessa olevat nimet on kirjoitettu oikein. Toinen mahdollisuus on, että ladattavaksi " +
                "tarkoitettu moduuli on olemassa \"oikeassa\" Python-ympäristössä, mutta ei tässä selainpohjaisessa Python-toteutuksessa. Jälkimmäisessä " +
                "tapauksessa on mahdollista lähettää tämän Python-toteutuksen kehittäjille pyyntö kyseisen moduulin lisäämiseksi.",

        ErrorFromCodeRun_ReferenceError: "Tämä on todennäköisesti sisäinen virhe erityisesti silloin, jos virheilmoitus viittaa konsoliin.",

        ErrorFromCodeRun_ReferenceErrorFix: "Ensimmäisenä kannattaa kokeilla uudelleenladata tämä web-sivu selaimeen. Jollei se auta, voi tämän " +
                "Python-toteutuksen kehittäjille lähettää virheilmoituksen sekä ohjelmakoodin, joka sillä oli tarkoitus suorittaa.",

        ErrorFromCodeRun_ZeroDivisionError:
                "<i>Zero division error</i> eli <i>nollallajakovirhe</i> ilmoittaa, että ohjelmakoodissa yritettiin jakaa jotain lukua nollalla (mitä ei ole määritelty).",

        ErrorFromCodeRun_ZeroDivisionErrorFix:
                "Ensimmäiseksi kannattaa miettiä, onko virheilmoituksen tarkoittamassa kohdassa sallittua olla arvo nolla; jokin aiempi osa ohjelmakoodia " +
                "saattaa vahingossa esimerkiksi asettaa jakajana käytetylle muuttujalle arvon nolla. Nollalla jakamista vastaan voi luonnollisestikin suojautua " +
                "vaikkapa if-lauseita käyttäen. Ohjelman ulkopuolelta saatujen syötteiden (esimerkiksi käyttäjältä luetut arvot) kelvollisuus täytyy aina tarkistaa, " +
                "ja virheellisistä syötteistä tulee jollain tavoin antaa virheilmoitus.",

        ErrorFromCodeRun_RangeError:
                "Tämä virheilmoitus tarkoittaa lähes aina, että kutsupinon maksimikoko on ylitetty, eli ohjelma on tehnyt sisäkkäisiä kutsuja " +
                "enemmän, kuin mitä niiden käyttöön varatulle muistialueelle mahdutaan tallentamaan.",

        ErrorFromCodeRun_RangeErrorFix:
                "Alkeisesimerkki tämän virheen syystä on funktio, joka kutsuu itse itseään (ns. rekursion yksinkertaisin muoto) ilman kelvollista " +
                "lopetusehtoa. Jollei rekursiota tietoisesti harjoittele tai käytä, ei todennäköisesti halua näin tapahtuvan. Tällöin kannattaa " +
                "tarkistaa, ettei ohjelmakoodissa ole itseään tai toisiaan sisäkkäin kutsuvia funktioita. Muussa tapauksessa kannattaa tarkistaa " +
                "ehdot, joiden on tarkoitus aiheuttaa rekursion päättyminen hallitusti.",

        ErrorFromCodeRun_InternalError: "<i>Internal error</i> eli <i>sisäinen virhe</i> tarkoittaa, että tästä selainpohjaisesta Python-toteutuksesta on löytynyt virhe.",

        ErrorFromCodeRun_InternalErrorFix:
                "Tästä virheestä kannattaa lähettää tämän Python-toteutuksen kehittäjille virheraportti, jonka mukana on suoritettavaksi aiottu ohjelmakoodi.",

        ErrorFromCodeRun_IndentationError:
                "<i>Indentation error</i> eli <i>sisennysvirhe</i> johtuu siitä, ettei ohjelmakoodia ole sisennetty kelvollisesti. Tämä tapahtuu " +
                "todennäköisimmin if-, for-, while- ja def-lauseiden yhteydessä.",

        ErrorFromCodeRun_IndentationErrorFix:
                "Tarkista ohjelmasi if-, def-, for- ja while-lauseet ollaksesi varma, että niihin liittyvät koodilohkot ovat oikein sisennetyt. " +
                "Eräs mahdollinen syy tämän virheen taustalla on ohjelmakoodin kopioiminen paikasta toiseen tai käyttämättömän ohjelmakoodin unohtaminen lojumaan jonnekin.",

        ErrorFromCodeRun_NotImplementedError:
                "<i>Not implemented error</i> eli <i>toteutuksenpuutevirhe</i> aiheutuu yritettäessä käyttää \"oikeiden\" Python-toteutusten mukana " +
                "seuraavasta ohjelmakirjastosta (ns. standardikirjasto eli aina jonkin kielen kehitystyökalujen mukana saatava kirjasto) funktiota, jota ei " +
                "tässä selainpohjaisessa Python-toteutuksessa ole toteutettu.",

        ErrorFromCodeRun_NotImplementedErrorFix:
                "Tällä hetkellä ainoa ratkaisu on olla käyttämättä funktiota, jota virheilmoitus koskee. Kannattaa myös miettiä, voisiko kyseisen funktion käytön " +
                "jollain tavoin kiertää. Jos tätä funktiota todella välttämättä tarvitaan, voi tämän selainpohjaisen Python-toteutuksen kehittäjille lähettää " +
                "toteutuspyynnön, jossa kerrotaan myös, miten funktiota yritettiin/halutaan käyttää.",

        ErrorFromCodeRun_IOError:
                "Ohjelmakoodissa yritettiin lukea jotain jostain <i>(input)</i> tai kirjoittaa jotain jonnekin <i>(output)</i>, mutta operaatiota ei voitu " +
                "suorittaa kelvollisesti loppuun. Tähän on lukemattomia tapauskohtaisia syitä, kuten väärät tiedosto- ja hakemistonimet, tietostojärjestelmän " +
                "vioittuminen, ruuhkainen tai katkennut verkkoyhteys sekä fyysiset laitevauriot.",

        ErrorFromCodeRun_IOErrorFix:
                "Jos ohjelmasi yritti esimerkiksi lukea kuvatiedostoa, varmista kyseisen tiedoston nimen ja polun oikeellisuus.",
    },
};


var edList = {};

ActiveCode.prototype = new RunestoneBase();

// separate into constructor and init

function ActiveCode(opts) {
    if (opts) {
        this.init(opts);
    }
}

ActiveCode.prototype.init = function(opts) {
    RunestoneBase.apply( this, arguments );  // call parent constructor
    var suffStart = -1;
    var orig = opts.orig;
    this.useRunestoneServices = opts.useRunestoneServices;
    this.python3 = opts.python3;
    this.alignVertical = opts.vertical;
    this.origElem = orig;
    this.divid = orig.id;
    this.code = $(orig).text() || "\n\n\n\n\n";
    this.language = $(orig).data('lang');
    this.timelimit = $(orig).data('timelimit');
    this.includes = $(orig).data('include');
    this.hidecode = $(orig).data('hidecode');
    this.runButton = null;
    this.saveButton = null;
    this.loadButton = null;
    this.outerDiv = null;
    this.output = null; // create pre for output
    this.graphics = null; // create div for turtle graphics
    this.codecoach = null;
    this.codelens = null;

    if(this.includes !== undefined) {
        this.includes = this.includes.split(/\s+/);
    }

    suffStart = this.code.indexOf('====');
    if (suffStart > -1) {
        this.suffix = this.code.substring(suffStart+5);
        this.code = this.code.substring(0,suffStart);
    }

    this.createEditor();
    this.createOutput();
    this.createControls();
    if ($(orig).data('hidecaption')) {
        this.hidecaption = true;
    } else {
        this.hidecaption = false;
    }
    if ($(orig).data('caption')) {
        this.caption = $(orig).data('caption');
    } else {
        this.caption = "";
    }
    this.addCaption();

    if ($(orig).data('autorun')) {
        $(document).ready(this.runProg.bind(this));
    }
};

ActiveCode.prototype.createEditor = function(index) {
    var newdiv = document.createElement('div');
    var linkdiv = document.createElement('div');
    linkdiv.id = this.divid.replace(/_/g,'-').toLowerCase();  // :ref: changes _ to - so add this as a target
    $(newdiv).addClass("ac_section alert alert-warning");
    var codeDiv = document.createElement("div");
    $(codeDiv).addClass("ac_code_div col-md-12");
    this.codeDiv = codeDiv;
    newdiv.id = this.divid;
    newdiv.lang = this.language;
    this.outerDiv = newdiv;

    $(this.origElem).replaceWith(newdiv);
    if (linkdiv.id !== this.divid) {  // Don't want the 'extra' target if they match.
        newdiv.appendChild(linkdiv);
    }
    newdiv.appendChild(codeDiv);
    var editor = CodeMirror(codeDiv, {value: this.code, lineNumbers: true, mode: newdiv.lang});

    // Make the editor resizable
    $(editor.getWrapperElement()).resizable({
        resize: function() {
            editor.setSize($(this).width(), $(this).height());
            editor.refresh();
        }
    });

    // give the user a visual cue that they have changed but not saved
    editor.on('change', (function() {
        if (editor.acEditEvent == false || editor.acEditEvent === undefined) {
            $(editor.getWrapperElement()).css('border-top', '2px solid #b43232');
            $(editor.getWrapperElement()).css('border-bottom', '2px solid #b43232');
            this.logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': this.divid});
    }
        editor.acEditEvent = true;
        }).bind(this));  // use bind to preserve *this* inside the on handler.

    this.editor = editor;
    if (this.hidecode) {
        $(this.codeDiv).css("display","none");
    }
};

ActiveCode.prototype.createControls = function() {
    var ctrlDiv = document.createElement("div");
    $(ctrlDiv).addClass("ac_actions");

    // Run
    var butt = document.createElement("button");
    $(butt).text(getLocalizedString(activeCodeLocalizationColl, "RunButtonCaption"));
    $(butt).addClass("btn btn-success");
    ctrlDiv.appendChild(butt);
    this.runButton = butt;
    $(butt).click(this.runProg.bind(this));

    // Save
    if (this.useRunestoneServices) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "SaveButtonCaption"));
        $(butt).css("margin-left", "10px");
        this.saveButton = butt;
        this.saveButton.onclick = this.saveEditor.bind(this);
        ctrlDiv.appendChild(butt);
        if (this.hidecode) {
            $(butt).css("display", "none");
        }
    }
    // Load
    if (this.useRunestoneServices) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "LoadButtonCaption"));
        $(butt).css("margin-left", "10px");
        this.loadButton = butt;
        this.loadButton.onclick = this.loadEditor.bind(this);
        ctrlDiv.appendChild(butt);
        if (this.hidecode) {
            $(butt).css("display", "none");
        }
    }
    if ($(this.origElem).data('gradebutton')) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "FeedbackButtonCaption"));
        $(butt).css("margin-left","10px");
        this.gradeButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.createGradeSummary.bind(this));
    }
    // Show/Hide Code
    if (this.hidecode) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "ShowHideCodeButtonCaption"));
        $(butt).css("margin-left", "10px");
        this.showHideButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click( (function() { $(this.codeDiv).toggle();
        $(this.loadButton).toggle();
        $(this.saveButton).toggle();
        }).bind(this));
    }

    // CodeLens
    if ($(this.origElem).data("codelens")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "CodeLensButtonCaptionShow"));
        $(butt).css("margin-left", "10px");
        this.clButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodelens.bind(this));
    }
    // CodeCoach
    if (this.useRunestoneServices && $(this.origElem).data("coach")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "CodeCoachButtonCaption"));
        $(butt).css("margin-left", "10px");
        this.coachButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodeCoach.bind(this));
    }

    // Audio Tour
    if ($(this.origElem).data("audio")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text(getLocalizedString(activeCodeLocalizationColl, "AudioTourButtonCaption"));
        $(butt).css("margin-left", "10px");
        this.atButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click((function() {new AudioTour(this.divid, this.editor.getValue(), 1, $(this.origElem).data("audio"))}).bind(this));
    }

    $(this.outerDiv).prepend(ctrlDiv);

};

ActiveCode.prototype.createOutput = function() {
    // Create a parent div with two elements:  pre for standard output and a div
    // to hold turtle graphics output.  We use a div in case the turtle changes from
    // using a canvas to using some other element like svg in the future.
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output col-md-6");
    this.outDiv = outDiv;
    this.output = document.createElement('pre');
    $(this.output).css("visibility","hidden");

    this.graphics = document.createElement('div');
    this.graphics.id = this.divid + "_graphics";
    $(this.graphics).addClass("ac-canvas");
    // This bit of magic adds an event which waits for a canvas child to be created on our
    // newly created div.  When a canvas child is added we add a new class so that the visible
    // canvas can be styled in CSS.  Which a the moment means just adding a border.
    $(this.graphics).on("DOMNodeInserted", 'canvas', (function(e) {
        $(this.graphics).addClass("visible-ac-canvas");
    }).bind(this));

    outDiv.appendChild(this.output);
    outDiv.appendChild(this.graphics);
    this.outerDiv.appendChild(outDiv);

    clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);


    var lensDiv = document.createElement("div");
    $(lensDiv).addClass("col-md-6");
    $(lensDiv).css("display","none");
    this.codelens = lensDiv;
    this.outerDiv.appendChild(lensDiv);

    clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};

ActiveCode.prototype.disableSaveLoad = function() {
    $(this.saveButton).addClass('disabled');
    $(this.saveButton).attr('title', getLocalizedString(activeCodeLocalizationColl, "PromptLoginToSave"));
    $(this.loadButton).addClass('disabled');
    $(this.loadButton).attr('title', getLocalizedString(activeCodeLocalizationColl, "PromptLoginToLoad"));
};

ActiveCode.prototype.addCaption = function() {
    //someElement.parentNode.insertBefore(newElement, someElement.nextSibling);

    if (eBookConfig.hideControlCaptions == false) {
        var capDiv = document.createElement('p');
        $(capDiv).html(this.caption + " (" + this.divid + ")");
        $(capDiv).addClass("ac_caption");
        $(capDiv).addClass("ac_caption_text");

        this.outerDiv.parentNode.insertBefore(capDiv, this.outerDiv.nextSibling);
    }
};

ActiveCode.prototype.saveEditor = function() {
    var res;
    var saveSuccess = function(data, status, whatever) {
        if (data.redirect) {
            alert(getLocalizedString(activeCodeLocalizationColl, "ErrorSaveRedirected"));
        } else if (data == "") {
            alert(getLocalizedString(activeCodeLocalizationColl, "ErrorSaveOther"));
        }
        else {
            var acid = eval(data)[0];
            if (acid.indexOf("ERROR:") == 0) {
                alert(acid);
            } else {
                // use a tooltip to provide some success feedback
                var save_btn = $(this.saveButton);
                save_btn.attr('title', getLocalizedString(activeCodeLocalizationColl, "InformCodeSaved"));
                opts = {
                    'trigger': 'manual',
                    'placement': 'bottom',
                    'delay': { show: 100, hide: 500}
                };
                save_btn.tooltip(opts);
                save_btn.tooltip('show');
                setTimeout(function() {
                    save_btn.tooltip('destroy');
                }, 4000);

                $('#' + acid + ' .CodeMirror').css('border-top', '2px solid #aaa');
                $('#' + acid + ' .CodeMirror').css('border-bottom', '2px solid #aaa');
            }
        }
    }.bind(this);

    var data = {acid: this.divid, code: this.editor.getValue()};
    data.lang = this.language;
    if (data.code.match(/^\s+$/)) {
        res = confirm(getLocalizedString(activeCodeLocalizationColl, "PromptSavingEmptyProgram"));
        if (! res) {
            return;
        }
    }
    $(document).ajaxError(function(e, jqhxr, settings, exception) {
        alert(getLocalizedString(activeCodeLocalizationColl, "ErrorRequestFailed") + settings.url);
    });
    jQuery.post(eBookConfig.ajaxURL + 'saveprog', data, saveSuccess);
    if (this.editor.acEditEvent) {
        this.logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': this.divid}); // Log the run event
        this.editor.acEditEvent = false;
    }
    this.logBookEvent({'event': 'activecode', 'act': 'save', 'div_id': this.divid}); // Log the run event

};

ActiveCode.prototype.loadEditor = function() {

    var loadEditor = (function(data, status, whatever) {
        // function called when contents of database are returned successfully
        var res = eval(data)[0];

        if (res.source) {
            this.editor.setValue(res.source);
            setTimeout(function() {
                this.editor.refresh();
            }.bind(this),500);
            $(this.loadButton).tooltip({'placement': 'bottom',
                             'title': getLocalizedString(activeCodeLocalizationColl, "InformSavedCodeLoaded"),
                             'trigger': 'manual'
                            });
        } else {
            $(this.loadButton).tooltip({'placement': 'bottom',
                             'title': getLocalizedString(activeCodeLocalizationColl, "InformSavedCodeNotFound"),
                             'trigger': 'manual'
                            });
        }
        $(this.loadButton).tooltip('show');
        setTimeout(function() {
            $(this.loadButton).tooltip('destroy');
        }.bind(this), 4000);
    }).bind(this);

    var data = {acid: this.divid};
    if (this.sid !== undefined) {
        data['sid'] = this.sid;
    }
    this.logBookEvent({'event': 'activecode', 'act': 'load', 'div_id': this.divid}); // Log the run event
    jQuery.get(eBookConfig.ajaxURL + 'getprog', data, loadEditor);

};

ActiveCode.prototype.createGradeSummary = function() {
    // get grade and comments for this assignment
    // get summary of all grades for this student
    // display grades in modal window
    var showGradeSummary = function(data, status, whatever) {
        var report = eval(data)[0];
        // check for report['message']
        if (report) {
            body = "<h4>" + getLocalizedString(activeCodeLocalizationColl, "LabelGradeReportTitle") + "</h4>" +
                   "<p>" + getLocalizedString(activeCodeLocalizationColl, "LabelGradeReportThisAssignment") + " " + report['grade'] + "</p>" +
                   "<p>" + report['comment'] + "</p>" +
                   "<p>" + getLocalizedString(activeCodeLocalizationColl, "LabelGradeReportNumOfAssignments") + " " + report['count'] + "</p>" +
                   "<p>" + getLocalizedString(activeCodeLocalizationColl, "LabelGradeReportAverageScore") + " " + report['avg'] + "</p>"

        } else {
            body = "<h4>" + getLocalizedString(activeCodeLocalizationColl, "ErrorNoGradeInformationReceived") + "</h4>";
        }
        var html = '<div class="modal fade">' +
            '  <div class="modal-dialog compare-modal">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header">' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '        <h4 class="modal-title">' + getLocalizedString(activeCodeLocalizationColl, "LabelAssignmentFeedbackTitle") + '</h4>' +
            '      </div>' +
            '      <div class="modal-body">' +
            body +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        el = $(html);
        el.modal();
    };
    var data = {'div_id': this.divid};
    jQuery.get(eBookConfig.ajaxURL + 'getassignmentgrade', data, showGradeSummary);
};

ActiveCode.prototype.hideCodelens = function(button, div_id) {
    this.codelens.style.display = 'none';
};

ActiveCode.prototype.showCodelens = function() {

    if (this.codelens.style.display == 'none') {
        this.codelens.style.display = 'block';
        this.clButton.innerText = getLocalizedString(activeCodeLocalizationColl, "CodeLensButtonCaptionHide");
    } else {
        this.codelens.style.display = "none";
        this.clButton.innerText = getLocalizedString(activeCodeLocalizationColl, "CodeLensButtonCaptionShowIn");
        return;
    }

    var cl = this.codelens.firstChild;
    if (cl) {
        div.removeChild(cl);
    }
    var code = this.editor.getValue();
    var myVars = {};
    myVars.code = code;
    myVars.origin = "opt-frontend.js";
    myVars.cumulative = false;
    myVars.heapPrimitives = false;
    myVars.drawParentPointers = false;
    myVars.textReferences = false;
    myVars.showOnlyOutputs = false;
    myVars.rawInputLstJSON = JSON.stringify([]);
    if (this.python3) {
        myVars.py = 3;
    } else {
        myVars.py = 2;
    }
    myVars.curInstr = 0;
    myVars.codeDivWidth = 350;
    myVars.codeDivHeight = 400;
    var srcURL = '//pythontutor.com/iframe-embed.html';
    var embedUrlStr = $.param.fragment(srcURL, myVars, 2 /* clobber all */);
    var myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", this.divid + '_codelens');
    myIframe.setAttribute("width", "800");
    myIframe.setAttribute("height", "500");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    //myIframe.setAttribute("src",srcURL)
    myIframe.src = embedUrlStr;
    this.codelens.appendChild(myIframe);
    this.logBookEvent({
        'event': 'codelens',
        'act': 'view',
        'div_id': this.divid
    });

};

// <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
// </iframe>


ActiveCode.prototype.showCodeCoach = function(div_id) {
    var myIframe;
    var srcURL;
    var cl;
    if (this.codecoach === null) {
        this.codecoach = document.createElement("div");
        this.codecoach.style.display = 'block';
    }

    cl = this.codecoach.firstChild;
    if (cl) {
        this.codecoach.removeChild(cl);
    }

    srcURL = eBookConfig.app + '/admin/diffviewer?divid=' + div_id;
    myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", div_id + '_coach');
    myIframe.setAttribute("width", "800px");
    myIframe.setAttribute("height", "500px");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    myIframe.style.width = "100%";
    myIframe.src = srcURL;
    this.codecoach.appendChild(myIframe);
    logBookEvent({
        'event': 'coach',
        'act': 'view',
        'div_id': this.divid
    });
};


ActiveCode.prototype.toggleEditorVisibility = function() {

};

ActiveCode.prototype.addErrorMessage = function(err) {
    //logRunEvent({'div_id': this.divid, 'code': this.prog, 'errinfo': err.toString()}); // Log the run event
    var errHead = $('<h3>').html(getLocalizedString(activeCodeLocalizationColl, "LabelCodeRunErrorTitle"));
    this.eContainer = this.outerDiv.appendChild(document.createElement('div'));
    this.eContainer.className = 'error alert alert-danger';
    this.eContainer.id = this.divid + '_errinfo';
    this.eContainer.appendChild(errHead[0]);
    var errText = this.eContainer.appendChild(document.createElement('pre'));
    var errString = err.toString();
    var to = errString.indexOf(":");
    var errName = errString.substring(0, to);
    errText.innerHTML = errString;
    $(this.eContainer).append('<h3>' + getLocalizedString(activeCodeLocalizationColl, "LabelCodeRunErrorDescription") + '</h3>');
    var errDesc = this.eContainer.appendChild(document.createElement('p'));
    errDesc.innerHTML = getLocalizedString(activeCodeLocalizationColl, "ErrorFromCodeRun_" + errName);
    $(this.eContainer).append('<h3>' + getLocalizedString(activeCodeLocalizationColl, "LabelCodeRunErrorFixing") + '</h3>');
    var errFix = this.eContainer.appendChild(document.createElement('p'));
    errFix.innerHTML = getLocalizedString(activeCodeLocalizationColl, "ErrorFromCodeRun_" + errName + 'Fix');
    var moreInfo = '../ErrorHelp/' + errName.toLowerCase() + '.html';
    //console.log("Runtime Error: " + err.toString());
};

ActiveCode.prototype.setTimeLimit = function(timer) {
    var timelimit = this.timeLimit;
    if (timer !== undefined ) {
        timelimit = timer;
    }
    // set execLimit in milliseconds  -- for student projects set this to
    // 25 seconds -- just less than Chrome's own timer.
    if (this.code.indexOf('ontimer') > -1 ||
        this.code.indexOf('onclick') > -1 ||
        this.code.indexOf('onkey') > -1  ||
        this.code.indexOf('setDelay') > -1 ) {
        Sk.execLimit = null;
    } else {
        if (timelimit === "off") {
            Sk.execLimit = null;
        } else if (timelimit) {
            Sk.execLimit = timelimit;
        } else {
            Sk.execLimit = 25000;
    }
    }

};

ActiveCode.prototype.builtinRead = function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw getLocalizedString(activeCodeLocalizationColl, "ErrorFileNotFound") + " '" + x + "'";
        return Sk.builtinFiles["files"][x];
};

ActiveCode.prototype.outputfun = function(text) {
    // bnm python 3
    pyStr = function(x) {
        if (x instanceof Array) {
            return '[' + x.join(", ") + ']';
        } else {
            return x;
        }
    };

    var x = text;
    if (! this.python3 ) {
        if (x.charAt(0) == '(') {
            x = x.slice(1, -1);
            x = '[' + x + ']';
            try {
                var xl = eval(x);
                xl = xl.map(pyStr);
                x = xl.join(' ');
            } catch (err) {
            }
        }
    }
    $(this.output).css("visibility","visible");
    text = x;
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        $(this.output).append(text);
    };

ActiveCode.prototype.buildProg = function() {
    // assemble code from prefix, suffix, and editor for running.
    var pretext;
    var prog = this.editor.getValue();
    if (this.includes !== undefined) {
        // iterate over the includes, in-order prepending to prog
        pretext = "";
        for (var x=0; x < this.includes.length; x++) {
            pretext = pretext + edList[this.includes[x]].editor.getValue();
            }
        prog = pretext + prog;
    }

    if(this.suffix) {
        prog = prog + this.suffix;
}

    return prog;
};

ActiveCode.prototype.runProg = function() {
        var prog = this.buildProg();

        $(this.output).text('');

        $(this.eContainer).remove();
        Sk.configure({output : this.outputfun.bind(this),
              read   : this.builtinRead,
              python3: this.python3,
              imageProxy : 'http://image.runestone.academy:8080/320x'
        });
        Sk.divid = this.divid;
        this.setTimeLimit();
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
        Sk.canvas = this.graphics.id; //todo: get rid of this here and in image
        $(this.runButton).attr('disabled', 'disabled');
        $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
        $(this.outDiv).show({duration:700,queue:false});
        var myPromise = Sk.misceval.asyncToPromise(function() {

            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });

        myPromise.then((function(mod) { // success
            $(this.runButton).removeAttr('disabled');
            this.logRunEvent({'div_id': this.divid, 'code': prog, 'errinfo': 'success'}); // Log the run event
        }).bind(this),
            (function(err) {  // fail
            $(this.runButton).removeAttr('disabled');
            this.addErrorMessage(err);
                }).bind(this));

        if (typeof(allVisualizers) != "undefined") {
            $.each(allVisualizers, function(i, e) {
                e.redrawConnectors();
                });
            }

    };




JSActiveCode.prototype = new ActiveCode();

function JSActiveCode(opts) {
    if (opts) {
        this.init(opts);
        }
    }

JSActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);
};

JSActiveCode.prototype.outputfun = function(a) {
    $(this.output).css("visibility","visible");
    var str = "[";
    if (typeof(a) == "object" && a.length) {
        for (var i = 0; i < a.length; i++)
            if (typeof(a[i]) == "object" && a[i].length) {
                str += (i == 0 ? "" : " ") + "[";
                for (var j = 0; j < a[i].length; j++)
                    str += a[i][j] + (j == a[i].length - 1 ?
                    "]" + (i == a.length - 1 ? "]" : ",") + "\n" : ", ");
            } else str += a[i] + (i == a.length - 1 ? "]" : ", ");
        } else {
    try {
            str = JSON.stringify(a);
    } catch (e) {
            str = a;
    }
    }
    return str;
};

JSActiveCode.prototype.runProg = function() {
    var _this = this;
    var prog = this.buildProg();

    var write = function(str) {
        _this.output.innerHTML += _this.outputfun(str);
    };

    var writeln = function(str) {
        if (!str) str="";
        _this.output.innerHTML += _this.outputfun(str)+"<br />";
            };

    $(this.output).text('');
    $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
    $(this.outDiv).show({duration:700,queue:false});

    try {
        eval(prog);
    } catch(e) {
        this.addErrorMessage(e);
    }

};

HTMLActiveCode.prototype = new ActiveCode();

function HTMLActiveCode (opts) {
    if (opts) {
        this.init(opts);
    }
}

HTMLActiveCode.prototype.runProg = function() {
    var prog = this.buildProg();

//    $('#'+myDiv+'_iframe').remove();
//    $('#'+myDiv+'_htmlout').show();
//    $('#'+myDiv+'_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
//        prog.replace(/"/g,"'") + '">' + '</iframe>');
    $(this.output).text('');
    if (! this.alignVertical ) {
        $(this.codeDiv).switchClass("col-md-12", "col-md-6", {duration: 500, queue: false});
    }
    $(this.outDiv).show({duration:700,queue:false});
    prog = "<script type=text/javascript>window.onerror = function(msg,url,line) {alert(msg+' on line: '+line);};</script>" + prog;
    this.output.srcdoc = prog;

};

HTMLActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);
    this.code = $('<textarea />').html(this.origElem.innerHTML).text();
    $(this.runButton).text('Render');
    this.editor.setValue(this.code);
};

HTMLActiveCode.prototype.createOutput = function() {
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output");
    if(this.alignVertical) {
        $(outDiv).addClass("col-md-12");
    } else {
        $(outDiv).addClass("col-md-6");
    }
    this.outDiv = outDiv;
    this.output = document.createElement('iframe');
    $(this.output).css("background-color","white");
    $(this.output).css("position","relative");
    $(this.output).css("height","400px");
    $(this.output).css("width","100%");
    outDiv.appendChild(this.output);
    this.outerDiv.appendChild(outDiv);

    clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};


String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

AudioTour.prototype = new RunestoneBase();

// function to display the audio tours
function AudioTour (divid, code, bnum, audio_text) {
    this.elem = null; // current audio element playing
    this.currIndex; // current index
    this.len; // current length of audio files for tour
    this.buttonCount; // number of audio tour buttons
    this.aname; // the audio file name
    this.ahash; // hash of the audio file name to the lines to highlight
    this.theDivid; // div id
    this.afile; // file name for audio
    this.playing = false; // flag to say if playing or not
    this.tourName;

    // Replacing has been done here to make sure special characters in the code are displayed correctly
    code = code.replaceAll("*doubleq*", "\"");
    code = code.replaceAll("*singleq*", "'");
    code = code.replaceAll("*open*", "(");
    code = code.replaceAll("*close*", ")");
    code = code.replaceAll("*nline*", "<br/>");
    var codeArray = code.split("\n");

    var audio_hash = new Array();
    var bval = new Array();
    var atype = audio_text.replaceAll("*doubleq*", "\"");
    var audio_type = atype.split("*atype*");
    for (var i = 0; i < audio_type.length - 1; i++) {
        audio_hash[i] = audio_type[i];
        var aword = audio_type[i].split(";");
        bval.push(aword[0]);
    }

    var first = "<pre><div id='" + divid + "_l1'>" + "1.   " + codeArray[0] + "</div>";
    num_lines = codeArray.length;
    for (var i = 1; i < num_lines; i++) {
        if (i < 9) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".   " + codeArray[i] + "</div>";
        }
        else if (i < 99) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".  " + codeArray[i] + "</div>";
        }
        else {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ". " + codeArray[i] + "</div>";
        }
    }
    first = first + "</pre>";

    //laying out the HTML content

    var bcount = 0;
    var html_string = "<div class='modal-lightsout'></div><div class='modal-profile'><h3>" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourTitle") + "</h3><div class='modal-close-profile'></div><p id='windowcode'></p><p id='" + divid + "_audiocode'></p>";
    html_string += "<p id='status'></p>";
    html_string += "<input type='image' src='../_static/first.png' width='25' id='first_audio' name='first_audio' title='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnFirst") + "' alt='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnFirst") + "' onerror=\"this.onerror=null;this.src='_static/first.png'\" disabled/>" +
                   "<input type='image' src='../_static/prev.png' width='25' id='prev_audio' name='prev_audio' title='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPrevious") + "' alt='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPrevious") + "' onerror=\"this.onerror=null;this.src='_static/prev.png'\" disabled/>" +
                   "<input type='image' src='../_static/pause.png' width='25' id='pause_audio' name='pause_audio' title='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPause") + "' alt='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPause") + "' onerror=\"this.onerror=null;this.src='_static/pause.png'\" disabled/>" +
                   "<input type='image' src='../_static/next.png' width ='25' id='next_audio' name='next_audio' title='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnNext") + "' alt='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnNext") + "' onerror=\"this.onerror=null;this.src='_static/next.png'\" disabled/>" +
                   "<input type='image' src='../_static/last.png' width ='25' id='last_audio' name='last_audio' title='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnLast") + "' alt='" + getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnLast") + "' onerror=\"this.onerror=null;this.src='_static/last.png'\" disabled/><br/>";
    for (var i = 0; i < audio_type.length - 1; i++) {
        html_string += "<input type='button' style='margin-right:5px;' class='btn btn-default btn-sm' id='button_audio_" + i + "' name='button_audio_" + i + "' value=" + bval[i] + " />";
        bcount++;
    }
    //html_string += "<p id='hightest'></p><p id='hightest1'></p><br/><br/><p id='test'></p><br/><p id='audi'></p></div>";
    html_string += "</div>";

    var tourdiv = document.createElement('div');
    document.body.appendChild(tourdiv);
    $(tourdiv).html(html_string);
    $('#windowcode').html(first);

    // Position modal box
    $.fn.center = function() {
        this.css("position", "absolute");
        // y position
        this.css("top", ($(window).scrollTop() + $(navbar).height() + 10 + "px"));
        // show window on the left so that you can see the output from the code still
        this.css("left", ($(window).scrollLeft() + "px"));
        return this;
    };

    $(".modal-profile").center();
    $('.modal-profile').fadeIn("slow");
    //$('.modal-lightsout').css("height", $(document).height());
    $('.modal-lightsout').fadeTo("slow", .5);
    $('.modal-close-profile').show();

    // closes modal box once close link is clicked, or if the lights out divis clicked
    $('.modal-close-profile, .modal-lightsout').click( (function() {
        if (this.playing) {
            this.elem.pause();
        }
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'closeWindow', 'div_id': divid});
        $('.modal-profile').fadeOut("slow");
        $('.modal-lightsout').fadeOut("slow");
        document.body.removeChild(tourdiv);
    }).bind(this));

    // Accommodate buttons for a maximum of five tours

    $('#' + 'button_audio_0').click((function() {
        this.tour(divid, audio_hash[0], bcount);
    }).bind(this));
    $('#' + 'button_audio_1').click((function() {
        this.tour(divid, audio_hash[1], bcount);
    }).bind(this));
    $('#' + 'button_audio_2').click((function() {
        this.tour(divid, audio_hash[2], bcount);
    }).bind(this));
    $('#' + 'button_audio_3').click((function() {
        this.tour(divid, audio_hash[3], bcount);
    }).bind(this));
    $('#' + 'button_audio_4').click((function() {
        this.tour(divid, audio_hash[4], bcount);
    }).bind(this));

    // handle the click to go to the next audio
    $('#first_audio').click((function() {
        this.firstAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $('#prev_audio').click((function() {
        this.prevAudio();
    }).bind(this));

    // handle the click to pause or play the audio
    $('#pause_audio').click((function() {
        this.pauseAndPlayAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $('#next_audio').click((function() {
        this.nextAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $('#last_audio').click((function() {
        this.lastAudio();
    }).bind(this));

    // make the image buttons look disabled
    $("#first_audio").css('opacity', 0.25);
    $("#prev_audio").css('opacity', 0.25);
    $("#pause_audio").css('opacity', 0.25);
    $("#next_audio").css('opacity', 0.25);
    $("#last_audio").css('opacity', 0.25);

}

AudioTour.prototype.tour = function(divid, audio_type, bcount) {
    // set globals
    this.buttonCount = bcount;
    this.theDivid = divid;

    // enable prev, pause/play and next buttons and make visible
    $('#first_audio').removeAttr('disabled');
    $('#prev_audio').removeAttr('disabled');
    $('#pause_audio').removeAttr('disabled');
    $('#next_audio').removeAttr('disabled');
    $('#last_audio').removeAttr('disabled');
    $("#first_audio").css('opacity', 1.0);
    $("#prev_audio").css('opacity', 1.0);
    $("#pause_audio").css('opacity', 1.0);
    $("#next_audio").css('opacity', 1.0);
    $("#last_audio").css('opacity', 1.0);

    // disable tour buttons
    for (var i = 0; i < bcount; i++)
        $('#button_audio_' + i).attr('disabled', 'disabled');

    var atype = audio_type.split(";");
    var name = atype[0].replaceAll("\"", " ");
    this.tourName = name;
    $('#status').html(getLocalizedString(activeCodeLocalizationColl, "InformAudioTourStartingTour") + " " + name);

    //log tour type to db
    this.logBookEvent({'event': 'Audio', 'act': name, 'div_id': divid});

    var max = atype.length;
    var str = "";
    this.ahash = new Array();
    this.aname = new Array();
    for (i = 1; i < max - 1; i++) {
        var temp = atype[i].split(":");
        var temp_line = temp[0];
        var temp_aname = temp[1];

        var akey = temp_aname.substring(1, temp_aname.length);
        var lnums = temp_line.substring(1, temp_line.length);

        //alert("akey:"+akey+"lnum:"+lnums);

        // str+="<audio id="+akey+" preload='auto'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+
        // akey+".mp3' type='audio/mpeg'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+akey+
        // ".ogg' type='audio/ogg'>Your browser does not support the audio tag</audio>";
        str += "<audio id=" + akey + " preload='auto' >";
        str += "<source src='../_static/audio/" + akey + ".wav' type='audio/wav'>";
        str += "<source src='../_static/audio/" + akey + ".mp3' type='audio/mpeg'>";
        str += "<source src='_static/audio/" + akey + ".wav' type='audio/wav'>";
        str += "<source src='_static/audio/" + akey + ".mp3' type='audio/mpeg'>";
        str +=  "<br />" + getLocalizedString(activeCodeLocalizationColl, "ErrorAudioTourBrowserDoesntSupport") + "</audio>";
        this.ahash[akey] = lnums;
        this.aname.push(akey);
    }
    var ahtml = "#" + divid + "_audiocode";
    $(ahtml).html(str); // set the html to the audio tags
    this.len = this.aname.length; // set the number of audio file in the tour

    // start at the first audio
    this.currIndex = 0;

    // play the first audio in the tour
    this.playCurrIndexAudio();
};

AudioTour.prototype.handlePlaying = function() {

    // if this.playing audio pause it
    if (this.playing) {

        this.elem.pause();

        // unbind current ended
        $('#' + this.afile).unbind('ended');

        // unhighlight the prev lines
        this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);
    }

};

AudioTour.prototype.firstAudio = function() {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'first', 'div_id': this.theDivid});


    // move to the first audio
    this.currIndex = 0;

    // start at the first audio
    this.playCurrIndexAudio();

};

AudioTour.prototype.prevAudio = function() {

    // if there is a previous audio
    if (this.currIndex > 0) {

        // if audio is this.playing handle it
        this.handlePlaying();

        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'prev', 'div_id': this.theDivid});


        // move to previous to the current (but the current index has moved to the next)
        this.currIndex = this.currIndex - 1;

        // start at the prev audio
        this.playCurrIndexAudio();
    }

};

AudioTour.prototype.nextAudio = function() {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'next', 'div_id': this.theDivid});

    // if not at the end
    if (this.currIndex < (this.len - 1)) {
        // start at the next audio
        this.currIndex = this.currIndex + 1;
        this.playCurrIndexAudio();
    }
    else if (this.currIndex == (this.len - 1)) {
        this.handleTourEnd();
    }
};

AudioTour.prototype.lastAudio = function() {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'last', 'div_id': this.theDivid});

    // move to the last audio
    this.currIndex = this.len - 1;

    // start at last
    this.playCurrIndexAudio();

};

// play the audio at the current index
AudioTour.prototype.playCurrIndexAudio = function() {

    // set this.playing to false
    this.playing = false;

    // play the current audio and highlight the lines
    this.playaudio(this.currIndex, this.aname, this.theDivid, this.ahash);

};

// handle the end of the tour
AudioTour.prototype.handleTourEnd = function() {

    $('#status').html(" " + getLocalizedString(activeCodeLocalizationColl, "InformAudioTourEndedPrefix") + this.tourName + getLocalizedString(activeCodeLocalizationColl, "InformAudioTourEndedPostfix"));

    // disable the prev, pause/play, and next buttons and make them more invisible
    $('#first_audio').attr('disabled', 'disabled');
    $('#prev_audio').attr('disabled', 'disabled');
    $('#pause_audio').attr('disabled', 'disabled');
    $('#next_audio').attr('disabled', 'disabled');
    $('#last_audio').attr('disabled', 'disabled');
    $("#first_audio").css('opacity', 0.25);
    $("#prev_audio").css('opacity', 0.25);
    $("#pause_audio").css('opacity', 0.25);
    $("#next_audio").css('opacity', 0.25);
    $("#last_audio").css('opacity', 0.25);

    // enable the tour buttons
    for (var j = 0; j < this.buttonCount; j++)
        $('#button_audio_' + j).removeAttr('disabled');
};

// only call this one after the first time
AudioTour.prototype.outerAudio = function() {

    // unbind ended
    $('#' + this.afile).unbind('ended');

    // set this.playing to false
    this.playing = false;

    // unhighlight previous lines from the last audio
    this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);

    // increment the this.currIndex to point to the next one
    this.currIndex++;

    // if the end of the tour reset the buttons
    if (this.currIndex == this.len) {
        this.handleTourEnd();
    }

    // else not done yet so play the next audio
    else {

        // play the audio at the current index
        this.playCurrIndexAudio();
    }
};

// play the audio now that it is ready
AudioTour.prototype.playWhenReady = function(afile, divid, ahash) {
    // unbind current
    $('#' + afile).unbind('canplaythrough');
    //console.log("in playWhenReady " + elem.duration);

    $('#status').html(getLocalizedString(activeCodeLocalizationColl, "InformAudioTourPlayingPrefix") + this.tourName);
    this.elem.currentTime = 0;
    this.highlightLines(divid, ahash[afile]);
    $('#' + afile).bind('ended', (function() {
        this.outerAudio();
    }).bind(this));
    this.playing = true;
    this.elem.play();

};


// play the audio at the specified index i and set the duration and highlight the lines
AudioTour.prototype.playaudio = function(i, aname, divid, ahash) {
    this.afile = aname[i];
    this.elem = document.getElementById(this.afile);

    // if this isn't ready to play yet - no duration yet then wait
    //console.log("in playaudio " + elem.duration);
    if (isNaN(this.elem.duration) || this.elem.duration == 0) {
        // set the status
        $('#status').html(getLocalizedString(activeCodeLocalizationColl, "InformAudioTourLoading"));
        $('#' + this.afile).bind('canplaythrough', (function() {
            this.playWhenReady(this.afile, divid, ahash);
        }).bind(this));
    }
    // otherwise it is ready so play it
    else {
        this.playWhenReady(this.afile, divid, ahash);
    }
};

// pause if this.playing and play if paused
AudioTour.prototype.pauseAndPlayAudio = function() {
    var btn = document.getElementById('pause_audio');

    // if paused and clicked then continue from current
    if (this.elem.paused) {
        // calcualte the time left to play in milliseconds
        counter = (this.elem.duration - this.elem.currentTime) * 1000;
        this.elem.play(); // start the audio from current spot
        document.getElementById("pause_audio").src = "../_static/pause.png";
        document.getElementById("pause_audio").title = getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPauseCurrent");
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'play', 'div_id': this.theDivid});
    }

    // if audio was this.playing pause it
    else if (this.playing) {
        this.elem.pause(); // pause the audio
        document.getElementById("pause_audio").src = "../_static/play.png";
        document.getElementById("pause_audio").title = getLocalizedString(activeCodeLocalizationColl, "LabelAudioTourBtnPlayPaused");
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'pause', 'div_id': this.theDivid});
    }

};

// process the lines
AudioTour.prototype.processLines = function(divid, lnum, color) {
    var comma = lnum.split(",");

    if (comma.length > 1) {
        for (i = 0; i < comma.length; i++) {
            this.setBackgroundForLines(divid, comma[i], color);
        }
    }
    else {
        this.setBackgroundForLines(divid, lnum, color);
    }
};

// unhighlight the lines - set the background back to transparent
AudioTour.prototype.unhighlightLines = function(divid, lnum) {
    this.processLines(divid, lnum, 'transparent');
};

// highlight the lines - set the background to a yellow color
AudioTour.prototype.highlightLines = function(divid, lnum) {
    this.processLines(divid, lnum, '#ffff99');
};

// set the background to the passed color
AudioTour.prototype.setBackgroundForLines = function(divid, lnum, color) {
    var hyphen = lnum.split("-");

    // if a range of lines
    if (hyphen.length > 1) {
        var start = parseInt(hyphen[0]);
        var end = parseInt(hyphen[1]) + 1;
        for (var k = start; k < end; k++) {
            //alert(k);
            var str = "#" + divid + "_l" + k;
            if ($(str).text() != "") {
                $(str).css('background-color', color);
            }
            //$(str).effect("highlight",{},(dur*1000)+4500);
        }
    }
    else {
        //alert(lnum);
        var str = "#" + divid + "_l" + lnum;
        $(str).css('background-color', color);
        //$(str).effect("highlight",{},(dur*1000)+4500);
    }
};

//
//

LiveCode.prototype = new ActiveCode();

function LiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }

LiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);

    var orig = opts.orig;
    this.stdin = $(orig).data('stdin');
    this.datafile = $(orig).data('datafile');
    this.sourcefile = $(orig).data('sourcefile');

    this.API_KEY = "67033pV7eUUvqo07OJDIV8UZ049aLEK1";
    this.USE_API_KEY = true;
    this.JOBE_SERVER = 'http://jobe2.cosc.canterbury.ac.nz';
    this.resource = '/jobe/index.php/restapi/runs/';
    this.div2id = {};
    if (this.stdin) {
        this.createInputElement();
    }
    this.createErrorOutput();
    };

LiveCode.prototype.outputfun = function(a) {};

LiveCode.prototype.createInputElement = function() {

    var label = document.createElement('label');
    label.for = this.divid + "_stdin";
    $(label).text(getLocalizedString(activeCodeLocalizationColl, "LabelInputForProgram"));
    var input = document.createElement('input');
    input.id = this.divid + "_stdin";
    input.type = "text";
    input.size = "35";
    input.value = this.stdin;
    this.outerDiv.appendChild(label);
    this.outerDiv.appendChild(input);
    this.stdin_el = input;
};

LiveCode.prototype.createErrorOutput = function() {

};

LiveCode.prototype.runProg = function() {
        var xhr, stdin;
        var runspec = {};
        var data, host, source, editor;
        var sfilemap = {java: '', cpp: 'test.cpp', c: 'test.c', python3: 'test.py', python2: 'test.py'};

        xhr = new XMLHttpRequest();
        source = this.editor.getValue();

        if (this.stdin) {
            stdin = $(this.stdin_el).val();
        }

        if (! this.sourcefile ) {
            this.sourcefile = sfilemap[this.language];
        }

        runspec = {
            language_id: this.language,
            sourcecode: source,
            sourcefilename: this.sourcefile
        };


        if (stdin) {
            runspec.input = stdin;
        }

        if (this.datafile) {
            runspec['file_list'] = [[this.div2id[datafile],datafile]];
        }
        data = JSON.stringify({'run_spec': runspec});
        host = this.JOBE_SERVER + this.resource;

        var odiv = this.output;
        $(this.runButton).attr('disabled', 'disabled');
        $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
        $(this.outDiv).show({duration:700,queue:false});
        $(this.errDiv).remove();
        $(this.output).css("visibility","visible");

        xhr.open("POST", host, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-API-KEY', this.API_KEY);

        xhr.onload = (function() {
            var logresult;
            $(this.runButton).removeAttr('disabled');
            try {
                var result = JSON.parse(xhr.responseText);
            } catch (e) {
                result = {};
                result.outcome = -1;
            }

            if (result.outcome === 15) {
                logresult = 'success';
            } else {
                logresult = result.outcome;
            }
            this.logRunEvent({'div_id': this.divid, 'code': source, 'errinfo': logresult, 'event':'livecode'});
            switch (result.outcome) {
                case 15:
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    break;
                case 11: // compiler error
                    $(odiv).html(getLocalizedString(activeCodeLocalizationColl, "ErrorCompileErrors"));
                    this.addJobeErrorMessage(result.cmpinfo);
                    break;
                case 12:  // run time error
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    if (result.stderr) {
                        this.addJobeErrorMessage(result.stderr);
                    }
                    break;
                case 13:  // time limit
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    this.addJobeErrorMessage(getLocalizedString(activeCodeLocalizationColl, "ErrorTimeLimitExceeded"));
                    break;
                default:
                    if(result.stderr) {
                        $(odiv).html(result.stderr.replace(/\n/g, "<br>"));
                    } else {
                        this.addJobeErrorMessage(getLocalizedString(activeCodeLocalizationColl, "ErrorServerError") + xhr.status + " " + xhr.statusText);
                    }
            }

            // todo: handle server busy and timeout errors too
        }).bind(this);

        ///$("#" + divid + "_errinfo").remove();
        $(this.output).html(getLocalizedString(activeCodeLocalizationColl, "InformCompilingCode"));

        xhr.onerror = function() {
            this.addJobeErrorMessage(getLocalizedString(activeCodeLocalizationColl, "ErrorServerCommunication"));
            $(this.runButton).removeAttr('disabled');
        };

        xhr.send(data);
    };
LiveCode.prototype.addJobeErrorMessage = function(err) {
        var errHead = $('<h3>').html(getLocalizedString(activeCodeLocalizationColl, "LabelError"));
        var eContainer = this.outerDiv.appendChild(document.createElement('div'));
        this.errDiv = eContainer;
        eContainer.className = 'error alert alert-danger';
        eContainer.id = this.divid + '_errinfo';
        eContainer.appendChild(errHead[0]);
        var errText = eContainer.appendChild(document.createElement('pre'));
        errText.innerHTML = err;
    };


LiveCode.prototype.pushDataFile = function(datadiv) {

        var file_id = 'runestone'+Math.floor(Math.random()*100000);
        var contents = $(document.getElementById(datadiv)).text();
        var contentsb64 = btoa(contents);
        var data = JSON.stringify({ 'file_contents' : contentsb64 });
        var resource = '/jobe/index.php/restapi/files/' + file_id;
        var host = JOBE_SERVER + resource;
        var xhr = new XMLHttpRequest();

        if (this.div2id[datadiv] === undefined ) {
            this.div2id[datadiv] = file_id;

            xhr.open("PUT", host, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Accept', 'text/plain');
            xhr.setRequestHeader('X-API-KEY', API_KEY);

            xhr.onload = function() {
                console.log("successfully sent file " + xhr.responseText);
            };

            xhr.onerror = function() {
                console.log("error sending file" + xhr.responseText);
            };

            xhr.send(data)
        }
    };

ACFactory = {};

ACFactory.createActiveCode = function(orig, lang, addopts) {
    var opts = {'orig' : orig, 'useRunestoneServices': eBookConfig.useRunestoneServices, 'python3' : eBookConfig.python3 };
    if (addopts) {
        for (var attrname in addopts) {
            opts[attrname] = addopts[attrname];
        }
    }
    if (lang === "javascript") {
        return new JSActiveCode(opts);
    } else if (lang === 'htmlmixed') {
        return new HTMLActiveCode(opts);
    } else if (['java', 'cpp', 'c', 'python3', 'python2'].indexOf(lang) > -1) {
        return new LiveCode(opts);
    } else {   // default is python
        return new ActiveCode(opts);
    }

}

// used by web2py controller(s)
ACFactory.addActiveCodeToDiv = function(outerdivid, acdivid, sid, initialcode, language) {
    var  thepre, newac;

    acdiv = document.getElementById(acdivid);
    $(acdiv).empty();
    thepre = document.createElement("textarea");
    thepre['data-component'] = "activecode";
    thepre.id = acdiv;
    $(thepre).data('lang', language);
    $(acdiv).append(thepre);
    var opts = {'orig' : thepre, 'useRunestoneServices': true };
    addopts = {}
    if(language === 'htmlmixed') {
        var addopts = {'vertical': true};
    }
    newac = ACFactory.createActiveCode(thepre,language,addopts);
    savediv = newac.divid;
    newac.divid = outerdivid;
    newac.sid = sid;
    if (! initialcode ) {
        newac.loadEditor();
    } else {
        newac.editor.setValue(initialcode);
        setTimeout(function() {
                newac.editor.refresh();
            },500);
    }
    newac.divid = savediv;
    newac.editor.setSize(500,300);
};

ACFactory.createScratchActivecode = function() {
    /* set up the scratch Activecode editor in the search menu */
    // use the URL to assign a divid - each page should have a unique Activecode block id.
    // Remove everything from the URL but the course and page name
    // todo:  this could probably be eliminated and simply moved to the template file
    var divid = document.URL.split('#')[0];
    if (divid.indexOf('static') > -1) {
        divid = divid.split('static')[1];
    } else {
        divid = divid.split('/');
        divid = divid.slice(-2).join("");
    }
    divid = divid.split('?')[0];  // remove any query string (e.g ?lastPosition)
    divid = divid.replaceAll('/', '').replace('.html', '').replace(':', '');
    eBookConfig.scratchDiv = divid;
    // generate the HTML
    var html = '<div id="ac_modal_' + divid + '" class="modal fade">' +
        '  <div class="modal-dialog scratch-ac-modal">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '        <h4 class="modal-title">' + getLocalizedString(activeCodeLocalizationColl, "LabelScratchActiveCode") + '</h4>' +
        '      </div> ' +
        '      <div class="modal-body">' +
        '      <textarea data-component="activecode" id="' + divid + '">' +
        '\n' +
        '\n' +
        '\n' +
        '      </textarea>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    el = $(html);
    $('body').append(el);

    el.on('shown.bs.modal show.bs.modal', function() {
        el.find('.CodeMirror').each(function(i, e) {
            e.CodeMirror.refresh();
            e.CodeMirror.focus();
        });
    });

    //$(document).bind('keypress', '\\', function(evt) {
    //    ACFactory.toggleScratchActivecode();
    //    return false;
    //});
};


ACFactory.toggleScratchActivecode = function() {
    var divid = "ac_modal_" + eBookConfig.scratchDiv;
    var div = $("#" + divid);

    div.modal('toggle');

};

$(document).ready(function() {
    ACFactory.createScratchActivecode();
    $('[data-component=activecode]').each( function(index) {
        edList[this.id] = ACFactory.createActiveCode(this, $(this).data('lang'));
    });
    if (loggedout) {
        for (k in edList) {
            edList[k].disableSaveLoad();
        }
    }

});

// This seems a bit hacky and possibly brittle, but its hard to know how long it will take to
// figure out the login/logout status of the user.  Sometimes its immediate, and sometimes its
// long.  So to be safe we'll do it both ways..
var loggedout;
$(document).bind("runestone:logout",function() { loggedout=true;});
$(document).bind("runestone:logout",function() {
    for (k in edList) {
        if (edList.hasOwnProperty(k)) {
            edList[k].disableSaveLoad();
        }
    }
});
