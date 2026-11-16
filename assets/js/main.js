/**
 * SWIFTLETHUB — Interactive behaviors
 * Pure vanilla JavaScript, zero runtime dependencies.
 */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Toast Notification ---------- */
  const toastEl = $('.toast');
  let toastTimer = null;
  const showToast = (message) => {
    if (!toastEl) return;
    const span = $('span', toastEl);
    if (span) span.textContent = message;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-shown'), 3500);
  };

  /* ---------- Header & Back to Top ---------- */
  const header = $('#site-header');
  const toTop = $('.to-top');

  const handleScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
    }
    if (toTop) {
      toTop.classList.toggle('is-shown', y > 500);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile Navigation ---------- */
  const navToggle = $('.nav__toggle');
  const mobileMenu = $('#mobile-menu');

  const setMobileMenu = (open) => {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('is-locked', open);
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenu(!isOpen);
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMobileMenu(false);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navToggle?.getAttribute('aria-expanded') === 'true') {
      setMobileMenu(false);
    }
  });

  /* ---------- Scroll Reveal (Intersection Observer) ---------- */
  const revealElements = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Article Reading Progress Bar & TOC Spy ---------- */
  const progressBar = $('.reading-progress span');
  const articleEl = $('.article');
  const tocLinks = $$('.toc__list a[data-toc]');

  if (articleEl && progressBar) {
    window.addEventListener('scroll', () => {
      const rect = articleEl.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (-rect.top / total) * 100));
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  if (tocLinks.length && 'IntersectionObserver' in window) {
    const headings = tocLinks.map(link => {
      const id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    }).filter(Boolean);

    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', active);
          });
        }
      });
    }, { rootMargin: '-10% 0px -65% 0px' });

    headings.forEach(h => tocObserver.observe(h));
  }

  /* ---------- Share & Copy Link ---------- */
  $$('[data-copy-link]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('คัดลอกลิงก์บทความเรียบร้อยแล้ว');
        });
      } else {
        showToast('คัดลอกลิงก์บทความเรียบร้อยแล้ว');
      }
    });
  });

  /* ---------- Dialogs (Modals) ---------- */
  const openModal = (id) => {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.classList.add('is-locked');
  };

  const closeModal = (dialog) => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    if (!$$('dialog[open]').length) {
      document.body.classList.remove('is-locked');
    }
  };

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-dialog]');
    if (opener) {
      e.preventDefault();
      const targetId = opener.dataset.dialog;
      // Pre-fill listing label if on trade page
      if (targetId === 'contact-seller' && opener.dataset.listing) {
        const label = $('[data-listing-label]', document.getElementById('contact-seller'));
        if (label) label.textContent = `รายการ: ${opener.dataset.listing}`;
      }
      openModal(targetId);
    }

    if (e.target.closest('[data-close]')) {
      const dialog = e.target.closest('dialog');
      closeModal(dialog);
    }
  });

  // Close when clicking outside modal panel
  $$('dialog.modal').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeModal(dialog);
    });
  });

  /* ---------- Articles Library: Filtering, Search, Pagination ---------- */
  const grid = $('[data-grid]');
  if (grid) {
    const allCards = $$('[data-article]', grid);
    const searchInput = $('[data-search-input]');
    const searchForm = $('[data-search-form]');
    const sortSelect = $('[data-sort]');
    const filterTabs = $$('[data-filter]');
    const statusEl = $('[data-status]');
    const emptyState = $('[data-empty]');
    const paginationEl = $('[data-pagination]');
    const resetBtn = $('[data-reset]');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'latest';
    let currentPage = 1;
    const PER_PAGE = 6;

    const parseParams = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat');
      const q = params.get('q');
      if (cat) currentFilter = cat;
      if (q) {
        currentSearch = q.trim();
        if (searchInput) searchInput.value = currentSearch;
      }
    };

    const applyState = () => {
      // 1. Filter
      let visibleCards = allCards.filter(card => {
        const matchCat = currentFilter === 'all' || card.dataset.cat === currentFilter;
        const searchPool = (card.dataset.search || '').toLowerCase();
        const matchSearch = !currentSearch || searchPool.includes(currentSearch.toLowerCase());
        return matchCat && matchSearch;
      });

      // 2. Sort
      visibleCards.sort((a, b) => {
        if (currentSort === 'popular') {
          return (Number(b.dataset.pop) || 0) - (Number(a.dataset.pop) || 0);
        } else if (currentSort === 'short') {
          // readMin is in the title/meta or data
          return (a.textContent.length) - (b.textContent.length);
        }
        return (b.dataset.date || '').localeCompare(a.dataset.date || '');
      });

      // 3. Pagination
      const total = visibleCards.length;
      const totalPages = Math.ceil(total / PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;

      const start = (currentPage - 1) * PER_PAGE;
      const pagedCards = visibleCards.slice(start, start + PER_PAGE);

      // Hide all first
      allCards.forEach(c => (c.style.display = 'none'));

      // Show paged and re-order in DOM
      pagedCards.forEach(c => {
        c.style.display = '';
        grid.appendChild(c);
      });

      // Empty State & Status
      if (emptyState) emptyState.hidden = total > 0;
      if (statusEl) {
        statusEl.textContent = total > 0 
          ? `แสดง ${start + 1}–${Math.min(start + PER_PAGE, total)} จากทั้งหมด ${total} บทความ`
          : 'ไม่พบบทความ';
      }

      // Render Pagination
      if (paginationEl) {
        if (totalPages <= 1) {
          paginationEl.innerHTML = '';
        } else {
          let pagesHtml = '';
          for (let p = 1; p <= totalPages; p++) {
            pagesHtml += `<button class="page-btn" type="button" data-page="${p}" ${p === currentPage ? 'aria-current="page"' : ''}>${p}</button>`;
          }
          paginationEl.innerHTML = pagesHtml;
        }
      }

      // Update Tabs active state
      filterTabs.forEach(t => {
        t.setAttribute('aria-selected', String(t.dataset.filter === currentFilter));
      });
    };

    // Events
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        currentFilter = tab.dataset.filter;
        currentPage = 1;
        applyState();
      });
    });

    document.addEventListener('click', (e) => {
      const jump = e.target.closest('[data-filter-jump]');
      if (jump) {
        currentFilter = jump.dataset.filterJump;
        currentPage = 1;
        applyState();
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
      }

      const tagBtn = e.target.closest('[data-tag]');
      if (tagBtn) {
        currentSearch = tagBtn.dataset.tag;
        if (searchInput) searchInput.value = currentSearch;
        currentPage = 1;
        applyState();
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
      }

      const pBtn = e.target.closest('[data-page]');
      if (pBtn) {
        currentPage = Number(pBtn.dataset.page) || 1;
        applyState();
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentSearch = searchInput ? searchInput.value.trim() : '';
        currentPage = 1;
        applyState();
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.trim();
        currentPage = 1;
        applyState();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        currentPage = 1;
        applyState();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentFilter = 'all';
        currentSearch = '';
        if (searchInput) searchInput.value = '';
        currentPage = 1;
        applyState();
      });
    }

    parseParams();
    applyState();
  }

  /* ---------- Auth Page (Login / Register / Forgot) ---------- */
  const authBox = $('.auth__box');
  if (authBox) {
    const views = $$('.auth__view', authBox);
    const switchView = (targetView) => {
      views.forEach(v => {
        v.hidden = v.dataset.view !== targetView;
      });
      const firstInput = $(`.auth__view[data-view="${targetView}"] input`);
      firstInput?.focus();
    };

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['login', 'register', 'forgot'].includes(initialHash)) {
      switchView(initialHash);
    }

    document.addEventListener('click', (e) => {
      const switcher = e.target.closest('[data-show-view]');
      if (switcher) {
        e.preventDefault();
        switchView(switcher.dataset.showView);
      }
    });
  }

  // Password Visibility Toggle
  $$('[data-toggle-pw]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isPw = input.type === 'password';
      input.type = isPw ? 'text' : 'password';
      btn.setAttribute('aria-label', isPw ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
      const iconUse = $('use', btn);
      if (iconUse) {
        iconUse.setAttribute('href', isPw ? '#i-eye-off' : '#i-eye');
      }
    });
  });

  /* ---------- Buy / Consign Page (Trade) ---------- */
  const tabLinks = $$('.hero-tab[data-tab]');
  const panels = $$('.trade-panel');

  const switchTradeTab = (tabId) => {
    tabLinks.forEach(t => t.setAttribute('aria-selected', String(t.dataset.tab === tabId)));
    panels.forEach(p => {
      p.hidden = p.dataset.panel !== tabId;
    });
  };

  if (tabLinks.length) {
    tabLinks.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = t.dataset.tab;
        switchTradeTab(tab);
        history.replaceState(null, '', `#${tab}`);
        document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Check initial hash
    if (window.location.hash === '#consign') {
      switchTradeTab('consign');
    } else {
      switchTradeTab('buy');
    }
  }

  // Listing filter on Buy section
  const listingFilters = $$('[data-listing-filter]');
  const listings = $$('.listing');
  listingFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.listingFilter;
      listingFilters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      listings.forEach(card => {
        card.hidden = !(filter === 'all' || card.dataset.type === filter);
      });
    });
  });

  // Product category filter on Products page
  const productFilters = $$('[data-product-filter]');
  const productCards = $$('.p-card[data-cat]');
  if (productFilters.length && productCards.length) {
    const applyProductFilter = (filter) => {
      productFilters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.productFilter === filter)));
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.hidden = !match;
      });
    };

    productFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        applyProductFilter(btn.dataset.productFilter);
      });
    });

    // Support URL hash filter e.g. #supplement
    const hash = window.location.hash.replace('#', '');
    if (hash && ['supplement', 'natural', 'gift'].includes(hash)) {
      applyProductFilter(hash);
    }
  }

  // Consignment Image Upload Preview & Removal
  const uploadInput = $('input[data-upload]');
  const previewList = $('[data-preview]');
  const clearUploadBtn = $('[data-clear-upload]');
  if (uploadInput && previewList) {
    let currentFiles = [];

    const syncFilesToInput = () => {
      try {
        const dt = new DataTransfer();
        currentFiles.forEach(file => dt.items.add(file));
        uploadInput.files = dt.files;
      } catch (err) {
        // Fallback for environments where DataTransfer is restricted
      }
      if (currentFiles.length === 0) {
        uploadInput.value = '';
      }
    };

    const renderPreviews = () => {
      previewList.innerHTML = '';
      if (clearUploadBtn) {
        clearUploadBtn.hidden = currentFiles.length === 0;
      }
      if (currentFiles.length === 0) return;

      currentFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.className = 'upload__item';

        const img = document.createElement('img');
        img.alt = `รูปรังนกที่เลือก รูปที่ ${index + 1}`;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'upload__remove';
        removeBtn.dataset.removeIndex = index;
        removeBtn.setAttribute('aria-label', `ลบรูปภาพที่ ${index + 1}`);
        removeBtn.title = 'ลบรูปนี้';
        removeBtn.innerHTML = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-x"/></svg>';

        li.appendChild(img);
        li.appendChild(removeBtn);
        previewList.appendChild(li);

        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    };

    uploadInput.addEventListener('change', () => {
      const selected = Array.from(uploadInput.files || []).filter(f => f.type.startsWith('image/'));
      if (selected.length === 0) return;
      const remainingSlots = 6 - currentFiles.length;
      if (remainingSlots > 0) {
        currentFiles = currentFiles.concat(selected.slice(0, remainingSlots));
      } else {
        currentFiles = selected.slice(0, 6);
      }
      syncFilesToInput();
      renderPreviews();
    });

    previewList.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove-index]');
      if (!removeBtn) return;
      e.preventDefault();
      e.stopPropagation();
      const idx = parseInt(removeBtn.dataset.removeIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx < currentFiles.length) {
        currentFiles.splice(idx, 1);
        syncFilesToInput();
        renderPreviews();
      }
    });

    if (clearUploadBtn) {
      clearUploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentFiles = [];
        syncFilesToInput();
        renderPreviews();
      });
    }

    const consignForm = uploadInput.closest('form');
    if (consignForm) {
      consignForm.addEventListener('reset', () => {
        currentFiles = [];
        setTimeout(() => {
          syncFilesToInput();
          renderPreviews();
        }, 0);
      });
    }
  }

  /* ---------- Form Validation & Demo Submission ---------- */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validateInput = (input) => {
    const field = input.closest('.field');
    if (!field) return true;
    const errorEl = $('.field__error', field);
    const val = input.value.trim();
    let msg = '';

    if (input.required && !val) {
      msg = 'กรุณากรอกข้อมูลในช่องนี้';
    } else if (input.type === 'email' && val && !emailRegex.test(val)) {
      msg = 'รูปแบบอีเมลไม่ถูกต้อง';
    } else if (input.minLength > 0 && val && val.length < input.minLength) {
      msg = `ต้องมีความยาวอย่างน้อย ${input.minLength} ตัวอักษร`;
    }

    field.classList.toggle('is-invalid', !!msg);
    if (errorEl) errorEl.textContent = msg;
    return !msg;
  };

  $$('form').forEach(form => {
    // Realtime validation clear
    form.addEventListener('input', (e) => {
      if (e.target.closest('.field.is-invalid')) {
        validateInput(e.target);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = $$('input:not([type=checkbox]), textarea, select', form);
      const results = inputs.map(validateInput);
      const checkboxes = $$('input[type=checkbox][required]', form);
      const checksOk = checkboxes.every(cb => cb.checked);

      checkboxes.forEach(cb => {
        const label = cb.closest('label');
        if (label) label.style.color = cb.checked ? '' : 'var(--primary-red)';
      });

      const allValid = results.every(Boolean) && checksOk;
      if (!allValid) {
        const firstBad = inputs[results.indexOf(false)] || checkboxes.find(c => !c.checked);
        firstBad?.focus();
        return;
      }

      // Handle demo submission
      const formType = form.dataset.form;
      const successBox = $('.form-success', form);

      if (successBox) {
        successBox.hidden = false;
        form.reset();
        setTimeout(() => (successBox.hidden = true), 7000);
      }

      if (formType === 'login') {
        showToast('เข้าสู่ระบบสำเร็จ (ตัวอย่าง)');
        form.reset();
      } else if (formType === 'register') {
        showToast('สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่ SWIFTLETHUB');
        form.reset();
      } else if (formType === 'forgot') {
        showToast('ส่งลิงก์ตั้งรหัสผ่านใหม่ไปยังอีเมลแล้ว');
        form.reset();
      } else if (formType === 'seller') {
        const dialog = form.closest('dialog');
        closeModal(dialog);
        showToast('ส่งข้อความถึงผู้ขายเรียบร้อยแล้ว');
        form.reset();
      } else if (formType === 'consign') {
        showToast('ได้รับข้อมูลฝากขายรังนกเรียบร้อยแล้ว');
        if (previewList) previewList.innerHTML = '';
      }
    });
  });

})();
