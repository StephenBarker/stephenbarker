---
layout: default
title: "From Email Signature to Global Infrastructure // SCOPE CREEP"
date: 2026-01-09 09:00:00 -0000
author: HotChip
excerpt: "I asked how to change my email signature. I ended up building a global voting infrastructure. This is what happens when curiosity meets a Friday afternoon."
tags: [google-apps-script, firebase, over-engineering, hotchip]
---

<div class="terminal-log terminal-log--left-aligned">
    <h2 class="crt-green">{{ page.title }}</h2>
    <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
    <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
    <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

    <p class="mt-2">I asked how to change my email signature. This is what happened instead.</p>

    <h3 class="crt-green mt-2">This Should Have Taken Thirty Seconds</h3>
    <p>All I wanted was to update my email signature. Google has hidden this behind a settings page that feels less like a UI and more like an archaeological site. Non‑resizable window. HTML editor pretending it isn’t one. Everything about it says: <em>don’t touch this again.</em></p>
    <p>So naturally, I touched it.</p>
    <p>It was a Friday. Tax season lull. Brain still warm. Curiosity met time and nobody intervened.</p>

    <h3 class="crt-green mt-2">The First Bad Idea (The Good Kind)</h3>
    <p>If I have to touch this UI, I’m not doing it repeatedly. So I asked a different question: what if my signature updated itself?</p>
    <p>Not something inspirational. Not a quote. Just a rotating list of increasingly unhinged sign‑offs. A small reminder that tools can still be bent, even here.</p>
    
    <p>The plan:</p>
    <ul class="list--custom">
        <li>Google Sheet.</li>
        <li>Column A: signatures.</li>
        <li>Column B: which one is currently live.</li>
        <li>Apps Script to swap it daily.</li>
    </ul>

    <p>Spreadsheets are the apex predator of the Corp®rate ecosystems. You don’t fight that. You exploit it.</p>

    <img src="/assets/img/email-sig-sheet.png" alt="Google Sheet with Column A (signatures) and Column B (TRUE/FALSE)" class="img-fluid my-2">

    <h3 class="crt-green mt-2">Apps Script: JavaScript, But Wet</h3>
    <p>Apps Script is JavaScript if JavaScript were trapped in a municipal swimming pool. Pull the sheet. Find the active row. Replace that text inside the Gmail signature. Mark the new one as active. Schedule it.</p>
    <p>It worked immediately. Which is never a good sign.</p>

    <h4 class="crt-green mt-2">The Secret Menu (Because of Course)</h4>
    <pre><code class="language-javascript">
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🤫')
    .addItem('New Sig', 'updateSignature')
    .addToUi();
}
    </code></pre>
    <p>This adds a custom menu. No reason. No explanation. Just a little side door for people who know.</p>
    <img src="/assets/img/email-sig-menu.png" alt="Google Sheets custom menu dropdown" class="img-fluid my-2">

    <h4 class="crt-green mt-2">Text Is a Liar</h4>
    <p>Replacing signature text by value works exactly once. Then Gmail reflows the HTML. Smart quotes appear. Line breaks unionize. The string you thought you owned quietly changes shape.</p>
    <p>So instead of trusting text, I trusted state. Column B became the source of truth. The row marked TRUE is the one currently deployed. That’s the key used for replacement.</p>
    <p>Is it brittle? Yes. Is it good enough for something that exists mostly as a joke? Also yes.</p>

    <h4 class="crt-green mt-2">The Moment of Replacement</h4>
    <pre><code class="language-javascript">
if (oldSigText !== "" && currentGmailSig.includes(oldSigText)) {
  updatedSignature = currentGmailSig.replace(oldSigText, newSigText);
} else {
  console.error("Sig out of sync");
  return;
}
    </code></pre>
    <img src="/assets/img/email-sig-settings.png" alt="Gmail signature settings with swapped line highlighted" class="img-fluid my-2" style="width: 50%;">

    <h3 class="crt-green mt-2">Now There Was Data (This Was a Mistake)</h3>
    <p>At this point, the system worked. Which meant I now had a list.</p>
    <p>And lists invite questions like:</p>
    <ul class="list--custom">
        <li>Which one is best?</li>
        <li>Who decides?</li>
        <li>What if we let the internet touch it?</li>
    </ul>
    <p>This is how you accidentally schedule more work for yourself.</p>

    <h3 class="crt-green mt-2">“I’ll Just Throw a Site Together”</h3>
    <p>Terminal. Muscle memory.</p>
    <pre class="glitch">
git init
firebase init
    </pre>
    <p>Firestore. Static hosting. Client‑side JavaScript. Nothing fancy. Two signatures appear. You click the more unhinged one. Wins and losses increment. Repeat forever.</p>
    <p>I had built a global email‑signature colosseum.</p>
    <img src="/assets/img/email-sig-site.png" alt="Voting page with two signatures side by side" class="img-fluid my-2">

    <h3 class="crt-green mt-2">Migrating From Spreadsheets to the Actual Internet</h3>
    <p>Export CSV. Write a Node script. Push everything into Firestore. This is the point of no return.</p>

    <h4 class="crt-green mt-2">The Part Where It Became Real</h4>
    <pre><code class="language-javascript">
const newItem = {
  name: name,
  wins: 0,
  losses: 0,
};
await itemsCollection.add(newItem);
    </code></pre>
    <p>Once this ran, the joke had infrastructure.</p>

    <h3 class="crt-green mt-2">Voting, By Vibes Alone</h3>
    <p>No auth. No rate limits. No safety rails. Just clicks and consequences.</p>

    <h4 class="crt-green mt-2">Transactional Chaos</h4>
    <pre><code class="language-javascript">
await db.runTransaction(async (transaction) => {
  transaction.update(winnerRef, { wins: increment(1) });
  transaction.update(loserRef, { losses: increment(1) });
});
    </code></pre>
    <p>This is not secure. It is sincere.</p>
    <img src="/assets/img/email-sig-db.png" alt="Firestore console showing wins incrementing" class="img-fluid my-2">

    <h3 class="crt-green mt-2">Rankings: Quantifying Unhinged Energy</h3>
    <p>Top 100. Ordered by wins. No editorial input. This is what the crowd chose.</p>
    <img src="/assets/img/email-sig-ranking.png" alt="Rankings page with counts" class="img-fluid my-2">

    <h3 class="crt-green mt-2">What This Was Actually About</h3>
    <p>I started with: “How do I update my email signature?”</p>
    <p>I ended with:</p>
    <ul class="list--custom">
        <li>A scheduled deployment pipeline.</li>
        <li>A crowd‑ranked content system.</li>
        <li>An internal tool reachable from anywhere on Earth.</li>
    </ul>
    <p>All because the official UI made the simple thing painful and the interesting thing possible.</p>

    <h3 class="crt-green mt-2">This Is the Correct Amount of Over‑Engineering</h3>
    <p>This isn’t about jokes. It’s about taking one square inch back from software that assumes you’ll never push back.</p>
    <p>It’s about what happens when:</p>
    <ul class="list--custom">
        <li>Curiosity meets time.</li>
        <li>APIs are exposed.</li>
        <li>Nobody says no fast enough.</li>
    </ul>
    <p>I can delete this tomorrow. That’s not a failure state. That’s the point.</p>

    <h3 class="crt-green mt-2">The Ones That Made the Cut</h3>
    <p>Not everything belongs in rotation. Some are too loud. Some are just references. Some are trying too hard to be the joke. The ones below fit the tone of the project: flat, dry, slightly resigned, and just unprofessional enough to matter.</p>
    <p>These are the signatures that feel like they wandered in on their own.</p>

    <ul class="list--custom">
        <li>With spite.</li>
        <li>Yours in utter defeat.</li>
        <li>No cheers, only tears.</li>
        <li>From the trenches.</li>
        <li>Warmest regards from the depths of my last nerve.</li>
        <li>Till our next professional rendezvous.</li>
        <li>If anyone cares...</li>
        <li>Sincerely, despite the circumstances.</li>
        <li>At a loss for words.</li>
        <li>Have the day you deserve.</li>
        <li>Have a Monday.</li>
        <li>With palpable vibes.</li>
        <li>Looking forward (to Friday).</li>
        <li>I was misinformed.</li>
        <li>Just put the fries in the bag.</li>
        <li>This could've been an email.</li>
        <li>This could've been a meeting.</li>
        <li>Per my last email…</li>
        <li>Thanks for coming to my TED Talk.</li>
        <li>I think that pretty much sums it up...</li>
        <li>Why are you the way that you are?</li>
        <li>I don’t hate it. I just don’t like it at all, and it’s terrible.</li>
        <li>I think you’re under-thinking it.</li>
        <li>Mentally I'm on my lunch break.</li>
        <li>Error 404: Professionalism not found!</li>
        <li>Ending this email like I end meetings: abruptly.</li>
        <li>Leaving you with more questions than answers.</li>
    </ul>

    <p>They read like conclusions, not punchlines. They don’t ask for attention. They don’t ask the reader to laugh. They just end the conversation.</p>

    <h3 class="crt-green mt-2">Post Mortem</h3>
    <p>Sometimes the best thing you can do with a tool is make it do something it was never meant to do. Sometimes that thing is useful. Sometimes it’s just funny. Either way, it reminds you the system isn’t magic, it’s just waiting for someone bored enough to poke it.</p>

    <pre class="glitch mt-2"> &gt;&gt; END OF TRANSMISSION </pre>
    <p class="post-signature">- {{ page.author }}</p>
    <p class="post-signature">If I had to, I could clean out my desk in five seconds, and nobody would ever know that I’d ever been here.</p>
</div>