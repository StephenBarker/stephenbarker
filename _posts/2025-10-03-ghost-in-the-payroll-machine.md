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
    <p class="mt-2"> Some bugs feel like cheat codes. You prod the edges and the whole façade crumbles. I found a way to
        <strong>delete payroll and tax records without ever logging in</strong>. No credentials. No tokens. Just raw
        requests straight to the machine. Call me a virus. </p>
    <h3 class="crt-green mt-2">The Setup</h3>
    <p>The system lived in two halves:</p>
    <ul class="list--custom">
        <li>Public gateway exposed to the internet.</li>
        <li>Internal application servers behind the curtain.</li>
    </ul>
    <p>Both were meant to be locked down. Both were not.</p>
    <h3 class="crt-green mt-2">The Vulnerability</h3>
    <p>On the public side, anyone could enumerate and destroy documents - W2s, invoices, payroll packets - one SOAP call
        away from vanishing. On the internal side, any network user (vendors, temps, guest Wi-Fi) could pull full PDFs
        like tax forms and fingerprint records. No authentication anywhere.</p>
    <p>In short:</p>
    <ul class="list--custom">
        <li><strong>Public internet</strong> = delete everything.</li>
        <li><strong>Internal network</strong> = download everything.</li>
    </ul>
    <p>A system designed for auditability instead shipped a self-destruct button. Operators should never press the
        button.</p>
    <h3 class="crt-green mt-2">Proof of Concept (abridged)</h3>
    <p>High-level attack flow (non-actionable):</p>
    <ul class="list--custom">
        <li>Query document metadata to enumerate document IDs.</li>
        <li>Request document pages, extract and decode base64 payloads → valid PDFs.</li>
        <li>Issue delete request for a document ID → document removed.</li>
    </ul>
    <p>No session. No special headers. No authentication checks between discovery, retrieval, and deletion.</p>
    <h3 class="crt-green mt-2">The Bug Bounty Wall</h3>
    <p>I reported this via a bug-bounty channel expecting normal triage. Instead the first submissions were closed with
        “can’t reproduce” and “not sensitive.” Closed. Twice.</p>
    <pre class="glitch"> &gt;&gt; "Not sensitive." &gt;&gt; "Can’t reproduce." </pre>
    <p>I kept pushing. Escalated internally. Eventually the right people looked and confirmed it was a P1. Persistence
        turned “unproven” into the severity it deserved.</p>

    <img src="/assets/img/P1 bug.jpg" alt="Confirmation screenshot showing P1 status" title="P1 confirmation"
        class="img-fluid my-2" style="width: inherit;">

    <p class="mt-1"><strong>Short scoreboard:</strong></p>
    <pre
        class="glitch mt-1"> &gt;&gt; STATUS: <span class="crt-magenta">PATCHED</span> &gt;&gt; IMPACT: P1 | AUTH: NONE | TRIAGE: FAILED | CORP: FAST </pre>
    <h3 class="crt-green mt-2">The Corp’s Response</h3>
    <p>Credit where it’s due - the Corp moved quickly once its engineers verified the issue. They blocked anonymous
        service calls at the service layer and queued deeper fixes for the next release. No theatrical delays: patch,
        test, deploy.</p>
    <h3 class="crt-green mt-2">Lessons Learned</h3>
    <ul class="list--custom">
        <li><strong>Authentication isn’t optional.</strong> Delete and download endpoints are crown jewels - treat them
            like it.</li>
        <li><strong>Bounty triage can fail hard.</strong> Gatekeepers are fallible; persistence matters.</li>
        <li><strong>Impact beats replication.</strong> Don’t let “can’t repro” be the end of the conversation - measure
            what an attacker could do.</li>
        <li><strong>P1s don’t award themselves.</strong> Sometimes you must fight to make the system admit it’s broken.
        </li>
    </ul>
    <h3 class="crt-green mt-2">Final Thoughts</h3>
    <p>This wasn’t an edge case. It was the ability to wipe or steal payroll history across entire organizations. In a
        world where trust is currency, that’s catastrophic. The Corp got lucky this time - someone else might not have
        reported it.</p>
    <pre class="glitch mt-2"> &gt;&gt; END OF TRANSMISSION </pre>
    <p class="post-signature">- {{ page.author }}</p>
</div>