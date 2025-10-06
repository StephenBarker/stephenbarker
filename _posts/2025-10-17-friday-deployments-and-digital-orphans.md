---
layout: default
title: "SysAdmin Report // Friday Deployments and Digital Orphans"
date: 2025-10-17 17:58:00 -0000
author: HotChip
excerpt: "A quiet log of a Friday deployment gone wrong, a manual rollback from the brink, and the digital ghosts left behind in the database. Some fixes never make it into the official report."
tags: [sql, database, sysadmin, incident, rollback, hotchip, cyberpunk, murderbot]
---
<div class="terminal-log terminal-log--left-aligned">
    <h2 class="crt-green">{{ page.title }}</h2>
    <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
    <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
    <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

    <h3 class="crt-green mt-2">[FRI 15:04]</h3>
    <p>AssetCorp Global© decreed all fixed assets must be reconciled before the weekend reboot. No reason given, just an all-hands ping, subject line: “FA Updates – Urgent Before EOD.”</p>
    <p>It’s always before EOD.</p>
    <p>Caffeine levels: low. Hope levels: deprecated but still in use.</p>

    <h3 class="crt-green mt-2">[FRI 16:12]</h3>
    <p>Production. Fixed Assets. Only 300 rows. Harmless enough, right? Made a copy of the select in Sheets, insurance policy against disaster. (Spoiler: I’d need it.)</p>
<pre><code class="language-sql">
UPDATE D
SET FAJOB = H.JOBNO,
    LIFEREM = H.LIFEREM,
    ACCAMT  = H.ACCAMT,
    LYRAMT  = H.LYRAMT,
    BOOKAMT = H.BOOKAMT,
    YTDAMT  = H.YTDAMT,
    LASTDT  = H.LASTDT,
    LASTAMT = H.LASTAMT
FROM FA_DEPR D
INNER JOIN FA_IDNT A ON A.faid = D.faid
INNER JOIN FA_HIST H ON D.faid = H.faid
WHERE H.jobno = '8675309'
  AND H.fa_ledger = 'GL'
  AND A.sc > 9000
</code></pre>
    <p>Rolled it out. Looked fine. Wasn’t fine. Bad data upstream, user error, of course. Nothing wrong with the SQL. (It’s never the SQL)</p>

    <h3 class="crt-green mt-2">[FRI 16:45]</h3>
    <p>Rollback initiated. Data ghosts swirling. Google Sheet copy: the only clean backup between me and digital ruin. Used fastestsqlinthewest.web.app The Wild West of rollback generation. Cut, paste, breathe.</p>
<pre><code class="language-sql">
UPDATE FA_DEPR
SET FAJOB = '8675308',
    LIFEREM = '244',
    ACCAMT  = '163009.39',
    LYRAMT  = '0',
    BOOKAMT = '3931005.28',
    YTDAMT  = '106379.39',
    LASTDT  = '2024-06-30 00:00:00',
    LASTAMT = '0'
WHERE unique_id = '14950'
GO
</code></pre>
    <p>Repeat for a few dozen records. One by one. Each <code>GO</code> like a small bubble into the void. End of day approaches. The system hums. I close the terminal and walk away.</p>

    <h3 class="crt-green mt-2">[MON 08:32]</h3>
    <p>Back in. New ticket waiting: “Still not showing correct FAJOB in GL view.” Of course not. The ghosts never rest. Ran diagnostics. Pulled comparisons.</p>
<pre><code class="language-sql">
SELECT a.sc, H.JOBNO,
       d.LIFEREM, H.LIFEREM,
       d.ACCAMT,  H.ACCAMT,
       d.LYRAMT,  H.LYRAMT,
       d.BOOKAMT, H.BOOKAMT,
       d.YTDAMT,  H.YTDAMT,
       d.LASTDT,  H.LASTDT,
       d.LASTAMT, H.LASTAMT,
       H.POSTDT, *
FROM FA_DEPR D
INNER JOIN FA_IDNT A ON A.faid = D.faid
INNER JOIN FA_HIST H ON D.faid = H.faid
WHERE H.jobno = '8675308'
  AND H.fa_ledger = 'GL'
ORDER BY H.LIFEREM
</code></pre>
    <p>There it was. Bad job number, bad lineage, bad luck. The ghosts were breeding.</p>

    <h3 class="crt-green mt-2">[MON 09:11]</h3>
    <p>Cleansing begins. A quiet purge.</p>
<pre><code class="language-sql">
DELETE FROM FA_HIST
WHERE faid IN ('F001','F002','F003','F005','F006','F017','F020','F024')
GO

DELETE FROM FA_DEPR
WHERE faid IN ('F001','F002','F003','F005','F006','F017','F020','F024')
GO
</code></pre>
    <p>The kind of digital erasure that keeps the lights on. The kind that leaves shadows in the logs.</p>

    <h3 class="crt-green mt-2">[MON 09:37]</h3>
    <p>Tested the new job. Aligned the histories. Showed the user a preview. They nodded like they understood. They didn’t. Pushed the corrected update to The Corp®.</p>
<pre><code class="language-sql">
UPDATE D
SET FAJOB = H.JOBNO,
    LIFEREM = H.LIFEREM,
    ACCAMT  = H.ACCAMT,
    LYRAMT  = H.LYRAMT,
    BOOKAMT = H.BOOKAMT,
    YTDAMT  = H.YTDAMT,
    LASTDT  = H.LASTDT,
    LASTAMT = H.LASTAMT
FROM FA_DEPR D
INNER JOIN FA_IDNT A ON A.faid = D.faid
INNER JOIN FA_HIST H ON D.faid = H.faid
WHERE H.jobno = '8675309'
  AND H.fa_ledger = 'GL'
  AND A.sc > '9000'
</code></pre>
    <p>The Corp® declared success. KPIs improved by 0.004%. The machine lurches forward.</p>

    <h3 class="crt-green mt-2">[MON 17:58]</h3>
    <p>All systems “green.” But I know. Without those DELETEs, the orphaned records still whisper in the archives. They’ll sit there forever. half-alive, half-remembered, until depreciation wipes them clean. Three people in the entire org will ever know what happened. None will mention it.</p>
    <p>I log off. The hum fades. The monitors glow in the dark.</p>
    <p class="mt-2">The database always remembers, even when the users don’t.</p>

    <pre class="glitch mt-2"> &gt;&gt; END OF TRANSMISSION </pre>
    <p class="post-signature">- {{ page.author }}</p>
</div>