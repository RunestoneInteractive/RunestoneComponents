/*==========================================
=======      Master groupsub.js       ========
============================================
===     This file contains the JS for    ===
===     the Runestone reval component.   ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/12/15               ===
==========================================*/


import RunestoneBase from "../../common/js/runestonebase";
import "../css/groupsub.css";
import "select2/dist/js/select2.min.js";
import "select2/dist/css/select2.css";

var pageReveal;

// Define Reveal object
class GroupSub extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <div> element that will be replaced by new HTML
        this.origElem = orig;
        this.divid = orig.id;
        self.group = []
        this.limit = this.origElem.dataset.size_limit;

        // Create submit button
        let butt = document.createElement("button");
        butt.type = "button";
        butt.classList.add("btn", "btn-success")
        butt.innerHTML = "Submit Group"
        butt.onclick = this.submitAll.bind(this);
        let container = document.getElementById("groupsub_button")
        container.appendChild(butt);


    }

    async initialize() {
        // get the classlist to populate
        if (eBookConfig.useRunestoneServices) {
            // get classlist from admin/course_students
            let request = new Request("/runestone/admin/course_students", {
                method: "GET",
                headers: this.jsonHeaders,
            });
            try {
                let response = await fetch(request);
                if (!response.ok) {
                    throw new Error("Failed to save the log entry");
                }
                this.studentList = await response.json();
            } catch (e) {
                if (this.isTimed) {
                    alert(`Error: Your action was not saved! The error was ${e}`);
                }
                console.log(`Error: ${e}`);
            }

        } else {
            this.studentList = {
                s1: "User 1",
                s2: "User 2",
                s3: "User 3",
                s4: "User 4",
                s5: "User 5",
            }
        }
        let select = document.getElementById("assignment_group");
        for (let [sid, name] of Object.entries(this.studentList)) {
            let opt = document.createElement("option");
            opt.value = sid;
            opt.innerHTML = this.studentList[sid];
            select.appendChild(opt);
        }
        // Make the select element searchable with multiple selections
        $('.assignment_partner_select').select2({
            placeholder: "Select up to 4 team members",
            allowClear: true,
            maximumSelectionLength: this.limit
        });

    }

    async submitAll() {
        // find all components on the page and submit them for all group members
        let picker = document.getElementById("assignment_group")
        let group = []
        for (let student of picker.selectedOptions) {
            group.push(student.value);
        }
        // If the leader forgets to add themselves, add them here.
        let username = eBookConfig.username;
        if (username && !group.includes(username)) {
            group.push(username)
        }
        if (group.len > this.limit) {
            alert(`You may not have more than ${this.limit} students in a group`);
            return
        }
        this.logBookEvent({
            event: "group_start",
            act: group.join(","),
            div_id: window.location.pathname,
        });
        for (let student of group) {
            for (let question of window.allComponents) {
                console.log(`${student} ${question}`)
                await question.logCurrentAnswer(student)
            }
        }

        this.logBookEvent({
            event: "group_end",
            act: group.join(","),
            div_id: window.location.pathname,
        });
    }

}


$(document).on("runestone:login-complete", async function () {
    let gs = document.querySelectorAll("[data-component=groupsub]");
    if (gs.length > 1) {
        alert("Only one Group Submit is allowed per page")
        return;
    }
    let gsElement = gs[0];
    try {
        var pageReveal = new GroupSub({ orig: gsElement });
        await pageReveal.initialize();
    } catch (err) {
        console.log(`Error rendering GroupSub ${gsElement.id}`);
        console.log(`Details ${err}`);
    }
});

