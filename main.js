document.addEventListener('DOMContentLoaded', () => {

  // --- AUTH MODAL ---
  const auth = {
    loginBtn: document.getElementById('login-btn'),
    signupBtn: document.getElementById('signup-btn'),
    modal: document.getElementById('auth-modal'),
    title: document.getElementById('modal-title'),
    form: document.getElementById('auth-form'),
    email: document.getElementById('auth-email'),
    password: document.getElementById('auth-password'),
    submit: document.getElementById('auth-submit'),
    switchBtn: document.getElementById('auth-switch'),
    message: document.getElementById('auth-message'),
    close: document.getElementById('modal-close'),
    bar: document.querySelector('.auth-bar')
  };

  let authMode = 'login';

  function showAuthModal(mode) {
    authMode = mode;
    if (!auth.modal) return;
    auth.modal.setAttribute('aria-hidden', 'false');
    auth.title.textContent = mode === 'login' ? 'Login' : 'Sign Up';
    auth.submit.textContent = mode === 'login' ? 'Login' : 'Sign Up';
    if (auth.switchBtn) auth.switchBtn.textContent = mode === 'login' ? 'Switch to Sign Up' : 'Switch to Login';
    if (auth.message) auth.message.textContent = '';
    if (auth.email) auth.email.value = '';
    if (auth.password) auth.password.value = '';
    auth.email && auth.email.focus();
  }

  function hideAuthModal() {
    auth.modal && auth.modal.setAttribute('aria-hidden', 'true');
  }

  function usersLoad() {
    try { return JSON.parse(localStorage.getItem('ts_users') || '{}'); }
    catch { return {}; }
  }

  function usersSave(u) {
    localStorage.setItem('ts_users', JSON.stringify(u));
  }

  function setSession(email) {
    localStorage.setItem('ts_session', email);
    if (auth.bar) auth.bar.innerHTML = `<span class="auth-welcome">${email}</span> <a href="#" id="logout-btn">Logout</a>`;
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn && logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('ts_session');
      location.reload();
    });
  }

  const session = localStorage.getItem('ts_session');
  if (session) setSession(session);

  auth.loginBtn && auth.loginBtn.addEventListener('click', e => { e.preventDefault(); showAuthModal('login'); });
  auth.signupBtn && auth.signupBtn.addEventListener('click', e => { e.preventDefault(); showAuthModal('signup'); });
  auth.close && auth.close.addEventListener('click', hideAuthModal);
  auth.modal && auth.modal.addEventListener('click', e => { if (e.target === auth.modal) hideAuthModal(); });
  auth.switchBtn && auth.switchBtn.addEventListener('click', () => showAuthModal(authMode === 'login' ? 'signup' : 'login'));

  auth.form && auth.form.addEventListener('submit', e => {
    e.preventDefault();
    const email = (auth.email.value || '').trim().toLowerCase();
    const pass = auth.password.value || '';
    if (!email || pass.length < 6) { auth.message.textContent = 'Enter a valid email (min 6 chars).'; return; }
    const users = usersLoad();
    if (authMode === 'signup') {
      if (users[email]) { auth.message.textContent = 'Account exists.'; return; }
      users[email] = { password: pass };
      usersSave(users);
      setSession(email);
      hideAuthModal();
      return;
    }
    if (!users[email] || users[email].password !== pass) { auth.message.textContent = 'Invalid email or password.'; return; }
    setSession(email);
    hideAuthModal();
  });

   // --- ARTICLES ---
const articlesByCategory = {
  'Software': [
    {
      title: 'Top 10 Programming Tools',
      excerpt: 'Discover the most essential tools for developers in 2025.',
      full: 'In 2025, software development is evolving faster than ever. Tools like Visual Studio Code, GitHub Copilot, and Docker help developers code smarter and deploy quicker. From collaboration to automation, these tools make projects smoother and more efficient. Whether you’re a beginner or pro, mastering these will level up your workflow.',
      thumb: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    }
  ],

  'AI Tools': [
    {
      title: 'AI Writing Assistants Revolutionize Work',
      excerpt: 'AI is changing how we write, plan, and create.',
      full: 'AI writing assistants like ChatGPT, Jasper, and Copy.ai are changing how creators work. They help write articles, code, and marketing content in seconds. Instead of replacing creativity, these tools enhance it—saving time and unlocking new ideas for writers and developers alike.',
      thumb: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg'
    }
  ],

  'Cybersecurity': [
    {
      title: 'The Latest Cyber Threats of 2025',
      excerpt: 'Learn about the new wave of digital risks.',
      full: 'Cybersecurity in 2025 is more critical than ever. With AI-driven phishing scams and advanced ransomware attacks, even strong systems can be at risk. The key is constant awareness, secure passwords, and updated defenses to keep your data safe in a connected world.',
      thumb: 'https://images.pexels.com/photos/5380614/pexels-photo-5380614.jpeg'
    }
  ],

  'Mobile Tech': [
    {
      title: '2025 Smartphone Innovations',
      excerpt: 'What’s new in the world of mobile technology?',
      full: 'Smartphones in 2025 are more than just devices—they’re digital companions. With AI-integrated cameras, foldable displays, and faster chips, mobile tech is pushing boundaries. Brands are focusing on performance, battery life, and personalization to make everyday use smarter and seamless.',
      thumb: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
    }
  ],

  'Hardware': [
    {
      title: 'Next-Gen Hardware for Gamers',
      excerpt: 'Explore the best GPUs and CPUs of 2025.',
      full: 'The hardware world in 2025 is all about power and efficiency. New processors deliver lightning-fast performance with lower energy use, while GPUs redefine gaming and AI computing. Whether in PCs, consoles, or smart devices, the new generation of hardware is built to handle anything you throw at it.',
      thumb: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg'
    }
  ],

  'Tech News': [
    {
      title: 'Tech Giants Announce New AI Partnerships',
      excerpt: 'Big names in tech team up for the AI future.',
      full: 'From AI breakthroughs to space-based internet, 2025 is a massive year for innovation. Major tech companies are racing to launch smarter devices, faster networks, and more sustainable solutions. The future is unfolding fast—and staying updated means staying ahead.',
      thumb: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    }
  ],

  'Programming': [
    {
      title: 'Mastering JavaScript in 2025',
      excerpt: 'The most in-demand language keeps evolving.',
      full: 'JavaScript continues to dominate web development in 2025. With new frameworks, libraries, and features, developers can build faster, more interactive apps than ever. Keeping up with modern JS trends is key to staying competitive and creating high-quality projects.',
      thumb: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'
    }
  ],

  'Gadgets': [
    {
      title: 'Top 5 Smart Gadgets of the Year',
      excerpt: 'Innovative devices that make life easier.',
      full: 'From AI-powered home assistants to smartwatches with advanced health tracking, 2025 gadgets are all about convenience and connectivity. These devices simplify daily tasks, enhance productivity, and bring cutting-edge tech right into your hands.',
      thumb: 'https://images.pexels.com/photos/5077040/pexels-photo-5077040.jpeg'
    }
  ],

  'AI Research': [
    {
      title: 'Breakthroughs in AI Research',
      excerpt: 'New AI models push the limits of creativity.',
      full: 'Researchers in 2025 are developing AI that can generate text, images, and code with unprecedented accuracy. These breakthroughs are shaping industries, from healthcare to entertainment, and unlocking new possibilities for innovation and problem-solving.',
      thumb: 'https://images.pexels.com/photos/1181245/pexels-photo-1181245.jpeg'
    }
  ],

  'Startups': [
    {
      title: 'Top Startups Disrupting the Tech World',
      excerpt: 'Fresh ideas are reshaping the digital landscape.',
      full: 'Innovative startups in 2025 are changing how we live and work. From AI-driven apps to sustainable tech solutions, these companies are pushing boundaries and inspiring the next generation of entrepreneurs with bold ideas and smart technology.',
      thumb: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    }
  ]
};

  function sampleArticles(cat) { return articlesByCategory[cat] || []; }

  const categories = Array.from(document.querySelectorAll('.category'));

  function buildArticlesList(catEl) {
    const list = document.createElement('div');
    list.className = 'articles-list generated';
    const catTitle = catEl.querySelector('h3')?.textContent.trim() || 'Articles';

    // helper to create image with retry + fallback
    function makeImg(src, alt, cls) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || '';
      if (cls) img.className = cls;
      img.loading = 'lazy';
      img.decoding = 'async';

      let triedCacheBust = false;
      const svgFallback = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#999" font-size="20" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">No image</text></svg>')}`;

      img.addEventListener('error', () => {
        if (!triedCacheBust) {
          triedCacheBust = true;
          img.src = src + (src.includes('?') ? '&' : '?') + 'cb=' + Date.now();
          return;
        }
        // final fallback
        img.src = svgFallback;
        img.alt = 'no image available';
      });

      return img;
    }

    sampleArticles(catTitle).forEach(a => {
      const item = document.createElement('div');
      item.className = 'article-item';
      item.dataset.fulltext = a.full || '';
      item.dataset.title = a.title || '';

      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'article-thumb-wrap';
      const thumb = makeImg(a.thumb || '', `${a.title} thumbnail`, 'article-thumb');
      thumbWrap.appendChild(thumb);

      const text = document.createElement('div');
      text.className = 'article-text';
      const h4 = document.createElement('h4');
      h4.className = 'article-title';
      h4.textContent = a.title || '';
      const p = document.createElement('p');
      p.className = 'article-excerpt';
      p.textContent = a.excerpt || '';

      text.appendChild(h4);
      text.appendChild(p);

      list.appendChild(item);
      item.appendChild(thumbWrap);
      item.appendChild(text);
    });

    // delegate clicks on the list to open reader
    list.addEventListener('click', ev => {
      const item = ev.target.closest('.article-item');
      if (!item) return;
      ev.stopPropagation();
      const thumbEl = item.querySelector('.article-thumb');
      const thumbSrc = thumbEl ? thumbEl.src : '';
      const fullText = item.dataset.fulltext || '';
      const title = item.dataset.title || item.querySelector('.article-title')?.textContent || '';

      readerContent.innerHTML = `
          <img class="reader-thumb" src="${thumbSrc}" alt="${title}">
          <h2>${title}</h2>
          <p>${fullText}</p>
        `;
      readerPanel.classList.add('open');
    });

    return list;
  }

  function toggleArticles(catEl) {
    categories.forEach(c => {
      if (c !== catEl) {
        const l = c.querySelector('.articles-list');
        if (l) {
          l.classList.remove('visible');
          if (l.classList.contains('generated')) setTimeout(() => { if (!l.classList.contains('visible')) l.remove(); }, 350);
        }
      }
    });

    let list = catEl.querySelector('.articles-list');
    if (list) {
      const wasVisible = list.classList.contains('visible');
      if (wasVisible) {
        list.classList.remove('visible');
        if (list.classList.contains('generated')) setTimeout(() => { if (!list.classList.contains('visible')) list.remove(); }, 350);
      } else {
        list.classList.add('visible');
      }
      return;
    }
    list = buildArticlesList(catEl);
    catEl.appendChild(list);
    requestAnimationFrame(() => list.classList.add('visible'));
  }

  categories.forEach(cat => {
    cat.style.cursor = 'pointer';
    cat.addEventListener('click', e => {
      e.stopPropagation();
      toggleArticles(cat);
    });
  });

  // --- ARTICLE READER PANEL ---
  const readerPanel = document.createElement('div');
  readerPanel.className = 'reader-panel';
  readerPanel.innerHTML = `
    <button class="reader-close">&times;</button>
    <div class="reader-content"></div>
  `;
  document.body.appendChild(readerPanel);
  const readerContent = readerPanel.querySelector('.reader-content');
  const readerClose = readerPanel.querySelector('.reader-close');

  function closeReader() {
    readerPanel.classList.remove('open');
  }
  readerClose.addEventListener('click', closeReader);
  readerPanel.addEventListener('click', e => { if (e.target === readerPanel) closeReader(); });

});