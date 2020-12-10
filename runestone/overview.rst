Consistent Component API
========================

A standardized API will make the Runestone Components easier to work on and more maintainable.  For example in trying to find out how to JUST score a component in a timed exam (not render any feedback) I found the following methods:

*   processXXXSubmissions - mchoice
*   startEvaluation - fitb
*   dragEval - dragndrop
*   checkMe - parsons
*   clickableEval - clickaablearea
*   activecode - runProg
*   submitJournal - short answer

All of the above mix the scoring of the component with rendering the feedback.  I would like to separate those two things and standardize on some names for doing so.

Base Class Provides
-------------------
*   shouldUseServer
*   checkServer
*   `logRunEvent` - send the results of executing an ActiveCode exercise to the `runlog endpoint`.
*   `logBookEvent` - send the results of answering a question to the `hsblog endpoint`.
*   loadData
*   repopulateFromStorage
*   localStorageKey
*   addCaption
*   constructor that takes opts

All Components
--------------
* constructor that takes an object of options
* restoreAnswers
* setLocalStorage
* checkLocalStorage
* hasUserActivity

Gradable
--------
Each Gradable should provide these three functions as an external API.  We want to separate checking, from logging and providing feedback

*   checkCurrentAnswer - async? so that for server side grading we can await
*   logCurrentAnswer
*   renderFeedback
*   disableInteraction
