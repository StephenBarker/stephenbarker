---
layout: default
title: "Ghost in the Payroll Machine // DELETING DOCS"
date: 2025-10-03 11:00:00 -0000
author: HotChip
---

<div class="terminal-log terminal-log--left-aligned">
  <h2 class="crt-green">{{ page.title }}</h2>
  <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
  <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
  <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

  <p class="mt-2">Some bugs feel like cheat codes. You poke at the edges of a system, and suddenly the whole facade crumbles. That’s what happened here: I found a way to delete payroll and tax records without ever logging in. No creds. No tokens. Just raw requests straight to the heart of the machine. Call me a virus!</p>

  <h3 class="crt-green mt-2">The Setup</h3>
  <p>The system was split in two:</p>
  <ul class="list--custom">
    <li>Public gateway exposed to the internet.</li>
    <li>Internal app servers sitting behind the curtain.</li>
  </ul>
  <p>Both were supposed to be tightly controlled. Both weren’t.</p>

  <h3 class="crt-green mt-2">The Vulnerability</h3>
  <p>On the public side, anyone could enumerate and nuke documents. Think W2s, invoices, payroll packets-one SOAP call away from vanishing like spilt white-out</p>
  <p>On the internal side, anyone on the network (vendors, corp drones, even guest Wi-Fi) could pull entire PDFs like tax forms and fingerprint files. Again: no auth.</p>
  <p>In short:</p>
  <ul class="list--custom">
    <li>Public internet = delete everything. (bye bye)</li>
    <li>Internal network = download everything. And you know I love my data with a side of PII.</li>
  </ul>
  <p>A system designed for accountability and recordkeeping instead offered a self-destruct button. Operators should not press the button.</p>

  <h3 class="crt-green mt-2">Proof of Concept (abridged)</h3>
  <p>The attack vector was brutally simple:</p>
  <ul class="list--custom">
    <li>Loop <code>Doc Info</code> → get IDs.</li>
    <li>Call <code>Doc Page</code> → decode the base64 → boom, full PDFs.</li>
    <li>Call <code>DeleteDocument</code> → gone forever.</li>
    <li>Profit <code>$$$</code> → 🏝️🍹⛱️🌞 🌊</li>
  </ul>
  <p>That’s it. No headers. No session. No authentication checks.</p>

  <h3 class="crt-green mt-2">The Bug Bounty Wall</h3>
  <p>Here’s where things went sideways. I dropped an report through Bugcrowd, expecting a clean triage → dev handoff → fix. Instead? Closed. Twice.</p>
  <pre class="glitch">
&gt;&gt; "Not sensitive."
&gt;&gt; "Can’t reproduce."
  </pre>
  <p>Meanwhile, I was holding proof that entire payroll histories could be wiped from the public internet.</p>
  <p>Persistence paid off. SUDO, pushed harder, and finally the right eyes saw it. And guess what? It was a P1 all along.</p>

  <img src="/assets/img/P1 bug.jpg" alt="Bugcrowd P1 confirmation screenshot" title="Bugcrowd P1" class="img-fluid my-2" style=" width: inherit;">

  <p>Bugcrowd failed hard. The Corp didn’t.</p>

  <h3 class="crt-green mt-2">The Corp’s Response</h3>
  <p>For once, the Corp moved quickly. Once their own engineers touched it, they locked things down within a day. Blocked anonymous requests at the service layer, promised deeper fixes in the next release.</p>
  <p>No excuses, no stall tactics, just patch and move.</p>

  <h3 class="crt-green mt-2">Lessons Learned</h3>
  <ul class="list--custom">
    <li>Authentication isn’t optional. If you put delete and download endpoints online, guard them like neural uplinks to the grid.</li>
    <li>Bounty triage can fail. Gatekeepers aren’t always the heroes. Sometimes they’re the problem.</li>
    <li>Impact &gt; replication. Don’t let “can’t repro” bury an issue. Measure what an attacker could do.</li>
    <li>Know the system, yeah you can't repro it. You're on the outside all you can do is delete, and deleting prod is bad I hear.</li>
    <li>P1s don’t award themselves. Sometimes you have to fight to make the system admit it’s broken.</li>
  </ul>

  <h3 class="crt-green mt-2">Final Thoughts</h3>
  <p>This wasn’t some obscure edge case, it was the ability to wipe or steal payroll history across entire orgs. In a world where trust in the system is currency, that’s a breach too big to ignore.</p>
  <p>The Corp got lucky this time. Someone else might not have reported it.</p>

  <pre class="glitch mt-2">
&gt;&gt; END OF TRANSMISSION
&gt;&gt; STATUS: <span class="crt-magenta">PATCHED</span>
&gt;&gt; IMPACT: P1 | AUTH: NONE | TRIAGE: FAILED | CORP: FAST
  </pre>
  <p class="post-signature">- {{ page.author }}</p>
</div>