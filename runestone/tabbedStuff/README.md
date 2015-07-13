<h2>Tabbed Stuff</h2>

```html
<div data-component="tabbedStuff" id="tabbedstuff1">
    <div data-component="tab" data-tabname="Tab 1">
        Stuff in tab 1.
    </div>
    <div data-component="tab" data-tabname="Tab 2">
        Stuff in tab 2.
    </div>
    <div data-component="tab" data-inactive data-tabname="Tab 3">
        Stuff in tab 3.
    </div>
</div>
```

Here the <code>div</code> tag represents the entire Tabbed Stuff component to be rendered.
Each Tabbed Stuff component contains a series of Tab components, which are also <code>div</code> elements.
Each Tab component can contain anything from text to other working components such as Multiple Choice, Activecode, etc.
By default, the first tab is opened on page load, but this can be changed by the presence of <code>data-inactive</code> in the Tabbed Stuff tag or <code>data-active</code> in one of the tabs.

Option spec:

<ul>
    <li><code>data-component="tabbedStuff"</code> Identifies this as a Tabbed Stuff component</li>
    <li><code>id</code> Must be unique in the document</li>
    <li><code>data-inactive</code> Ensures that no tabs are open by default on page load--this overrides any data-active attribute in a tab tag.</li>
</ul>

Option spec for each tab:

<ul>
    <li><code>data-component="tab"</code> Identifies this as a Tab component</li>
    <li><code>data-tabname</code> This is the text that appears on the top of the tab that users can click to open the tab.</li>
    <li><code>data-active</code> Specifies this tab to be opened on page load--only one per Tabbed Stuff component, and is overridden by the presence of <code>data-inactive</code> in the Tabbed Stuff tag. The default tab to be opened on page load is the first tab.</li>
</ul>
