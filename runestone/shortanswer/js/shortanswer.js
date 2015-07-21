

/**
 * If the divid is in the localStorage, then assume it was put there in a panic
 * Check against the server to find which is more recent, and use that.
 *
 */
function loadJournal(directive_id) {
    if (storage.has(directive_id)) {
        var solution = $('#' + directive_id + '_solution');
        solution.text(storage.get(directive_id));
    }

    /*directiveRemoteCommand('get_journal_entry', directive_id, {},
                      function(data) {
                        var solution = $('#'+directive_id+'_solution');
                        solution.text(data.solution);
                        if (storage.has(directive_id)) {
                            if (storage.is_new(directive_id, data.timestamp)) {
                                storage.remove(directive_id);
                            } else {
                                solution.text(storage.get(directive_id));
                                submitJournal(directive_id);
                            }
                        }
                      },
                      function(data) {
                        console.log(data.message);
                      });  */
}

function submitJournal(directive_id) {
    var value = $('#'+directive_id+'_solution').val();
    storage.set(directive_id, value);
    /*
    directiveRemoteCommand('set_journal_entry',  directive_id, {'solution': value},
                      function(data) {
                        storage.remove(directive_id);
                      },
                      function(data) {
                        console.log(data.message);
                      });  */
    this.logBookEvent({'event': 'shortanswer', 'act': JSON.stringify(value), 'div_id': directive_id});
}


