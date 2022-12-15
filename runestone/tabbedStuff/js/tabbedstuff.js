/*==========================================
=======    Master tabbedstuff.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone tabbedStuff component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/15/15               ===
===             Brad Miller              ===
===               06/15/15               ===
==========================================*/
"use strict";

var TSList = {}; // Dictionary that contains all instances of TabbedStuff objects

import RunestoneBase from "../../common/js/runestonebase";
import "../css/tabbedstuff.css";

// Define TabbedStuff object
class TabbedStuff extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var orig = opts.orig;
        this.origElem = orig; // entire original <div> element that will be replaced by new HTML
        this.divid = orig.id;
        this.inactive = false;
        if ($(this.origElem).is("[data-inactive]")) {
            this.inactive = true;
        }
        this.togglesList = []; // For use in Codemirror/Disqus
        this.childTabs = [];
        this.populateChildTabs();
        this.activeTab = 0; // default value--activeTab is the index of the tab that starts open
        this.findActiveTab();
        this.createTabContainer();
        this.indicate_component_ready();
    }
    /*===========================================
    == Update attributes of instance variables ==
    ==    variables according to specifications    ==
    ===========================================*/
    populateChildTabs() {
        for (var i = 0; i < this.origElem.childNodes.length; i++) {
            if ($(this.origElem.childNodes[i]).data("component") === "tab") {
                this.childTabs.push(this.origElem.childNodes[i]);
            }
        }
    }
    findActiveTab() {
        for (var i = 0; i < this.childTabs.length; i++) {
            if ($(this.childTabs[i]).is("[data-active]")) {
                this.activeTab = i;
            }
        }
    }
    /*==========================================
    == Creating/appending final HTML elements ==
    ==========================================*/
    createTabContainer() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
        $(this.containerDiv).attr({ role: "tabpanel" });
        this.tabsUL = document.createElement("ul");
        this.tabsUL.id = this.divid + "_tab";
        $(this.tabsUL).addClass("nav nav-tabs");
        $(this.tabsUL).attr({ role: "tablist" });
        this.tabContentDiv = document.createElement("div"); // Create tab content container that holds tab panes w/content
        $(this.tabContentDiv).addClass("tab-content");
        this.createTabs(); // create and append tabs to the <ul>
        this.containerDiv.appendChild(this.tabsUL);
        this.containerDiv.appendChild(this.tabContentDiv);
        this.addCMD(); // Adds fuctionality for Codemirror/Disqus
        $(this.origElem).replaceWith(this.containerDiv);
    }
    createTabs() {
        // Create tabs in format <li><a><span></span></a></li> to be appended to the <ul>
        for (var i = 0; i < this.childTabs.length; i++) {
            // First create tabname and tabfriendly name that has no spaces to be used for the id
            var tabListElement = document.createElement("li");
            $(tabListElement).attr({
                role: "presentation",
                "aria-controls": this.divid + "-" + i
            });
            // Using bootstrap tabs functionality
            var tabElement = document.createElement("a");
            $(tabElement).attr({
                "data-toggle": "tab",
                href: "#" + this.divid + "-" + i,
                role: "tab"
            });
            var tabTitle = document.createElement("span"); // Title of tab--what the user will see
            tabTitle.textContent = $(this.childTabs[i]).data("tabname");
            tabElement.appendChild(tabTitle);
            tabListElement.appendChild(tabElement);
            this.tabsUL.appendChild(tabListElement);
            // tabPane is what holds the contents of the tab
            var tabPaneDiv = document.createElement("div");
            tabPaneDiv.id = this.divid + "-" + i;
            $(tabPaneDiv).addClass("tab-pane");
            $(tabPaneDiv).attr({
                role: "tabpanel"
            });
            //var tabHTML = $(this.childTabs[i]).html();
            //$(tabPaneDiv).html(tabHTML);
            tabPaneDiv.appendChild(this.childTabs[i]);
            if (!this.inactive) {
                if (this.activeTab === i) {
                    $(tabListElement).addClass("active");
                    $(tabPaneDiv).addClass("active");
                }
            }
            this.togglesList.push(tabElement);
            this.tabContentDiv.appendChild(tabPaneDiv);
        }
    }
    /*===================================
    == Codemirror/Disqus functionality ==
    ===================================*/
    addCMD() {
        $(this.togglesList).on("shown.bs.tab", function(e) {
            var content_div = $(e.target.attributes.href.value);
            content_div.find(".disqus_thread_link").each(function() {
                $(this).click();
            });
            content_div.find(".CodeMirror").each(function(i, el) {
                el.CodeMirror.refresh();
            });
        });
    }
}

/*=================================
== Find the custom HTML tags and ==
==     execute our code on them        ==
=================================*/
$("load", function() {
    $("[data-component=tabbedStuff]").each(function(index) {
        TSList[this.id] = new TabbedStuff({ orig: this });
    });
});
