<h2>Usage Assignment</h2>

Currently generates no HTML, just creates an assignment object, with deadlines, etc.

<pre>
  .. usageassignment:: prep_1
    :chapter: chap_name1[, chapname2]*
    :subchapters: subchapter_name[, subchaptername2]*
    :session_name: <str>
    :deadline: <str>
    :pct_required: <int>
</pre>

* :chapter: is a comma-separated list of chapter names
* :subchapters: is a comma-separated list of chapter/subchapter paths
* :session_name: is the name that will be displayed to students on the progress page
* :deadline: is in the format 2015-10-21 16:30:00
* :pct_required: is a integer from 0-100 indicating what percentage of the activities need to be completed in order to get credit

