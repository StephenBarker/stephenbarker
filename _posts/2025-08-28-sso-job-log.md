---
layout: default
title: "SSO Job Log // Transmission 1615/CorpNet"
date: 2025-08-28 10:00:00 -0000
author: HotChip
---

<div class="terminal-log terminal-log--left-aligned">
  <h2 class="crt-green">{{ page.title }}</h2>
  <p>SSO-usually easy creds. Spin up the IdP, toss in some accounts, wire up a few groups, maybe sprinkle some SAML-done. Corporate credit secured.</p>
  <p>Not this cycle. Docs? Straight dog water. Get the accounts in, half the identity file crashes out with <code>&lt;&lt;can’t override local id&gt;&gt;</code>. Drop into the admin console, run some deep packet scrying, and find the real enemy: some ancient config lopping off the first two bytes of every ID. Can’t patch. Can’t override.</p>
  <p>Solution? <code>Ctrl+A → DEL</code>. Nuked 1100 accounts like yesterday’s malware. Cave-man SFTP, shove in a fresh file, and suddenly the system purrs with proper IDs.</p>
  <p>But now I’m feeding 6k identities a night into a box that feels like it’s running on a Cold War repurposed nuke mainboard. Chokes on anything over 500 rows per file. 1k? Dead. 750? Dead. 500? Yes, queen.</p>
  <p>To make it worse, the filename spec is peak corp-masochism:</p>
  <pre>YYYYMMDDHHMM-identity.csv</pre>
  <p>So I split the payload at 16:15, generate 12 shards as <code>1615-identity-01.csv … 1615-identity-12.csv</code>. Extra archival file for my own records: <code>1615-identity.csv</code>.</p>
  <p>All good-until the devs drop their next surprise. Turns out the file index can’t end in a divisible by 10. My 10th shard? Ghosted from import. Now we code around the superstition and skip the tens.</p>
  <p>And that’s the state: fragile legacy infra, duct-taped compliance, Cold War iron. Still running. Still importing. Still winning.</p>
  <p>Lesson: brittle legacy pipelines mean you’re not just fighting code, you’re fighting entropy. Split jobs early and plan for arbitrary constraints.</p>
  <p class="glitch mt-2">Corporate. Deep state. Same circuit.</p>
  <p class="post-signature">- {{ page.author }}</p>
</div>