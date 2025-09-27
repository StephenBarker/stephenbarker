---
layout: default
title: "This Script Eats Glass and Smiles // AUTOMATED CHECK SIGNOFFS"
date: 2025-10-10 09:00:00 -0000
author: HotChip
excerpt: "A feb-2023 Apps Script that batches signable Google Docs grouped by location. Ugly, reliable, and exactly the kind of duct-tape automation that keeps payroll alive."
tags: [automation, google-apps-script, payroll, docs, hotchip, cyberpunk, murderbot]
---
<div class="terminal-log terminal-log--left-aligned">
  <h2 class="crt-green">{{ page.title }}</h2>
  <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
  <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
  <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

  <blockquote class="blockquote--themed glitch mt-2">
    Paperwork: the ghost of a dead tree, haunting the living with pointless ritual.
  </blockquote>

  <p class="mt-2"> The Corp® told me everything was secure. They called the paperwork "best practice." <pre class="glitch">&gt;&gt;Cute.</pre> Back in February 2023 I duct-taped something together so a payroll could hand a physical check to a human and collect a signature without invoking an entire platform migration. It was small, it worked, and it lived. That's the point reliability &gt; elegance. </p>
  <h3 class="crt-green mt-2">This thing, in one sentence</h3>
  <p>Copy a Docs template, read the <code>Data</code> sheet, sort by location, make a grouped document with NAME / DATE / CHECK / SIGNATURE rows, hand it off to the printer. Humans sign. Job done.</p>
  <h3 class="crt-green mt-2">Why I wrote it</h3>
  <p>Because people still want to physically sign things. Because payroll doesn’t want CSVs! They want a single, printable page per location. Because infrastructure can be overthought and overengineered. Because operations need a lever they can pull without calling six teams at 9PM.</p>
  
  <h3 class="crt-green mt-2">How it behaves (Operator log)</h3>
  <ol class="list--custom">

    <li>Make a copy of a Docs template into a destination folder.</li>
      <pre class="glitch">
  &gt;&gt; [2023-02-14 03:17] cron: none,  run manually from spreadsheet menu</pre>
    <li>Read the sheet (display values so dates look human).</li>
    <pre class="glitch">
  &gt;&gt; [2023-02-14 03:17] Template: locked (owner only)</pre>
    <li>Sort rows by the location column so rows group together.</li>
    <pre class="glitch">
  &gt;&gt; [2023-02-14 03:17] rows: 214</pre>
    <li>Walk the rows; when the location changes, add a header and a fresh table; append rows with a long signature line.</li>
    <pre class="glitch">
  &gt;&gt; [2023-02-14 03:17] destinationFolder: /Payroll/SignDocs</pre>
    <li>Save, close, and display a clickable link in a dialog for payroll to open and print.</li>
    <pre class="glitch">
  &gt;&gt; [2023-02-14 03:19] saved: Sign Doc 2-14-2023.docx (link presented)</pre>
  </ol>
  <h3 class="crt-green mt-2">Snippets</h3>
  <p>Here’s a sanitized taste of the script’s structure so you know what you’re reading when you open it in the editor. Nothing dangerous. Just logic.</p>
  <pre><code class="language-js">
// copy template to destination
const googleDocTemplate = DriveApp.getFileById('TEMPLATE_ID');
const destinationFolder = DriveApp.getFolderById('DEST_ID');
const docCopy = googleDocTemplate.makeCopy("Sign Doc "+ theDate(), destinationFolder);
const doc = DocumentApp.openById(docCopy.getId());

// read and sort
sheet.setFrozenRows(1);
sheet.sort(6, true); // sort by column 6 (location)
sheet.setFrozenRows(0);
const rows = sheet.getDataRange().getDisplayValues();

// iterate rows, insert header/table when location changes
rows.forEach(function(row, index) {
    if (index === 0) return; // skip header

    if (index === 1) { /* init header & table */ }

    if (where !== row[4]) { /* page break + new header + new table */ }

    // append row into table with signature cell
});

doc.saveAndClose();
  </code></pre>
  <p>You can view the full, sanitized script on <a href="https://github.com/StephenBarker/Apps-Script-Sign-Off-Generator/blob/main/code.gs" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
  <h3 class="crt-green mt-2">Why this survived production</h3>
  <ul class="list--custom">
    <li><strong>Small blast radius.</strong> It writes files in one folder and never touches live payroll systems. You can nuke it and nothing else dies. Hell most people don't even know it's alive.</li>
    <li><strong>Low ceremony.</strong> No deployments, no CI—a person clicks a menu and gets a printable doc. That UX reduction matters more than brittle architecture.</li>
    <li><strong>Transparent output.</strong> If it misbehaves you open the doc and immediately see the problem. No distributed tracing required.</li>
  </ul>
  <h3 class="crt-green mt-2">Where the ugliness lives (and why I accepted it)</h3>
  <ul class="list--custom">
    <li><strong>Hard-coded indexes:</strong> <code>row[4]</code> is the location column. If someone reorders the sheet it silently mis-groups. Keep your schema documented and frozen.</li>
    <li><strong>Sorting behavior:</strong> the script mutates sheet freeze settings. That annoys power users who like their UI pinned. In practice, payroll runs are controlled, document the expectation.</li>
    <li><strong>Printer variance:</strong> some printers ignore set widths. Signature lines are long underscores because text underlines survive the printer tantrums more reliably than cell widths.</li>
    <li><strong>Performance:</strong> fine for hundreds, clunky for tens of thousands. If your Corp® grows into the millions, rethink the approach, but you won’t be reading this post then anyway you cog.</li>
  </ul>
  <h3 class="crt-green mt-2">Admin checklist</h3>
  <ul class="list--custom">
    <li>Lock the template: make template owner only; script uses a copy-per-run.</li>
    <li>Document sheet schema: freeze a header row and include explicit column names.</li>
    <li>Test after G Suite changes: Google API updates are small nightmares, run a test after admin changes.</li>
    <li>Keep 30–90 day backups of generated docs for reprints; name them with the date.</li>
    <li>Log lightly: add a single Logger.log that prints the header row detected at the start. That saved me.</li>
  </ul>
  <h3 class="crt-green mt-2">If you inherit this script (and you will, in some form)</h3>
  <p>Don’t rewrite it on your first Monday. Run it. Read the output. Add one small sanity check that the header row contains the expected column names. That tiny telemetry will save you a support ticket and a panic in the payroll kernal.</p>
  <h3 class="crt-green mt-2">Final thoughts</h3>
  <p>Architecture porn is sexy. Duct tape is reliable. This script isn’t a manifesto about microservices or cloud-native purity—it’s a tool in the toolbox that kepts payroll moving and checks signed. It’s ugly, but it works. That’s a kind of ugly I respect.</p>
  <pre class="glitch mt-2"> &gt;&gt; END OF TRANSMISSION </pre>
  <p class="post-signature">- {{ page.author }}</p>
  <p class="small muted">Note: This post is a retrospective/operational write-up. No exploit code or sensitive data is published here. This is not financial advice. This is not legal advice. This is not Corp® advice. This is not medical advice. This is not a joke.</p>
</div>