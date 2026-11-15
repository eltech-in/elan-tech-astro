/* Screens ("step inside the tower") for every product, and animated visuals for every service.
   Injected into deck.template.html by build.mjs. All data is invented sample data. */
const tag = '<span class="tag-sample">Sample data</span>';
const chrome = t => `<div class="chrome"><i></i><i></i><i></i><span>${t}</span></div>`;
const dly = (n, extra) => `style="--d:${n}s${extra ? ';' + extra : ''}"`;
const vis = (title, body, glow) => `<div class="vis" style="--glow:${glow || 'rgba(34,211,238,.28)'}"><span class="vt">${title}</span><svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet">${body}</svg></div>`;

Object.assign(MOCK, {
  /* ---------------- products ---------------- */
  insurance: () => `<div class="win ins" style="--glow:rgba(16,185,129,.42)">${chrome('Insurance Agency Portal')}${tag}<div class="app">
    <aside class="side" style="background:#0b2a22"><div class="brand"><b style="background:linear-gradient(135deg,#10b981,#0ea5e9)"></b><div><strong>Agency Portal</strong><small>Policies · Renewals</small></div></div><nav>${NAVS(['Dashboard', 'Customers', 'Policies', 'Renewals', 'Commissions', 'Sub-agents', 'Quotations', 'Deposits', 'Reports'])}</nav></aside>
    <section class="main"><header><div><h4>Good morning, Priya</h4><p>Renewals, premiums and commissions at a glance.</p></div><span class="btn2">New quotation</span></header>
      <div class="kpis" style="grid-template-columns:repeat(4,1fr)"><div class="kpi g"><small>Customers</small><strong>1,284</strong><em>+18 this month</em></div><div class="kpi b"><small>Active policies</small><strong>1,742</strong><em>LIC · Health · Motor</em></div><div class="kpi a"><small>Renewals due</small><strong>38</strong><em>next 30 days</em></div><div class="kpi v"><small>Commission</small><strong>2.4 L</strong><em>this month</em></div></div>
      <div class="cols" style="grid-template-columns:1.2fr 1fr 1.35fr">
        <div class="card2"><h5>Premium collected <span>12 months</span></h5><div class="chart" style="--k:#10b981">${[40, 52, 48, 61, 58, 70, 66, 78, 74, 86, 82, 94].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>
        <div class="card2"><h5>Policies by type</h5>${[['LIC', '46%', 46, '#10b981'], ['Health', '28%', 28, '#0ea5e9'], ['Motor', '18%', 18, '#f59e0b'], ['General', '8%', 8, '#8b5cf6']].map(([n, l, w, c]) => `<div class="row2"><span>${n}</span><div class="hb" style="--k:${c};--w:${w * 2}%"><i></i></div><span>${l}</span></div>`).join('')}</div>
        <div class="card2"><h5>Upcoming renewals <span>38</span></h5><ul class="tbl">${[['R. Deshmukh', 'LIC', '12 Dec', '#10b981'], ['S. Khan', 'Health', '14 Dec', '#0ea5e9'], ['A. Verma', 'Motor', '15 Dec', '#f59e0b'], ['M. Iyer', 'LIC', '19 Dec', '#10b981']].map(([n, t, d, c]) => `<li><b>${n}</b><span><i class="chip" style="--c:${c}">${t}</i></span><span>${d}</span></li>`).join('')}</ul></div>
      </div>
      <div class="card2"><h5>Sub-agent commissions <span>5 sub-agents</span></h5><div class="tiles">${[['Verma Associates', 72, '#10b981'], ['Khan Advisors', 55, '#0ea5e9'], ['Iyer & Co', 88, '#8b5cf6']].map(([n, w, c]) => `<div class="tile" style="--k:${c}"><b>${n}</b><small>Commission this month</small><div class="bar"><i style="width:${w}%"></i></div></div>`).join('')}</div></div>
    </section></div></div>`,

  realestate: () => `<div class="win re" style="--glow:rgba(0,229,160,.42);--k:#059669">${chrome('Real Estate Portal')}${tag}
    <div class="sitebar"><strong>HomeFinder</strong><span>Buy</span><span>Rent</span><span>Sell</span><span>Joint ventures</span><a class="cta">Post a property</a></div>
    <div class="search"><span>Location · City centre</span><span>Budget · Any</span><span>Type · Apartment</span><b>Search</b></div>
    <div style="display:grid;grid-template-columns:2.3fr 1fr;gap:.8rem;padding:.9rem 1rem">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem">${[['Lakeview Residences', '3 bed · 1,450 sq ft', '#38bdf8', '#6366f1', 'Verified'], ['Orchard Villas', '4 bed · Garden plot', '#34d399', '#059669', 'New'], ['Skyline Offices', 'Commercial · 2,200 sq ft', '#f59e0b', '#ef4444', 'Verified']].map(([n, s, a, b, e], i) => `<div class="prop" style="--i:${i}"><div class="ph" style="--a:${a};--b:${b}"><em>${e}</em></div><b>${n}</b><small>${s}</small></div>`).join('')}
        <div class="prop" style="--i:3"><div class="ph" style="--a:#f472b6;--b:#8b5cf6"><em>Agent</em></div><b>Agent dashboards</b><small>Listings and leads</small></div>
        <div class="prop" style="--i:4"><div class="ph" style="--a:#22d3ee;--b:#0ea5e9"><em>Search</em></div><b>Advanced filters</b><small>Budget, BHK, type</small></div>
        <div class="prop" style="--i:5"><div class="ph" style="--a:#a3e635;--b:#16a34a"><em>Land</em></div><b>Plots and land</b><small>Agricultural, commercial</small></div></div>
      <div class="mapcard">${[[18, 22], [52, 40], [70, 18], [35, 66], [78, 62], [58, 82]].map(([x, y], i) => `<i class="pin" style="--k:#059669;--i:${i};left:${x}%;top:${y}%"></i>`).join('')}</div>
    </div></div>`,

  resort: () => `<div class="win rs" style="--glow:rgba(245,158,11,.42)">${chrome('Resort Management Portal')}${tag}<div class="app">
    <aside class="side" style="background:#2a1a08"><div class="brand"><b style="background:linear-gradient(135deg,#f59e0b,#ef4444)"></b><div><strong>Resort Portal</strong><small>Bookings · Operations</small></div></div><nav>${NAVS(['Dashboard', 'Bookings', 'Rooms', 'Housekeeping', 'Billing', 'Staff', 'Reports'])}</nav></aside>
    <section class="main"><header><div><h4>Today at the property</h4><p>Occupancy, arrivals and housekeeping.</p></div><span class="btn2">New booking</span></header>
      <div class="kpis" style="grid-template-columns:repeat(4,1fr)"><div class="kpi a"><small>Occupancy</small><strong>82%</strong><em>14 of 17 rooms</em></div><div class="kpi g"><small>Arrivals today</small><strong>6</strong><em>2 early check-ins</em></div><div class="kpi b"><small>Departures</small><strong>4</strong><em>billing ready</em></div><div class="kpi v"><small>Rooms ready</small><strong>11</strong><em>3 in housekeeping</em></div></div>
      <div class="card2"><h5>Booking calendar <span>Next 14 days</span></h5><div class="cal">
        <span class="h" style="grid-column:1"></span>${Array.from({ length: 14 }, (_, i) => `<span class="h" style="grid-row:1;grid-column:${i + 2}">${i + 1}</span>`).join('')}
        ${['Villa 1', 'Villa 2', 'Suite 3', 'Suite 4', 'Cottage 5', 'Cottage 6'].map((r, i) => `<span class="r" style="grid-row:${i + 2};grid-column:1">${r}</span>`).join('')}
        ${[[2, 2, 5, '#f59e0b', 'A. Rao'], [2, 8, 4, '#10b981', 'Kulkarni'], [3, 3, 3, '#6366f1', 'Group'], [3, 7, 6, '#f59e0b', 'S. Mehta'], [4, 2, 7, '#ec4899', 'Wedding'], [4, 10, 4, '#10b981', 'J. Dsouza'], [5, 4, 4, '#6366f1', 'Patel'], [6, 2, 3, '#10b981', 'Nair'], [6, 6, 6, '#f59e0b', 'Singh'], [7, 3, 5, '#ec4899', 'Retreat']].map(([r, c, n, k, t], i) => `<span class="bk" style="grid-row:${r};grid-column:${c}/span ${n};--k:${k};--i:${i}">${t}</span>`).join('')}
      </div></div>
    </section></div></div>`,

  conference: () => `<div class="win cf" style="--glow:rgba(99,102,241,.45);--k:#6366f1">${chrome('Medical Conference Portal')}${tag}
    <div class="sitebar"><strong>Annual Medical Conference</strong><span>Programme</span><span>Faculty</span><span>Abstracts</span><a class="cta">Register</a></div>
    <div class="hero2"><div><h4>Annual Medical Conference 2027</h4><p>Registration open · Abstract submission open · Certificates issued online</p></div><div class="count"><div><b>112</b><small>days</small></div><div><b>09</b><small>hours</small></div><div><b>41</b><small>min</small></div></div></div>
    <div class="tiers">${[['Delegates', '#6366f1'], ['PG Students', '#8b5cf6'], ['AC Members', '#ec4899']].map(([n, c]) => `<div class="tier"><b>${n}</b><small>Registration open</small><i class="chip" style="--c:${c}">Register</i></div>`).join('')}</div>
    <ul class="sched">${[['09:00', 'Inauguration and welcome', 'Hall A', '#6366f1'], ['10:30', 'Keynote: advances in clinical practice', 'Hall A', '#8b5cf6'], ['12:00', 'Workshop: case discussions', 'Hall B', '#ec4899'], ['14:00', 'Abstract presentations', 'Hall C', '#10b981']].map(([t, n, h, c]) => `<li><time>${t}</time><span>${n}</span><i class="chip" style="--c:${c}">${h}</i></li>`).join('')}</ul></div>`,

  digibizid: () => `<div class="win db" style="--glow:rgba(244,114,182,.42)">${chrome('Digital Biz ID')}${tag}<div class="app">
    <aside class="side" style="background:#2a0f20"><div class="brand"><b style="background:linear-gradient(135deg,#f472b6,#8b5cf6)"></b><div><strong>Digital Biz ID</strong><small>Your card</small></div></div><nav>${NAVS(['My card', 'Templates', 'Showcase', 'Analytics', 'Share'])}</nav></aside>
    <section class="main"><header><div><h4>Your digital business card</h4><p>One link, one QR code, always up to date.</p></div><span class="btn2">Share card</span></header>
      <div class="cols" style="grid-template-columns:.8fr 1.4fr">
        <div class="card2" style="text-align:center"><i class="avatar" style="--c:#ec4899;width:2.6rem;height:2.6rem;font-size:1rem;margin:0 0 .4rem">A</i><h5 style="justify-content:center">Asha Mehta</h5><small style="color:#64748b;font-size:.58rem">Founder, Sample Studio</small><div style="margin:.6rem auto;width:4.6rem;height:4.6rem;border-radius:.5rem;background:conic-gradient(from 0deg,#0f172a 0 25%,#fff 0 50%,#0f172a 0 75%,#fff 0) 0 0/.7rem .7rem;border:.3rem solid #fff;box-shadow:0 0 0 1px #e2e8f0"></div><i class="chip" style="--c:#ec4899">Save contact</i></div>
        <div><div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi v"><small>Profile views</small><strong>1,284</strong><em>this month</em></div><div class="kpi a"><small>QR scans</small><strong>356</strong><em>at events</em></div><div class="kpi g"><small>Contacts saved</small><strong>212</strong><em>+18%</em></div></div>
        <div class="card2" style="margin-top:.5rem"><h5>Views <span>last 8 weeks</span></h5><div class="chart" style="--k:#ec4899;height:3.6rem">${[30, 42, 38, 55, 61, 58, 74, 88].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div></div>
      </div>
    </section></div></div>`,

  society: () => `<div class="win sc" style="--glow:rgba(236,72,153,.42)">${chrome('IMA Society Portal')}${tag}<div class="app">
    <aside class="side" style="background:#2a0f20"><div class="brand"><b style="background:linear-gradient(135deg,#ec4899,#8b5cf6)"></b><div><strong>Society Portal</strong><small>Members · Events</small></div></div><nav>${NAVS(['Dashboard', 'Members', 'Renewals', 'Events', 'Documents', 'Payments', 'Circulars'])}</nav></aside>
    <section class="main"><header><div><h4>Welcome, Secretary</h4><p>Memberships, renewals and events.</p></div><span class="btn2">Add member</span></header>
      <div class="kpis" style="grid-template-columns:repeat(4,1fr)"><div class="kpi v"><small>Members</small><strong>2,340</strong><em>+24 this month</em></div><div class="kpi a"><small>Renewals due</small><strong>87</strong><em>reminders sent</em></div><div class="kpi b"><small>Events</small><strong>4</strong><em>this month</em></div><div class="kpi g"><small>Dues collected</small><strong>91%</strong><em>online payments</em></div></div>
      <div class="cols" style="grid-template-columns:1.3fr 1fr 1fr">
        <div class="card2"><h5>Member directory <span>2,340</span></h5><ul class="mem">${[['Dr. A. Kulkarni', 'Active', '#10b981', '#6366f1'], ['Dr. S. Rao', 'Renewal due', '#f59e0b', '#ec4899'], ['Dr. M. Shah', 'Active', '#10b981', '#8b5cf6'], ['Dr. P. Nair', 'Active', '#10b981', '#0ea5e9']].map(([n, s, c, a]) => `<li><span><i class="avatar" style="--c:${a}">${n.split(' ')[1][0]}</i>${n}</span><i class="chip" style="--c:${c}">${s}</i></li>`).join('')}</ul></div>
        <div class="card2"><h5>Fee collection <span>monthly</span></h5><div class="chart" style="--k:#ec4899">${[48, 60, 55, 72, 66, 80, 76, 91].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>
        <div class="card2"><h5>Upcoming events</h5><ul class="tbl" style="font-size:.6rem">${[['CME session', '12 Dec'], ['Annual meet', '20 Dec'], ['Health camp', '04 Jan']].map(([n, d]) => `<li style="grid-template-columns:1fr auto"><b>${n}</b><span>${d}</span></li>`).join('')}</ul></div>
      </div>
    </section></div></div>`,

  /* ---------------- services ---------------- */
  branding: () => vis('Branding & Identity', `
    <path class="l p dr" ${dly(0, '--len:420')} d="M160 110 L222 146 L222 218 L160 254 L98 218 L98 146 Z"/>
    <circle class="l dr" cx="160" cy="182" r="30" ${dly(.5, '--len:200')}/><circle class="po" cx="160" cy="182" r="12" fill="#f472b6" ${dly(1.1)}/>
    <text class="fi" x="96" y="326" font-size="58" font-weight="800" fill="#fff" ${dly(1.2)}>Aa</text>
    <text class="fi" x="188" y="322" font-size="16" fill="#9fb0d0" ${dly(1.4)}>Typography</text>
    ${['#f472b6', '#22d3ee', '#00e5a0', '#fbbf24', '#a78bfa'].map((c, i) => `<rect class="po" x="${330 + i * 58}" y="96" width="48" height="104" rx="12" fill="${c}" ${dly(.6 + i * .15)}/>`).join('')}
    <g class="po" ${dly(1.6)}><rect x="330" y="232" width="270" height="130" rx="16" fill="#0f1b33" stroke="#334155"/><path d="M372 252 l22 12 v24 l-22 12 l-22 -12 v-24z" fill="none" stroke="#f472b6" stroke-width="3"/><rect x="350" y="318" width="150" height="9" rx="4" fill="#64748b"/><rect x="350" y="336" width="100" height="9" rx="4" fill="#334155"/></g>`, 'rgba(244,114,182,.3)'),

  'website-design': () => vis('Website Design', `
    <rect class="l dr" x="60" y="64" width="520" height="292" rx="16" ${dly(0, '--len:1700')}/>
    <path class="l dr" d="M60 104 H580" ${dly(.5, '--len:520')}/>${[0, 1, 2].map(i => `<circle class="po" cx="${84 + i * 20}" cy="84" r="5" fill="${['#fb7185', '#fbbf24', '#34d399'][i]}" ${dly(.6 + i * .1)}/>`).join('')}
    <rect class="l g dr" x="84" y="124" width="300" height="104" rx="12" ${dly(.9, '--len:820')}/>
    <rect class="sx" x="104" y="146" width="190" height="14" rx="7" fill="#e8eefc" ${dly(1.5)}/><rect class="sx" x="104" y="172" width="140" height="10" rx="5" fill="#64748b" ${dly(1.7)}/><rect class="po" x="104" y="196" width="86" height="22" rx="11" fill="#00e5a0" ${dly(2)}/>
    <rect class="l v dr" x="404" y="124" width="152" height="104" rx="12" ${dly(1.1, '--len:520')}/>
    ${[0, 1, 2].map(i => `<rect class="po" x="${84 + i * 156}" y="252" width="140" height="84" rx="12" fill="rgba(34,211,238,.12)" stroke="#22d3ee" stroke-width="2" ${dly(2.2 + i * .2)}/>`).join('')}
    <g class="cursor"><path d="M300 250 l0 30 l9 -8 l7 14 l6 -3 l-7 -14 l12 -1z" fill="#fff" stroke="#0b1220" stroke-width="1.5"/><circle class="rip" cx="300" cy="250" r="14" fill="none" stroke="#00e5a0" stroke-width="3"/></g>`),

  accessibility: () => vis('ADA & WCAG Compliance', `
    ${[0, 1, 2].map(i => `<rect class="po" x="${70 + i * 190}" y="120" width="160" height="58" rx="14" fill="rgba(34,211,238,.1)" stroke="#475569" stroke-width="2" ${dly(.2 + i * .15)}/><text class="fi" x="${150 + i * 190}" y="156" text-anchor="middle" font-size="17" font-weight="700" ${dly(.5 + i * .15)}>${['Book now', 'Contact', 'Learn more'][i]}</text>`).join('')}
    <g class="focus"><rect x="64" y="114" width="172" height="70" rx="18" fill="none" stroke="#fbbf24" stroke-width="4"/></g>
    <g class="po" ${dly(1)}><rect x="70" y="212" width="196" height="46" rx="23" fill="rgba(0,229,160,.14)" stroke="#00e5a0" stroke-width="2"/><text x="168" y="241" text-anchor="middle" font-size="17" font-weight="800" fill="#00e5a0" style="fill:#00e5a0">Contrast 4.5 : 1</text></g>
    ${['Keyboard navigation', 'Screen reader labels', 'Colour contrast', 'Accessible forms'].map((t, i) => `<g class="fi" ${dly(1.3 + i * .3)}><path class="l g dr" d="M${86 + (i % 2) * 280} ${304 + Math.floor(i / 2) * 44} l11 11 l22 -24" ${dly(1.4 + i * .3, '--len:70')}/><text x="${130 + (i % 2) * 280}" y="${315 + Math.floor(i / 2) * 44}" font-size="18">${t}</text></g>`).join('')}`, 'rgba(251,191,36,.28)'),

  'web-dev': () => vis('Web Development', `
    <rect class="l dr" x="60" y="62" width="520" height="276" rx="16" ${dly(0, '--len:1650')}/><path class="l dr" d="M60 100 H580" ${dly(.4, '--len:520')}/>
    ${[['#a78bfa', 150], ['#22d3ee', 230], ['#e8eefc', 190], ['#00e5a0', 270], ['#fbbf24', 150], ['#e8eefc', 220], ['#22d3ee', 120], ['#a78bfa', 250]].map(([c, w], i) => `<rect class="sx" x="${96 + (i % 3 === 1 ? 26 : 0)}" y="${122 + i * 24}" width="${w}" height="10" rx="5" fill="${c}" ${dly(.6 + i * .22)}/>`).join('')}
    <rect class="po" x="60" y="352" width="520" height="38" rx="12" fill="#0b1220" stroke="#334155" ${dly(2.4)}/><text class="fi" x="80" y="377" font-size="16" fill="#00e5a0" style="fill:#00e5a0" ${dly(2.6)}>$ astro build</text><rect class="sx" x="240" y="366" width="320" height="9" rx="4" fill="#00e5a0" ${dly(2.8)}/>`, 'rgba(167,139,250,.3)'),

  maintenance: () => vis('Maintenance & Security', `
    <path class="l g dr" d="M160 100 C200 118 230 122 262 122 V210 C262 262 214 296 160 320 C106 296 58 262 58 210 V122 C90 122 120 118 160 100 Z" ${dly(0, '--len:760')}/>
    <path class="l g dr" d="M116 206 l32 34 l62 -70" ${dly(1.1, '--len:200')} style="stroke-width:7;--d:1.1s;--len:200"/>
    ${['Software updates', 'Daily backups', 'Security scans', 'Uptime monitoring'].map((t, i) => `<g class="po" ${dly(.9 + i * .3)}><rect x="320" y="${100 + i * 62}" width="270" height="48" rx="14" fill="rgba(0,229,160,.08)" stroke="rgba(0,229,160,.4)"/><circle cx="346" cy="${124 + i * 62}" r="7" fill="#00e5a0"/><text x="366" y="${130 + i * 62}" font-size="18" font-weight="600">${t}</text></g>`).join('')}`, 'rgba(0,229,160,.3)'),

  seo: () => vis('Search Engine Optimization', `
    <rect class="l dr" x="60" y="86" width="330" height="44" rx="22" ${dly(0, '--len:760')}/><circle class="l" cx="86" cy="108" r="8"/><path class="l" d="M92 114 l8 8"/>
    <text class="fi" x="116" y="115" font-size="17" fill="#9fb0d0" ${dly(.6)}>web design company</text><rect class="blink" x="288" y="98" width="2" height="20" fill="#22d3ee"/>
    <g class="rise1"><rect x="60" y="150" width="330" height="62" rx="14" fill="rgba(0,229,160,.12)" stroke="#00e5a0" stroke-width="2.5"/><rect x="80" y="166" width="140" height="10" rx="5" fill="#00e5a0"/><rect x="80" y="186" width="250" height="8" rx="4" fill="#9fb0d0"/><circle cx="364" cy="181" r="12" fill="#00e5a0"/><text x="364" y="187" text-anchor="middle" font-size="15" font-weight="800" fill="#06101a" style="fill:#06101a">1</text></g>
    <rect x="60" y="226" width="330" height="62" rx="14" fill="rgba(255,255,255,.04)" stroke="#334155"/><rect x="80" y="242" width="120" height="10" rx="5" fill="#64748b"/><rect x="80" y="262" width="220" height="8" rx="4" fill="#475569"/>
    <rect x="60" y="302" width="330" height="62" rx="14" fill="rgba(255,255,255,.04)" stroke="#334155"/><rect x="80" y="318" width="100" height="10" rx="5" fill="#64748b"/><rect x="80" y="338" width="200" height="8" rx="4" fill="#475569"/>
    <path class="l dr" d="M440 330 H590 M440 330 V110" ${dly(.4, '--len:310')} style="stroke:#475569"/>
    <path class="l g dr" d="M450 310 C490 300 500 250 530 230 S570 160 586 120" ${dly(1, '--len:330')} style="stroke-width:4"/><path class="l g dr" d="M566 118 h22 v22" ${dly(2.2, '--len:50')} style="stroke-width:4"/>`),

  marketing: () => vis('Digital Marketing', `
    <path class="l dr" d="M70 100 H420 L370 190 H120 Z" ${dly(0, '--len:900')}/><path class="l g dr" d="M120 190 H370 L335 270 H155 Z" ${dly(.6, '--len:640')}/><path class="l a dr" d="M155 270 H335 L305 340 H185 Z" ${dly(1.2, '--len:480')}/>
    <text class="fi" x="245" y="152" text-anchor="middle" font-size="19" font-weight="700" ${dly(.9)}>Reach</text><text class="fi" x="245" y="238" text-anchor="middle" font-size="19" font-weight="700" ${dly(1.4)}>Leads</text><text class="fi" x="245" y="312" text-anchor="middle" font-size="19" font-weight="700" ${dly(1.9)}>Customers</text>
    <path class="l fl" d="M245 60 V96" style="stroke:#22d3ee"/><path class="l fl g" d="M245 190 V196" style="stroke:#00e5a0"/>
    ${[[470, 150, 190], [520, 150, 140], [570, 150, 86]].map(([x, y, h], i) => `<rect class="sy" x="${x}" y="${340 - h}" width="34" height="${h}" rx="8" fill="${['#22d3ee', '#00e5a0', '#fbbf24'][i]}" ${dly(1.6 + i * .25)}/>`).join('')}
    <text class="fi" x="525" y="372" text-anchor="middle" font-size="15" fill="#9fb0d0" ${dly(2.4)}>Campaign results</text>`, 'rgba(251,191,36,.28)'),

  mobile: () => vis('Mobile App Development', `
    <rect class="l dr" x="225" y="40" width="190" height="330" rx="32" ${dly(0, '--len:1100')}/><rect class="l dr" x="290" y="52" width="60" height="9" rx="4.5" ${dly(.4, '--len:140')}/>
    <rect class="po" x="243" y="82" width="154" height="40" rx="12" fill="rgba(34,211,238,.18)" ${dly(.6)}/><rect class="po" x="243" y="136" width="154" height="74" rx="14" fill="rgba(167,139,250,.18)" ${dly(.8)}/><rect class="po" x="243" y="222" width="72" height="62" rx="14" fill="rgba(0,229,160,.18)" ${dly(1)}/><rect class="po" x="325" y="222" width="72" height="62" rx="14" fill="rgba(251,191,36,.18)" ${dly(1.1)}/>
    <rect class="po" x="243" y="304" width="154" height="40" rx="20" fill="#00e5a0" ${dly(1.3)}/><text class="fi" x="320" y="330" text-anchor="middle" font-size="16" font-weight="800" fill="#06101a" style="fill:#06101a" ${dly(1.5)}>Continue</text>
    <circle class="rip" cx="320" cy="324" r="20" fill="none" stroke="#00e5a0" stroke-width="3"/>
    <g class="po" ${dly(2.2)}><rect x="450" y="120" width="150" height="50" rx="25" fill="#0f1b33" stroke="#22d3ee"/><circle cx="478" cy="145" r="10" fill="#22d3ee"/><text x="498" y="151" font-size="15">Order shipped</text></g>
    <g class="po" ${dly(2.6)}><rect x="40" y="200" width="150" height="50" rx="25" fill="#0f1b33" stroke="#a78bfa"/><circle cx="68" cy="225" r="10" fill="#a78bfa"/><text x="88" y="231" font-size="15">New message</text></g>`, 'rgba(0,229,160,.28)'),

  ecommerce: () => vis('eCommerce Development', `
    ${[0, 1, 2].map(i => `<g class="po" ${dly(.2 + i * .2)}><rect x="${60 + i * 150}" y="96" width="132" height="176" rx="16" fill="rgba(255,255,255,.04)" stroke="#334155"/><rect x="${72 + i * 150}" y="108" width="108" height="84" rx="10" fill="${['#22d3ee', '#a78bfa', '#00e5a0'][i]}" opacity=".35"/><circle cx="${126 + i * 150}" cy="150" r="22" fill="${['#22d3ee', '#a78bfa', '#00e5a0'][i]}"/><rect x="${72 + i * 150}" y="208" width="84" height="9" rx="4" fill="#9fb0d0"/><rect x="${72 + i * 150}" y="228" width="50" height="9" rx="4" fill="#64748b"/><rect x="${126 + i * 150}" y="244" width="54" height="20" rx="10" fill="#00e5a0"/></g>`).join('')}
    <path class="l dr" d="M488 110 h22 l14 56 h66 l12 -40 h-86" ${dly(1, '--len:300')} style="stroke-width:3"/><circle class="po" cx="534" cy="192" r="9" fill="none" stroke="#22d3ee" stroke-width="3" ${dly(1.3)}/><circle class="po" cx="590" cy="192" r="9" fill="none" stroke="#22d3ee" stroke-width="3" ${dly(1.4)}/>
    <g class="po" ${dly(1.6)}><circle cx="590" cy="104" r="17" fill="#f472b6"/><text class="cartn" x="590" y="110" text-anchor="middle" font-size="17" font-weight="800" fill="#fff" style="fill:#fff">3</text></g>
    <g class="po" ${dly(2)}><rect x="60" y="298" width="250" height="52" rx="26" fill="#00e5a0"/><text x="185" y="331" text-anchor="middle" font-size="19" font-weight="800" fill="#06101a" style="fill:#06101a">Checkout</text></g>
    <text class="fi" x="350" y="330" font-size="16" fill="#9fb0d0" ${dly(2.4)}>Shopify · WooCommerce · Medusa.js</text>`, 'rgba(0,229,160,.28)'),

  'crm-erp': () => vis('Custom CRM & ERP', `
    ${[[320, 200], [130, 110], [510, 110], [130, 300], [510, 300]].slice(1).map(([x, y], i) => `<path class="l fl" d="M320 200 L${x} ${y}" style="stroke:${['#22d3ee', '#a78bfa', '#00e5a0', '#fbbf24'][i]};opacity:.8"/>`).join('')}
    <circle class="po" cx="320" cy="200" r="52" fill="rgba(34,211,238,.14)" stroke="#22d3ee" stroke-width="3" ${dly(.2)}/><text class="fi" x="320" y="196" text-anchor="middle" font-size="16" font-weight="800" ${dly(.5)}>Your</text><text class="fi" x="320" y="216" text-anchor="middle" font-size="16" font-weight="800" ${dly(.5)}>system</text>
    ${[[130, 110, 'Customers', '#22d3ee'], [510, 110, 'Orders', '#a78bfa'], [130, 300, 'Stock', '#00e5a0'], [510, 300, 'Billing', '#fbbf24']].map(([x, y, n, c], i) => `<g class="po" ${dly(.6 + i * .2)}><rect x="${x - 62}" y="${y - 28}" width="124" height="56" rx="16" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="17" font-weight="700">${n}</text></g>`).join('')}`, 'rgba(167,139,250,.3)'),

  integrations: () => vis('Third-Party Integrations', `
    ${[[140, 110, '#22d3ee'], [500, 110, '#a78bfa'], [140, 300, '#00e5a0'], [500, 300, '#fbbf24']].map(([x, y, c]) => `<path class="l fl" d="M320 200 L${x} ${y}" style="stroke:${c};opacity:.85"/>`).join('')}
    <circle class="po" cx="320" cy="200" r="54" fill="rgba(0,229,160,.14)" stroke="#00e5a0" stroke-width="3" ${dly(.2)}/><text class="fi" x="320" y="196" text-anchor="middle" font-size="16" font-weight="800" ${dly(.5)}>Your</text><text class="fi" x="320" y="216" text-anchor="middle" font-size="16" font-weight="800" ${dly(.5)}>website</text>
    ${[[140, 110, 'Payments', '#22d3ee'], [500, 110, 'Shipping', '#a78bfa'], [140, 300, 'CRM', '#00e5a0'], [500, 300, 'Cloud services', '#fbbf24']].map(([x, y, n, c], i) => `<g class="po" ${dly(.6 + i * .2)}><rect x="${x - 70}" y="${y - 28}" width="140" height="56" rx="16" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="17" font-weight="700">${n}</text></g>`).join('')}`)
});
