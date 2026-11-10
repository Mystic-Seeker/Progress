// Weekly Progress Tracker - Mobile Edition with Sound, Streaks & 1-Hour Event Reminders
// Rich Brown Contrast Theme with Web Audio Chime, Time Filters & Specific Day View

(function () {
  'use strict';

  // --- Storage Key ---
  const STORAGE_KEY = 'weekly_progress_tracker_mobile_v8';

  // --- Multi-Year Indian Festivals & National Holidays Database ---
  const INDIAN_FESTIVALS = {
    // 2024
    '2024-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2024-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal / Lohri', emoji: '🪁' },
    '2024-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2024-03-08': { name: 'Shivratri', fullName: 'Maha Shivratri', emoji: '🔱' },
    '2024-03-24': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2024-03-25': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2024-04-11': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr', emoji: '🌙' },
    '2024-04-14': { name: 'Ambedkar J.', fullName: 'Baisakhi / Ambedkar Jayanti', emoji: '🌾' },
    '2024-04-17': { name: 'Ram Navami', fullName: 'Rama Navami', emoji: '🏹' },
    '2024-06-17': { name: 'Bakrid', fullName: 'Eid al-Adha (Bakrid)', emoji: '🌙' },
    '2024-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2024-08-19': { name: 'Rakhi', fullName: 'Raksha Bandhan', emoji: '🧵' },
    '2024-08-26': { name: 'Janmashtami', fullName: 'Krishna Janmashtami', emoji: '🦚' },
    '2024-09-07': { name: 'Ganesh Ch.', fullName: 'Ganesh Chaturthi', emoji: '🐘' },
    '2024-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2024-10-12': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2024-10-20': { name: 'Karwa Chauth', fullName: 'Karwa Chauth', emoji: '🌕' },
    '2024-10-29': { name: 'Dhanteras', fullName: 'Dhanteras', emoji: '🪙' },
    '2024-10-31': { name: 'Diwali', fullName: 'Diwali (Deepavali)', emoji: '🪔' },
    '2024-11-02': { name: 'Bhai Dooj', fullName: 'Bhai Dooj', emoji: '👫' },
    '2024-11-07': { name: 'Chhath Puja', fullName: 'Chhath Puja', emoji: '🌅' },
    '2024-11-15': { name: 'Gurpurab', fullName: 'Guru Nanak Jayanti', emoji: 'ੴ' },
    '2024-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2025
    '2025-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2025-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal', emoji: '🪁' },
    '2025-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2025-02-26': { name: 'Shivratri', fullName: 'Maha Shivratri', emoji: '🔱' },
    '2025-03-13': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2025-03-14': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2025-03-31': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr (Ramzan Eid)', emoji: '🌙' },
    '2025-04-06': { name: 'Ram Navami', fullName: 'Rama Navami', emoji: '🏹' },
    '2025-04-14': { name: 'Ambedkar J.', fullName: 'Baisakhi / Ambedkar Jayanti', emoji: '🌾' },
    '2025-06-07': { name: 'Bakrid', fullName: 'Eid al-Adha (Bakrid)', emoji: '🌙' },
    '2025-08-09': { name: 'Rakhi', fullName: 'Raksha Bandhan', emoji: '🧵' },
    '2025-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2025-08-16': { name: 'Janmashtami', fullName: 'Krishna Janmashtami', emoji: '🦚' },
    '2025-08-27': { name: 'Ganesh Ch.', fullName: 'Ganesh Chaturthi', emoji: '🐘' },
    '2025-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2025-10-02': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2025-10-10': { name: 'Karwa Chauth', fullName: 'Karwa Chauth', emoji: '🌕' },
    '2025-10-18': { name: 'Dhanteras', fullName: 'Dhanteras', emoji: '🪙' },
    '2025-10-19': { name: 'Choti Diwali', fullName: 'Naraka Chaturdashi / Choti Diwali', emoji: '🪔' },
    '2025-10-20': { name: 'Diwali', fullName: 'Diwali (Deepavali / Lakshmi Puja)', emoji: '🪔' },
    '2025-10-22': { name: 'Govardhan', fullName: 'Govardhan Puja', emoji: '🐄' },
    '2025-10-23': { name: 'Bhai Dooj', fullName: 'Bhai Dooj', emoji: '👫' },
    '2025-10-27': { name: 'Chhath Puja', fullName: 'Chhath Puja', emoji: '🌅' },
    '2025-11-05': { name: 'Gurpurab', fullName: 'Guru Nanak Jayanti', emoji: 'ੴ' },
    '2025-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2026
    '2026-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2026-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal / Lohri', emoji: '🪁' },
    '2026-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2026-02-15': { name: 'Shivratri', fullName: 'Maha Shivratri', emoji: '🔱' },
    '2026-03-03': { name: 'Chhoti Holi', fullName: 'Holika Dahan / Chhoti Holi', emoji: '🔥' },
    '2026-03-04': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2026-03-20': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr (Ramzan Eid)', emoji: '🌙' },
    '2026-03-21': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr (Ramzan Eid)', emoji: '🌙' },
    '2026-03-27': { name: 'Ram Navami', fullName: 'Rama Navami', emoji: '🏹' },
    '2026-03-31': { name: 'Mahavir J.', fullName: 'Mahavir Jayanti', emoji: '🕊️' },
    '2026-04-03': { name: 'Good Friday', fullName: 'Good Friday', emoji: '✝️' },
    '2026-04-14': { name: 'Baisakhi', fullName: 'Baisakhi / Ambedkar Jayanti / Tamil New Year', emoji: '🌾' },
    '2026-05-01': { name: 'Buddha P.', fullName: 'Buddha Purnima', emoji: '☸️' },
    '2026-05-27': { name: 'Bakrid', fullName: 'Eid al-Adha (Bakrid)', emoji: '🌙' },
    '2026-06-26': { name: 'Muharram', fullName: 'Muharram', emoji: '🕌' },
    '2026-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2026-08-28': { name: 'Rakhi', fullName: 'Raksha Bandhan', emoji: '🧵' },
    '2026-09-04': { name: 'Janmashtami', fullName: 'Krishna Janmashtami', emoji: '🦚' },
    '2026-09-14': { name: 'Ganesh Ch.', fullName: 'Ganesh Chaturthi / Vinayaka Chavithi', emoji: '🐘' },
    '2026-09-23': { name: 'Anant Ch.', fullName: 'Anant Chaturdashi (Ganesh Visarjan)', emoji: '🙏' },
    '2026-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2026-10-11': { name: 'Navratri', fullName: 'Navratri Begins (Ghatasthapana)', emoji: '🌸' },
    '2026-10-17': { name: 'Durga Puja', fullName: 'Maha Saptami / Durga Puja Begins', emoji: '🌺' },
    '2026-10-19': { name: 'Maha Navami', fullName: 'Maha Navami / Durga Puja', emoji: '⚔️' },
    '2026-10-20': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2026-10-29': { name: 'Karwa Chauth', fullName: 'Karwa Chauth', emoji: '🌕' },
    '2026-11-06': { name: 'Dhanteras', fullName: 'Dhanteras (Dhantrayodashi)', emoji: '🪙' },
    '2026-11-07': { name: 'Choti Diwali', fullName: 'Naraka Chaturdashi / Choti Diwali', emoji: '🪔' },
    '2026-11-08': { name: 'Diwali', fullName: 'Diwali (Deepavali / Lakshmi Puja)', emoji: '🪔' },
    '2026-11-09': { name: 'Govardhan', fullName: 'Govardhan Puja / Annakut', emoji: '🐄' },
    '2026-11-10': { name: 'Bhai Dooj', fullName: 'Bhai Dooj / Bhau Beej', emoji: '👫' },
    '2026-11-15': { name: 'Chhath Puja', fullName: 'Chhath Puja (Surya Shashthi)', emoji: '🌅' },
    '2026-11-24': { name: 'Gurpurab', fullName: 'Guru Nanak Jayanti (Gurpurab)', emoji: 'ੴ' },
    '2026-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2027
    '2027-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2027-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal', emoji: '🪁' },
    '2027-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2027-03-06': { name: 'Shivratri', fullName: 'Maha Shivratri', emoji: '🔱' },
    '2027-03-10': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr (Ramzan Eid)', emoji: '🌙' },
    '2027-03-21': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2027-03-22': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2027-04-14': { name: 'Ambedkar J.', fullName: 'Baisakhi / Ambedkar Jayanti', emoji: '🌾' },
    '2027-04-15': { name: 'Ram Navami', fullName: 'Rama Navami', emoji: '🏹' },
    '2027-05-17': { name: 'Bakrid', fullName: 'Eid al-Adha (Bakrid)', emoji: '🌙' },
    '2027-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2027-08-17': { name: 'Rakhi', fullName: 'Raksha Bandhan', emoji: '🧵' },
    '2027-08-25': { name: 'Janmashtami', fullName: 'Krishna Janmashtami', emoji: '🦚' },
    '2027-09-04': { name: 'Ganesh Ch.', fullName: 'Ganesh Chaturthi', emoji: '🐘' },
    '2027-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2027-10-15': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2027-10-19': { name: 'Karwa Chauth', fullName: 'Karwa Chauth', emoji: '🌕' },
    '2027-10-28': { name: 'Dhanteras', fullName: 'Dhanteras', emoji: '🪙' },
    '2027-10-29': { name: 'Choti Diwali', fullName: 'Choti Diwali', emoji: '🪔' },
    '2027-10-30': { name: 'Diwali', fullName: 'Diwali (Deepavali)', emoji: '🪔' },
    '2027-11-01': { name: 'Bhai Dooj', fullName: 'Bhai Dooj', emoji: '👫' },
    '2027-11-04': { name: 'Chhath Puja', fullName: 'Chhath Puja', emoji: '🌅' },
    '2027-11-14': { name: 'Gurpurab', fullName: 'Guru Nanak Jayanti', emoji: 'ੴ' },
    '2027-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2028
    '2028-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2028-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal', emoji: '🪁' },
    '2028-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2028-02-23': { name: 'Shivratri', fullName: 'Maha Shivratri', emoji: '🔱' },
    '2028-02-27': { name: 'Eid ul-Fitr', fullName: 'Eid al-Fitr (Ramzan Eid)', emoji: '🌙' },
    '2028-03-10': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2028-03-11': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2028-04-04': { name: 'Ram Navami', fullName: 'Rama Navami', emoji: '🏹' },
    '2028-04-14': { name: 'Ambedkar J.', fullName: 'Baisakhi / Ambedkar Jayanti', emoji: '🌾' },
    '2028-05-05': { name: 'Bakrid', fullName: 'Eid al-Adha', emoji: '🌙' },
    '2028-08-05': { name: 'Rakhi', fullName: 'Raksha Bandhan', emoji: '🧵' },
    '2028-08-13': { name: 'Janmashtami', fullName: 'Krishna Janmashtami', emoji: '🦚' },
    '2028-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2028-08-24': { name: 'Ganesh Ch.', fullName: 'Ganesh Chaturthi', emoji: '🐘' },
    '2028-09-28': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2028-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2028-10-15': { name: 'Dhanteras', fullName: 'Dhanteras', emoji: '🪙' },
    '2028-10-17': { name: 'Diwali', fullName: 'Diwali (Deepavali)', emoji: '🪔' },
    '2028-10-19': { name: 'Bhai Dooj', fullName: 'Bhai Dooj', emoji: '👫' },
    '2028-11-02': { name: 'Gurpurab', fullName: 'Guru Nanak Jayanti', emoji: 'ੴ' },
    '2028-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2029
    '2029-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2029-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti', emoji: '🪁' },
    '2029-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2029-02-28': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2029-03-01': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2029-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2029-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2029-10-18': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2029-11-05': { name: 'Diwali', fullName: 'Diwali (Deepavali)', emoji: '🪔' },
    '2029-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' },

    // 2030
    '2030-01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '2030-01-14': { name: 'Sankranti', fullName: 'Makar Sankranti', emoji: '🪁' },
    '2030-01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '2030-03-19': { name: 'Chhoti Holi', fullName: 'Holika Dahan', emoji: '🔥' },
    '2030-03-20': { name: 'Holi', fullName: 'Holi - Festival of Colors', emoji: '🎨' },
    '2030-08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '2030-10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '2030-10-06': { name: 'Dussehra', fullName: 'Dussehra (Vijayadashami)', emoji: '🏹' },
    '2030-10-25': { name: 'Diwali', fullName: 'Diwali (Deepavali)', emoji: '🪔' },
    '2030-12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' }
  };

  // Annual Fixed Holidays for EVERY year (Past, Present & Future)
  const ANNUAL_FIXED = {
    '01-01': { name: 'New Year', fullName: "New Year's Day", emoji: '🎉' },
    '01-14': { name: 'Sankranti', fullName: 'Makar Sankranti / Pongal / Magh Bihu', emoji: '🪁' },
    '01-26': { name: 'Republic Day', fullName: 'Republic Day of India', emoji: '🇮🇳' },
    '04-14': { name: 'Ambedkar J.', fullName: 'Dr. B.R. Ambedkar Jayanti / Baisakhi', emoji: '🌾' },
    '08-15': { name: 'Indep. Day', fullName: 'Independence Day of India', emoji: '🇮🇳' },
    '10-02': { name: 'Gandhi J.', fullName: 'Mahatma Gandhi Jayanti', emoji: '🕊️' },
    '12-25': { name: 'Christmas', fullName: 'Christmas Day', emoji: '🎄' }
  };

  function getIndianFestival(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    const fullKey = `${y}-${m}-${d}`;
    const mmddKey = `${m}-${d}`;

    // 1. Check exact year-specific festival date
    if (INDIAN_FESTIVALS[fullKey]) {
      return INDIAN_FESTIVALS[fullKey];
    }
    // 2. Check universal fixed national festival date
    if (ANNUAL_FIXED[mmddKey]) {
      return ANNUAL_FIXED[mmddKey];
    }
    return null;
  }

  // --- Curated Daily Mindset Quotes ---
  const QUOTES = [
    { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear, Atomic Habits" },
    { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
    { text: "Small habits don't add up, they compound.", author: "James Clear" },
    { text: "Never miss twice. If you miss one day, try to get back on track as quickly as possible.", author: "James Clear" },
    { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
    { text: "First make your habits, then your habits make you.", author: "John Dryden" },
    { text: "Consistency is more important than intensity.", author: "Bruce Lee" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don’t break the chain. Build momentum every single day.", author: "Jerry Seinfeld" }
  ];

  // --- State ---
  let currentDate = new Date(); // Active viewing week
  let miniCalViewDate = new Date(); // Active month viewed in mini calendar
  let activeFilter = 'all';     // 'all', 'Morning', 'Afternoon', 'Evening'
  let currentQuoteIndex = 0;
  let activeDayIndex = 0;       // 0 = Monday ... 6 = Sunday for the Day View
  let dismissedReminderIds = new Set();
  let currentActiveBannerEventId = null;
  try {
    const savedDismissed = localStorage.getItem('progress_dismissed_reminders');
    if (savedDismissed) {
      dismissedReminderIds = new Set(JSON.parse(savedDismissed));
    }
  } catch (e) {}

  let trackerData = {
    soundEnabled: true,
    notificationsEnabled: false,
    goals: [],
    logs: {},      // { 'YYYY-MM-DD': { goalId: [0, 1, 0, 1, 0, 0, 0] } }
    notes: {},     // { 'YYYY-MM-DD': "Weekly focus note..." }
    dayEvents: {}  // { 'YYYY-MM-DD': [ { id: 'evt_1', title: 'Doctor', time: '16:30', alertOneHour: true, notified: false, completed: false } ] }
  };

  let dailyChartInstance = null;

  // Rich Brown Palette
  const BROWN_PALETTE = {
    espresso: '#3D2A1C',
    mocha: '#5A3A24',
    caramel: '#8C5338',
    sage: '#4A6B53',
    terracotta: '#A64B2A',
    walnut: '#2D1E18'
  };

  const CATEGORY_ICONS = {
    Habit: 'fa-seedling',
    Health: 'fa-dumbbell',
    Study: 'fa-book-open',
    Work: 'fa-briefcase',
    Personal: 'fa-heart',
    Creative: 'fa-palette'
  };

  // --- Audio Feedback (Web Audio API) ---
  function playTickSound(isCheck = true) {
    if (!trackerData.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (isCheck) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {}
  }

  function playAlertChime() {
    if (!trackerData.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      // Double gentle attention chime (E5 -> B5)
      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.setValueAtTime(987.77, now + 0.15); // B5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      gain.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.45);
    } catch (e) {}
  }

  // --- Notification System ---
  function requestNotificationPermission(showFeedback = false) {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        trackerData.notificationsEnabled = true;
        saveData();
        updateNotificationUI();
        sendSystemNotification('🔔 Reminders Active!', 'Progress will alert you 1 hour before scheduled events.');
        if (showFeedback) {
          alert('✅ Notification sent! Check your phone notification shade or status bar.');
        }
      } else {
        trackerData.notificationsEnabled = false;
        saveData();
        updateNotificationUI();
        alert('⚠️ Notification permission was blocked. To fix: Open phone Settings ➔ Apps ➔ Chrome ➔ Notifications and turn them ON.');
      }
    });
  }

  function sendSystemNotification(title, body) {
    if (!('Notification' in window)) return Promise.resolve(false);
    if (Notification.permission !== 'granted') return Promise.resolve(false);

    const options = {
      body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: [250, 100, 250, 100, 300],
      tag: 'event-reminder-' + Date.now(),
      renotify: true,
      requireInteraction: true
    };

    if ('serviceWorker' in navigator) {
      return navigator.serviceWorker.ready.then((reg) => {
        return reg.showNotification(title, options).then(() => true);
      }).catch(err => {
        console.warn('SW showNotification error:', err);
        try {
          new Notification(title, options);
          return true;
        } catch (e) {
          return false;
        }
      });
    } else {
      try {
        new Notification(title, options);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.resolve(false);
      }
    }
  }

  function updateNotificationUI() {
    const bellIcon = document.getElementById('notifyBellIcon');
    const modalBtn = document.getElementById('modalNotifyBtn');
    const isGranted = ('Notification' in window) && Notification.permission === 'granted';

    if (isGranted) {
      bellIcon.className = 'fa-solid fa-bell text-xs text-amber-600';
      if (modalBtn) {
        modalBtn.textContent = 'Enabled ✓';
        modalBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-cream-50 touch-btn';
      }
    } else {
      bellIcon.className = 'fa-regular fa-bell text-xs text-coffee-600';
      if (modalBtn) {
        modalBtn.textContent = 'Enable Alerts';
        modalBtn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-coffee-800 text-cream-50 touch-btn';
      }
    }
  }

  // --- Background reminder support (shared IndexedDB so the service worker can read events) ---
  function openReminderDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('progress-reminders', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('kv');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function idbGet(key) {
    return openReminderDB().then(db => new Promise((resolve) => {
      const r = db.transaction('kv').objectStore('kv').get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(undefined);
    })).catch(() => undefined);
  }

  function idbSet(key, value) {
    return openReminderDB().then(db => new Promise((resolve) => {
      const tx = db.transaction('kv', 'readwrite');
      tx.objectStore('kv').put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    })).catch(() => false);
  }

  // Copy events to the shared store and ask the browser to wake the service worker periodically
  function syncRemindersToWorker() {
    if (!('indexedDB' in window)) return;
    idbSet('events', JSON.parse(JSON.stringify(trackerData.dayEvents || {})));
    idbSet('settings', { soundEnabled: trackerData.soundEnabled });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(async (reg) => {
        try {
          if (reg.periodicSync) {
            await reg.periodicSync.register('check-reminders', { minInterval: 15 * 60 * 1000 });
          }
        } catch (e) {}
        if (reg.active) reg.active.postMessage({ type: 'check-reminders' });
      }).catch(() => {});
    }
  }

  // Mark events the service worker already notified about so they are not repeated
  async function applyWorkerNotifiedFlags() {
    const ids = await idbGet('notified');
    if (!Array.isArray(ids) || ids.length === 0) return;
    let changed = false;
    Object.values(trackerData.dayEvents || {}).forEach(list => {
      list.forEach(evt => {
        if (ids.includes(evt.id) && !evt.notified) {
          evt.notified = true;
          changed = true;
        }
      });
    });
    if (changed) saveData();
  }

  // --- 1-Hour Reminder Checker Loop ---
  function checkUpcomingEventReminders() {
    const today = new Date();
    const todayKey = getDayDateKey(today);
    const events = trackerData.dayEvents[todayKey] || [];

    const now = new Date();
    let nextUpcomingEvent = null;
    let minTimeDiff = Infinity;

    events.forEach(evt => {
      if (evt.completed || !evt.time) return;

      const [hours, minutes] = evt.time.split(':').map(Number);
      const eventTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0);
      const diffMs = eventTime - now;
      const diffMinutes = Math.floor(diffMs / (60 * 1000));

      // Trigger 1-hour before notification (between 0 and 60 minutes)
      if (diffMinutes <= 60 && diffMinutes >= 0) {
        if (!evt.notified && evt.alertOneHour !== false) {
          if (('Notification' in window) && Notification.permission === 'granted') {
            sendSystemNotification(
              `⏰ 1-Hour Reminder: ${evt.title}`,
              `Event starts in ${diffMinutes} minutes (at ${formatTimeDisplay(evt.time)})!`
            );
            evt.notified = true;
            saveData();
            playAlertChime();
            if (navigator.vibrate) {
              try { navigator.vibrate([200, 100, 200, 100, 300]); } catch (e) {}
            }
          }
        }

        // Track closest upcoming event for in-app banner (only if not dismissed by user)
        if (diffMinutes < minTimeDiff && !dismissedReminderIds.has(evt.id)) {
          minTimeDiff = diffMinutes;
          nextUpcomingEvent = { evt, diffMinutes };
        }
      }
    });

    // In-App Glowing Banner
    const banner = document.getElementById('upcomingReminderBanner');
    const bannerTitle = document.getElementById('upcomingReminderTitle');

    if (nextUpcomingEvent) {
      currentActiveBannerEventId = nextUpcomingEvent.evt.id;
      window.currentActiveBannerEventId = currentActiveBannerEventId;
      bannerTitle.textContent = `${nextUpcomingEvent.evt.title} at ${formatTimeDisplay(nextUpcomingEvent.evt.time)} (in ${nextUpcomingEvent.diffMinutes} mins)`;
      banner.classList.remove('hidden');
    } else {
      currentActiveBannerEventId = null;
      window.currentActiveBannerEventId = null;
      banner.classList.add('hidden');
    }
  }

  // --- 1-Tap Phone Calendar Alarm Sync (Google Calendar + .ICS file) ---
  window.downloadEventCalendar = function (eventId, dateKey) {
    const events = trackerData.dayEvents[dateKey] || [];
    const evt = events.find(e => e.id === eventId);
    if (!evt || !evt.time) return;

    const [year, month, day] = dateKey.split('-').map(Number);
    const [hours, minutes] = evt.time.split(':').map(Number);

    const pad = n => String(n).padStart(2, '0');
    const startStr = `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
    const endMinutes = (minutes + 60) % 60;
    const endHours = hours + Math.floor((minutes + 60) / 60);
    const endStr = `${year}${pad(month)}${pad(day)}T${pad(endHours)}${pad(endMinutes)}00`;

    // 1. Standard .ics file download with 1-Hour alarm trigger (-PT60M)
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hr duration

    function formatICSDate(date) {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Weekly Progress Tracker//EN',
      'BEGIN:VEVENT',
      `UID:${eventId}@weeklytracker.app`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${evt.title}`,
      `DESCRIPTION:Event from Progress Habit Tracker`,
      'BEGIN:VALARM',
      'TRIGGER:-PT60M', // 1 HOUR BEFORE ALARM
      'ACTION:DISPLAY',
      `DESCRIPTION:1 Hour Reminder: ${evt.title}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.title.replace(/\s+/g, '_')}_1h_alarm.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Option to open Google Calendar directly
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent('Progress App Reminder: ' + evt.title)}`;
    if (confirm(`1-Hour Alarm file downloaded for your phone calendar!\n\nTap OK to also open in Google Calendar directly.`)) {
      window.open(gcalUrl, '_blank');
    }
  };

  // --- Date & Time Utilities ---
  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getWeekKey(date) {
    const monday = getMonday(date);
    const y = monday.getFullYear();
    const m = String(monday.getMonth() + 1).padStart(2, '0');
    const d = String(monday.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatShortDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
  }

  function getDateForWeekDay(monday, dayIndex) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + dayIndex);
    return d;
  }

  function getDayDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatTimeDisplay(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function getTodayIndexInCurrentWeek() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const mon = getMonday(currentDate);
    const diffDays = Math.round((today - mon) / (24 * 60 * 60 * 1000));
    if (diffDays >= 0 && diffDays < 7) {
      return diffDays;
    }
    return 0;
  }

  // --- Default Starter Habits & Sample Day Events ---
  function generateDefaultData() {
    const today = new Date();
    const currentWeekKey = getWeekKey(today);
    const thisMonday = getMonday(today);

    const defaultGoals = [
      { id: 'goal_1', name: 'Morning Workout & Stretch', category: 'Health', timeOfDay: 'Morning', color: '#3D2A1C', target: 5 },
      { id: 'goal_2', name: 'Drink 2L Water Daily', category: 'Habit', timeOfDay: 'Morning', color: '#8C5338', target: 7 },
      { id: 'goal_3', name: 'Deep Coding / Work Session', category: 'Work', timeOfDay: 'Afternoon', color: '#2D1E18', target: 5 },
      { id: 'goal_4', name: 'Read 20 mins of Book', category: 'Study', timeOfDay: 'Evening', color: '#5A3A24', target: 5 },
      { id: 'goal_5', name: 'Evening Walk / Screen Break', category: 'Personal', timeOfDay: 'Evening', color: '#4A6B53', target: 4 }
    ];

    const logs = {};
    logs[currentWeekKey] = {
      'goal_1': [1, 1, 1, 1, 0, 0, 0],
      'goal_2': [1, 1, 1, 1, 0, 0, 0],
      'goal_3': [1, 1, 1, 0, 0, 0, 0],
      'goal_4': [1, 1, 0, 1, 0, 0, 0],
      'goal_5': [0, 1, 1, 1, 0, 0, 0]
    };

    const notes = {};
    notes[currentWeekKey] = "Build momentum with morning consistency and screen break!";

    const dayEvents = {};
    const wednesdayDate = getDateForWeekDay(thisMonday, 2);
    const fridayDate = getDateForWeekDay(thisMonday, 4);

    dayEvents[getDayDateKey(wednesdayDate)] = [
      { id: 'evt_sample_1', title: 'Doctor Appointment', time: '16:30', alertOneHour: true, notified: false, completed: true },
      { id: 'evt_sample_2', title: 'Submit Weekly Report', time: '18:00', alertOneHour: true, notified: false, completed: false }
    ];

    dayEvents[getDayDateKey(fridayDate)] = [
      { id: 'evt_sample_3', title: 'Dinner with friends', time: '20:00', alertOneHour: true, notified: false, completed: false }
    ];

    return { soundEnabled: true, notificationsEnabled: false, goals: defaultGoals, logs, notes, dayEvents };
  }

  // --- Storage ---
  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        trackerData = JSON.parse(raw);
        if (!trackerData.goals) trackerData.goals = [];
        if (!trackerData.logs) trackerData.logs = {};
        if (!trackerData.notes) trackerData.notes = {};
        if (!trackerData.dayEvents) trackerData.dayEvents = {};
        if (trackerData.soundEnabled === undefined) trackerData.soundEnabled = true;
        return;
      }
    } catch (e) {
      console.warn('Could not read storage', e);
    }
    trackerData = generateDefaultData();
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    if (typeof syncRemindersToWorker === 'function') syncRemindersToWorker();
  }

  function getCurrentWeekLogs() {
    const key = getWeekKey(currentDate);
    if (!trackerData.logs[key]) {
      trackerData.logs[key] = {};
    }
    return trackerData.logs[key];
  }

  function getGoalLogs(goalId) {
    const weekLogs = getCurrentWeekLogs();
    if (!weekLogs[goalId]) {
      weekLogs[goalId] = [0, 0, 0, 0, 0, 0, 0];
    }
    return weekLogs[goalId];
  }

  // --- SPECIFIC DAY EVENTS LOGIC ---
  function getEventsForDate(dateKey) {
    if (!trackerData.dayEvents[dateKey]) {
      trackerData.dayEvents[dateKey] = [];
    }
    return trackerData.dayEvents[dateKey];
  }

  window.addDayEvent = function (title, time, alertOneHour) {
    if (!title || !title.trim()) return;
    const thisMon = getMonday(currentDate);
    const targetDate = getDateForWeekDay(thisMon, activeDayIndex);
    const dateKey = getDayDateKey(targetDate);

    const events = getEventsForDate(dateKey);
    events.push({
      id: 'evt_' + Date.now(),
      title: title.trim(),
      time: time || '12:00',
      alertOneHour: alertOneHour !== false,
      notified: false,
      completed: false
    });

    saveData();
    renderDayViewModalContent();
    renderDayPickerRow();
    checkUpcomingEventReminders();
  };

  window.toggleDayEvent = function (eventId) {
    const thisMon = getMonday(currentDate);
    const targetDate = getDateForWeekDay(thisMon, activeDayIndex);
    const dateKey = getDayDateKey(targetDate);
    const events = getEventsForDate(dateKey);

    const evt = events.find(e => e.id === eventId);
    if (evt) {
      evt.completed = !evt.completed;
      playTickSound(evt.completed);
      if (navigator.vibrate) {
        try { navigator.vibrate(25); } catch (e) {}
      }
      saveData();
      renderDayViewModalContent();
      renderDayPickerRow();
      checkUpcomingEventReminders();
    }
  };

  window.deleteDayEvent = function (eventId) {
    const thisMon = getMonday(currentDate);
    const targetDate = getDateForWeekDay(thisMon, activeDayIndex);
    const dateKey = getDayDateKey(targetDate);
    const events = getEventsForDate(dateKey);

    trackerData.dayEvents[dateKey] = events.filter(e => e.id !== eventId);
    saveData();
    renderDayViewModalContent();
    renderDayPickerRow();
    checkUpcomingEventReminders();
  };

  // --- STREAK CALCULATION ---
  function calculateHabitStreak(goalId) {
    const today = new Date();
    let currentDay = today.getDay();
    let dayIdx = currentDay === 0 ? 6 : currentDay - 1;

    const weekLogs = trackerData.logs[getWeekKey(today)] || {};
    const logs = weekLogs[goalId] || [0, 0, 0, 0, 0, 0, 0];

    let streak = 0;
    let startIdx = dayIdx;
    if (logs[startIdx] !== 1 && startIdx > 0 && logs[startIdx - 1] === 1) {
      startIdx = startIdx - 1;
    }

    for (let i = startIdx; i >= 0; i--) {
      if (logs[i] === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  function calculateOverallStreak() {
    const today = new Date();
    let currentDay = today.getDay();
    let dayIdx = currentDay === 0 ? 6 : currentDay - 1;
    const weekLogs = trackerData.logs[getWeekKey(today)] || {};

    let streak = 0;
    for (let d = dayIdx; d >= 0; d--) {
      let anyDone = false;
      for (const g of trackerData.goals) {
        if ((weekLogs[g.id] || [])[d] === 1) {
          anyDone = true;
          break;
        }
      }
      if (anyDone) {
        streak++;
      } else if (d === dayIdx) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  }

  // --- 1-TAP TOGGLE TICK MARK (✓) ---
  window.toggleTick = function (goalId, dayIndex) {
    const logs = getGoalLogs(goalId);
    const wasTicked = logs[dayIndex] === 1;
    logs[dayIndex] = wasTicked ? 0 : 1;

    playTickSound(!wasTicked);
    if (navigator.vibrate) {
      try { navigator.vibrate(25); } catch (e) {}
    }

    saveData();
    renderAll();

    const dayModal = document.getElementById('dayViewModal');
    if (!dayModal.classList.contains('hidden')) {
      renderDayViewModalContent();
    }

    checkAllGoalsComplete();
  };

  function checkAllGoalsComplete() {
    if (trackerData.goals.length === 0) return;
    const weekLogs = getCurrentWeekLogs();
    let allMet = true;
    for (const g of trackerData.goals) {
      const arr = weekLogs[g.id] || [];
      const count = arr.filter(x => x === 1).length;
      if (count < g.target) {
        allMet = false;
        break;
      }
    }
    if (allMet) {
      triggerCelebration();
    }
  }

  // --- DAILY QUOTE ---
  function updateQuote(idx = null) {
    if (idx !== null) {
      currentQuoteIndex = idx % QUOTES.length;
    } else {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      currentQuoteIndex = dayOfYear % QUOTES.length;
    }
    const q = QUOTES[currentQuoteIndex];
    document.getElementById('dailyQuoteText').textContent = `"${q.text}"`;
    document.getElementById('dailyQuoteAuthor').textContent = `— ${q.author}`;
  }

  // --- DAY VIEW MODAL RENDERING ---
  window.openDayView = function (dayIndex) {
    activeDayIndex = Math.max(0, Math.min(6, dayIndex));
    renderDayViewModalContent();
    showModal('dayViewModal', 'dayViewCard');
  };

  function renderDayViewModalContent() {
    const thisMon = getMonday(currentDate);
    const targetDate = getDateForWeekDay(thisMon, activeDayIndex);
    const dateKey = getDayDateKey(targetDate);

    const dayFullNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    today.setHours(0,0,0,0);
    const isToday = targetDate.getTime() === today.getTime();

    document.getElementById('dayModalSubtitle').textContent = isToday ? "Today's Agenda" : `${dayFullNames[activeDayIndex]} Agenda`;
    document.getElementById('dayModalTitle').textContent = `${dayFullNames[activeDayIndex]}, ${monthNames[targetDate.getMonth()]} ${String(targetDate.getDate()).padStart(2, '0')}`;

    // Festival Banner Check
    const festBanner = document.getElementById('dayFestivalBanner');
    const fest = getIndianFestival(targetDate);
    if (fest) {
      document.getElementById('festivalEmoji').textContent = fest.emoji;
      document.getElementById('festivalFullName').textContent = fest.fullName;
      festBanner.classList.remove('hidden');
    } else {
      festBanner.classList.add('hidden');
    }

    // 1. One-time specific events list
    const events = getEventsForDate(dateKey);
    const eventsList = document.getElementById('dayEventsList');
    const noEventsMsg = document.getElementById('noEventsMsg');
    const eventsCountBadge = document.getElementById('dayEventsCount');

    eventsCountBadge.textContent = `${events.length} event${events.length === 1 ? '' : 's'}`;

    if (events.length === 0) {
      eventsList.innerHTML = '';
      noEventsMsg.classList.remove('hidden');
    } else {
      noEventsMsg.classList.add('hidden');
      eventsList.innerHTML = events.map(evt => `
        <div class="p-2.5 rounded-xl border transition-all ${
          evt.completed 
            ? 'bg-cream-100 border-cream-300 opacity-80' 
            : 'bg-white border-cream-300 shadow-2xs'
        }">
          <div class="flex items-center justify-between">
            <button onclick="window.toggleDayEvent('${evt.id}')" class="flex items-center gap-2.5 text-left flex-1 touch-btn min-w-0">
              <div class="w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                evt.completed 
                  ? 'bg-coffee-800 border-coffee-800 text-cream-50' 
                  : 'border-cream-400 bg-cream-50'
              }">
                ${evt.completed ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
              </div>
              <div class="min-w-0 flex-1">
                <span class="text-xs font-bold text-coffee-900 block truncate ${evt.completed ? 'line-through text-coffee-500' : ''}">
                  ${evt.title}
                </span>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[10px] font-extrabold text-caramel-600">
                    ${formatTimeDisplay(evt.time)}
                  </span>
                </div>
              </div>
            </button>

            <button onclick="window.deleteDayEvent('${evt.id}')" class="p-1.5 text-coffee-400 hover:text-rose-700 touch-btn ml-2 shrink-0" title="Delete">
              <i class="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    // 2. Habits for this day list
    const habitsList = document.getElementById('dayHabitsList');
    const goals = trackerData.goals;
    const weekLogs = getCurrentWeekLogs();

    let completedHabitsCount = 0;
    if (goals.length === 0) {
      habitsList.innerHTML = '<p class="text-xs text-coffee-400 italic text-center py-2">No habits configured yet.</p>';
    } else {
      habitsList.innerHTML = goals.map(g => {
        const logs = weekLogs[g.id] || [0,0,0,0,0,0,0];
        const isDone = logs[activeDayIndex] === 1;
        if (isDone) completedHabitsCount++;
        const icon = CATEGORY_ICONS[g.category] || 'fa-check';
        const color = g.color || BROWN_PALETTE.espresso;

        return `
          <div class="flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
            isDone 
              ? 'bg-cream-100 border-cream-300' 
              : 'bg-white border-cream-300 shadow-2xs'
          }">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-7 h-7 rounded-xl flex items-center justify-center text-cream-50 text-xs shrink-0" style="background-color: ${color}">
                <i class="fa-solid ${icon}"></i>
              </div>
              <div class="min-w-0">
                <span class="text-xs font-extrabold text-coffee-900 block truncate ${isDone ? 'line-through text-coffee-500' : ''}">
                  ${g.name}
                </span>
                <span class="text-[10px] text-coffee-500 font-semibold">${g.category}</span>
              </div>
            </div>

            <button 
              onclick="window.toggleTick('${g.id}', ${activeDayIndex})" 
              class="w-9 h-9 rounded-xl flex items-center justify-center transition-all transform active:scale-90 border touch-btn ${
                isDone 
                  ? 'text-cream-50 font-bold shadow-xs' 
                  : 'bg-cream-50 border-cream-300 text-cream-400 hover:border-coffee-500'
              }"
              style="${isDone ? `background-color: ${color}; border-color: ${color};` : ''}"
            >
              ${isDone ? '<i class="fa-solid fa-check text-xs check-animation"></i>' : '<span class="text-xs font-bold text-coffee-400">+</span>'}
            </button>
          </div>
        `;
      }).join('');
    }

    // 3. Habit Progress Score for this Day (Excludes specific events/tasks as requested)
    const totalHabits = goals.length;
    const pct = totalHabits > 0 ? Math.round((completedHabitsCount / totalHabits) * 100) : 0;

    document.getElementById('dayModalScore').textContent = `${pct}%`;
    document.getElementById('dayModalSub').textContent = `(${completedHabitsCount} of ${totalHabits} habits completed)`;
    document.getElementById('dayModalProgressBar').style.width = `${pct}%`;
  }

  // --- 7-DAY PICKER ROW RENDERING ---
  function renderDayPickerRow() {
    const row = document.getElementById('dayPickerRow');
    if (!row) return;

    const thisMon = getMonday(currentDate);
    const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const goals = trackerData.goals;
    const weekLogs = getCurrentWeekLogs();

    const today = new Date();
    today.setHours(0,0,0,0);

    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = getDateForWeekDay(thisMon, i);
      const dateKey = getDayDateKey(d);
      const isToday = d.getTime() === today.getTime();

      let dayTicks = 0;
      goals.forEach(g => {
        if ((weekLogs[g.id] || [])[i] === 1) dayTicks++;
      });

      const events = trackerData.dayEvents[dateKey] || [];
      const hasEvents = events.length > 0;
      const allEventsDone = hasEvents && events.every(e => e.completed);
      const fest = getIndianFestival(d);

      html += `
        <button 
          onclick="window.openDayView(${i})"
          class="flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all border transform active:scale-95 touch-btn ${
            isToday 
              ? 'bg-coffee-800 text-cream-50 border-coffee-800 shadow-2xs font-black' 
              : 'bg-cream-50/80 border-cream-200/80 text-coffee-800 hover:bg-cream-100'
          }"
        >
          <span class="text-[9px] font-bold uppercase tracking-wider leading-none mb-0.5 ${isToday ? 'text-amber-200' : 'text-coffee-400'}">${dayLetters[i]}</span>
          <span class="text-xs font-black leading-none ${isToday ? 'text-cream-50' : 'text-coffee-900'}">${d.getDate()}</span>
          
          ${fest ? `
            <span class="text-[7.5px] font-bold text-amber-900 bg-amber-100/90 rounded px-1 py-0.2 mt-0.5 max-w-[95%] truncate leading-tight block text-center" title="${fest.fullName}">
              ${fest.emoji} ${fest.name}
            </span>
          ` : ''}

          <div class="flex items-center gap-0.5 mt-1">
            ${dayTicks > 0 
              ? `<span class="text-[9px] font-black ${isToday ? 'text-amber-300' : 'text-coffee-700'}">${dayTicks}✓</span>` 
              : `<span class="text-[8px] text-cream-300 leading-none">•</span>`
            }
            ${hasEvents 
              ? `<i class="fa-solid fa-bell text-[7.5px] ${allEventsDone ? 'text-emerald-500' : 'text-amber-500'}" title="${events.length} event(s)"></i>` 
              : ''
            }
          </div>
        </button>
      `;
    }

    row.innerHTML = html;
  }

  // --- RENDERING ---

  function renderWeekHeader() {
    const monday = getMonday(currentDate);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const year = sunday.getFullYear();
    const rangeStr = `${formatShortDate(monday)} - ${formatShortDate(sunday)}`;
    document.getElementById('currentWeekRange').textContent = rangeStr;
    const yearBadge = document.getElementById('currentYearBadge');
    if (yearBadge) yearBadge.textContent = String(year);
    const headerYear = document.getElementById('headerYearText');
    if (headerYear) headerYear.textContent = String(year);

    const todayMon = getMonday(new Date());
    const isThisWeek = monday.getTime() === todayMon.getTime();
    const subLabel = document.getElementById('currentWeekSubtitle');
    if (isThisWeek) {
      subLabel.textContent = 'This Week (Current)';
      subLabel.className = 'text-[10px] text-caramel-600 font-extrabold uppercase tracking-wider';
    } else {
      const diffWeeks = Math.round((monday - todayMon) / (7 * 24 * 60 * 60 * 1000));
      subLabel.textContent = diffWeeks < 0 ? `${Math.abs(diffWeeks)} wk(s) ago` : `In ${diffWeeks} wk(s)`;
      subLabel.className = 'text-[10px] text-coffee-500 font-bold uppercase tracking-wider';
    }

    const weekKey = getWeekKey(currentDate);
    document.getElementById('weeklyNoteInput').value = trackerData.notes[weekKey] || '';
  }

  function renderKPIs() {
    const goals = trackerData.goals;
    const weekLogs = getCurrentWeekLogs();

    let totalTarget = 0;
    let totalTicked = 0;
    const dayTickCounts = [0, 0, 0, 0, 0, 0, 0];

    goals.forEach(goal => {
      totalTarget += Number(goal.target) || 0;
      const logs = weekLogs[goal.id] || [0, 0, 0, 0, 0, 0, 0];
      logs.forEach((val, dIdx) => {
        if (val === 1) {
          totalTicked++;
          dayTickCounts[dIdx]++;
        }
      });
    });

    const percentage = totalTarget > 0 ? Math.min(100, Math.round((totalTicked / totalTarget) * 100)) : 0;
    document.getElementById('statCompletion').textContent = `${percentage}%`;
    document.getElementById('statProgressSub').textContent = `${totalTicked} of ${totalTarget} tasks ticked ✓`;

    const progBar = document.getElementById('statProgressBar');
    progBar.style.width = `${percentage}%`;

    const dayShorts = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dayDotsContainer = document.getElementById('activeDaysIndicators');
    dayDotsContainer.innerHTML = '';
    
    const currentDay = new Date().getDay();
    const todayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const isThisActualWeek = getMonday(currentDate).getTime() === getMonday(new Date()).getTime();

    for (let i = 0; i < 7; i++) {
      const active = dayTickCounts[i] > 0;
      const isToday = (i === todayIndex) && isThisActualWeek;

      const dot = document.createElement('div');
      dot.className = `w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold transition-all ${
        active 
          ? 'bg-coffee-800 text-cream-50 font-black' 
          : 'bg-cream-100 text-coffee-400 font-medium'
      } ${isToday ? 'ring-1.5 ring-caramel-500 font-black' : ''}`;
      dot.textContent = dayShorts[i];
      dayDotsContainer.appendChild(dot);
    }

    let maxIdx = 0;
    let maxVal = 0;
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    dayTickCounts.forEach((cnt, idx) => {
      if (cnt > maxVal) {
        maxVal = cnt;
        maxIdx = idx;
      }
    });
    const bestDayEl = document.getElementById('statBestDay');
    bestDayEl.textContent = maxVal > 0 ? `Best: ${dayNames[maxIdx]} (${maxVal} ✓)` : 'Mon - Sun';

    const streak = calculateOverallStreak();
    document.getElementById('statOverallStreak').innerHTML = `<i class="fa-solid fa-fire text-amber-600"></i> ${streak}d`;
  }

  function renderGoalsCards() {
    const container = document.getElementById('goalsCardsList');
    const emptyState = document.getElementById('noGoalsState');
    let goals = trackerData.goals;
    const weekLogs = getCurrentWeekLogs();

    if (activeFilter !== 'all') {
      goals = goals.filter(g => (g.timeOfDay || 'Anytime') === activeFilter);
    }

    if (!goals || goals.length === 0) {
      container.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }
    emptyState.classList.add('hidden');

    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const currentDay = new Date().getDay();
    const todayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const isThisActualWeek = getMonday(currentDate).getTime() === getMonday(new Date()).getTime();

    let html = '';

    goals.forEach(goal => {
      const logs = weekLogs[goal.id] || [0, 0, 0, 0, 0, 0, 0];
      const countTicked = logs.filter(v => v === 1).length;
      const isMet = countTicked >= goal.target;
      const icon = CATEGORY_ICONS[goal.category] || 'fa-check';
      const themeColor = goal.color || BROWN_PALETTE.espresso;
      const habitStreak = calculateHabitStreak(goal.id);

      html += `
        <div class="bg-white border border-cream-200/90 rounded-2xl p-3 shadow-2xs hover:shadow-xs transition-all">
          
          <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center text-cream-50 shrink-0 text-xs" style="background-color: ${themeColor}">
                <i class="fa-solid ${icon}"></i>
              </div>
              <div class="min-w-0">
                <div class="font-extrabold text-coffee-900 text-xs truncate flex items-center gap-1.5 leading-snug">
                  <span>${goal.name}</span>
                  ${isMet ? '<i class="fa-solid fa-circle-check text-emerald-700 text-xs" title="Goal Met!"></i>' : ''}
                </div>
                <div class="text-[9px] text-coffee-500 font-bold flex items-center gap-1.5 flex-wrap">
                  <span class="px-1.5 py-0.2 rounded bg-cream-100 text-coffee-700">${goal.category}</span>
                  ${goal.timeOfDay && goal.timeOfDay !== 'Anytime' ? `<span class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">${goal.timeOfDay}</span>` : ''}
                  ${habitStreak > 0 ? `<span class="text-caramel-600 font-extrabold flex items-center gap-0.5"><i class="fa-solid fa-fire text-amber-600 text-[8px]"></i> ${habitStreak}d</span>` : ''}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-1 shrink-0">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${isMet ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-cream-100 text-coffee-800'}">
                ${countTicked}/${goal.target} ✓
              </span>
              <button onclick="window.openEditGoal('${goal.id}')" class="p-1 text-coffee-400 hover:text-coffee-800 touch-btn" title="Edit">
                <i class="fa-solid fa-pen-to-square text-xs"></i>
              </button>
              <button onclick="window.deleteGoal('${goal.id}')" class="p-1 text-coffee-400 hover:text-rose-700 touch-btn" title="Delete">
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-1 pt-0.5">
            ${logs.map((isTicked, idx) => {
              const ticked = isTicked === 1;
              const isToday = isThisActualWeek && (idx === todayIndex);

              return `
                <button 
                  onclick="window.toggleTick('${goal.id}', ${idx})"
                  title="${dayFull[idx]}: Click to toggle"
                  class="h-10 rounded-xl flex flex-col items-center justify-center transition-all transform active:scale-90 touch-btn border ${
                    ticked 
                      ? 'shadow-2xs text-cream-50 font-black' 
                      : 'bg-cream-50 border-cream-200/80 text-coffee-600 hover:bg-cream-100'
                  } ${isToday && !ticked ? 'ring-1.5 ring-caramel-500/80 border-caramel-400' : ''}"
                  style="${ticked ? `background-color: ${themeColor}; border-color: ${themeColor};` : ''}"
                >
                  <span class="text-[9px] font-bold opacity-75 leading-none mb-0.5">${dayLabels[idx]}</span>
                  ${ticked 
                    ? '<i class="fa-solid fa-check text-xs check-animation"></i>' 
                    : '<span class="text-[10px] text-cream-300 leading-none font-bold">•</span>'
                  }
                </button>
              `;
            }).join('')}
          </div>

        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderDailyBarChart() {
    const canvas = document.getElementById('dailyBarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const goals = trackerData.goals;
    const weekLogs = getCurrentWeekLogs();

    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    goals.forEach(g => {
      const logs = weekLogs[g.id] || [];
      logs.forEach((val, idx) => {
        if (val === 1) dayCounts[idx]++;
      });
    });

    if (dailyChartInstance) {
      dailyChartInstance.destroy();
    }

    dailyChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dayLabels,
        datasets: [{
          label: 'Tasks Ticked ✓',
          data: dayCounts,
          backgroundColor: dayCounts.map(cnt => cnt > 0 ? '#3D2A1C' : '#EFE9DC'),
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (evt, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            window.openDayView(index);
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#271B12',
            titleFont: { family: 'Plus Jakarta Sans', weight: '700', size: 12 },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.raw} task(s) ticked (Tap to open day)`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' },
              color: '#523B27'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' },
              color: '#8C6C4C'
            },
            grid: { color: '#EFE9DC' }
          }
        }
      }
    });
  }

  // --- MINI CALENDAR (JUMP TO ANY WEEK) ---
  function toggleMiniCalendar(forceOpen = null) {
    const card = document.getElementById('miniCalendarCard');
    const chevron = document.getElementById('miniCalChevron');
    if (!card) return;
    const isCurrentlyHidden = card.classList.contains('hidden');
    const shouldOpen = (forceOpen !== null) ? forceOpen : isCurrentlyHidden;

    if (shouldOpen) {
      card.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      miniCalViewDate = new Date(currentDate);
      renderMiniCalendar();
    } else {
      card.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  window.jumpToWeekFromDate = function (year, month, day) {
    currentDate = new Date(year, month, day);
    renderAll();
    toggleMiniCalendar(false);
    playTickSound(true);
  };

  function renderMiniCalendar() {
    const titleEl = document.getElementById('miniCalMonthYearTitle');
    const gridEl = document.getElementById('miniCalDaysGrid');
    if (!titleEl || !gridEl) return;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calYear = miniCalViewDate.getFullYear();
    const calMonth = miniCalViewDate.getMonth();
    titleEl.textContent = `${monthNames[calMonth]} ${calYear}`;

    const currentMon = getMonday(currentDate);
    const currentSun = new Date(currentMon);
    currentSun.setDate(currentMon.getDate() + 6);
    currentSun.setHours(23, 59, 59, 999);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
    const startDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(calYear, calMonth, 0).getDate();

    let html = '';

    // Prev month padding
    for (let p = startDayOffset - 1; p >= 0; p--) {
      const dNum = prevMonthTotalDays - p;
      const prevDate = new Date(calYear, calMonth - 1, dNum);
      const inCurrentWeek = prevDate >= currentMon && prevDate <= currentSun;

      html += `
        <button 
          onclick="window.jumpToWeekFromDate(${calYear}, ${calMonth - 1}, ${dNum})"
          class="h-8 rounded-xl flex flex-col items-center justify-center text-[11px] font-medium text-cream-400 hover:bg-cream-100 touch-btn ${
            inCurrentWeek ? 'bg-cream-200 text-coffee-600 font-bold' : ''
          }"
        >
          <span>${dNum}</span>
        </button>
      `;
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(calYear, calMonth, day);
      const isToday = dayDate.getTime() === today.getTime();
      const inCurrentWeek = dayDate >= currentMon && dayDate <= currentSun;
      const fest = getIndianFestival(dayDate);

      html += `
        <button 
          onclick="window.jumpToWeekFromDate(${calYear}, ${calMonth}, ${day})"
          title="${fest ? fest.fullName + ' - Tap to view this week' : 'Tap to jump to this week'}"
          class="h-8 rounded-xl flex flex-col items-center justify-center transition-all transform active:scale-90 touch-btn relative ${
            inCurrentWeek 
              ? 'bg-coffee-800 text-cream-50 font-black shadow-2xs' 
              : 'hover:bg-cream-200 text-coffee-800 font-bold'
          } ${isToday && !inCurrentWeek ? 'border-2 border-caramel-500 font-extrabold' : ''}"
        >
          <span class="text-[11px] leading-none">${day}</span>
          ${fest ? `<span class="w-1.5 h-1.5 rounded-full ${inCurrentWeek ? 'bg-amber-300' : 'bg-amber-600'} mt-0.5"></span>` : ''}
        </button>
      `;
    }

    // Next month padding
    const totalCells = startDayOffset + totalDays;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let n = 1; n <= remainingCells; n++) {
      const nextDate = new Date(calYear, calMonth + 1, n);
      const inCurrentWeek = nextDate >= currentMon && nextDate <= currentSun;

      html += `
        <button 
          onclick="window.jumpToWeekFromDate(${calYear}, ${calMonth + 1}, ${n})"
          class="h-8 rounded-xl flex flex-col items-center justify-center text-[11px] font-medium text-cream-400 hover:bg-cream-100 touch-btn ${
            inCurrentWeek ? 'bg-cream-200 text-coffee-600 font-bold' : ''
          }"
        >
          <span>${n}</span>
        </button>
      `;
    }

    gridEl.innerHTML = html;
  }

  function renderAll() {
    renderWeekHeader();
    renderDayPickerRow();
    renderKPIs();
    renderGoalsCards();
    renderDailyBarChart();
    renderMiniCalendar();
    updateSoundUI();
    updateNotificationUI();
    checkUpcomingEventReminders();
  }

  function updateSoundUI() {
    const icon = document.getElementById('soundIcon');
    const modalBtn = document.getElementById('modalSoundToggleBtn');
    if (trackerData.soundEnabled) {
      icon.className = 'fa-solid fa-volume-high text-xs text-coffee-800';
      if (modalBtn) modalBtn.textContent = 'Enabled';
    } else {
      icon.className = 'fa-solid fa-volume-xmark text-xs text-coffee-400';
      if (modalBtn) modalBtn.textContent = 'Muted';
    }
  }

  // --- CELEBRATION ---
  function triggerCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 85,
        spread: 60,
        colors: ['#3D2A1C', '#8C5338', '#D5BEA1', '#4A6B53', '#A64B2A'],
        origin: { y: 0.6 }
      });
    }
  }

  // --- MODAL CONTROLS ---
  function showModal(modalId, cardId) {
    const modal = document.getElementById(modalId);
    const card = document.getElementById(cardId);
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      card.classList.remove('translate-y-6', 'translate-y-8');
      card.classList.add('translate-y-0');
    });
  }

  function hideModal(modalId, cardId) {
    const modal = document.getElementById(modalId);
    const card = document.getElementById(cardId);
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0');
    card.classList.add('translate-y-6');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }

  function openGoalModal(isEdit = false, goalObj = null) {
    const title = document.getElementById('goalModalTitle');
    const idInput = document.getElementById('goalIdInput');
    const nameInput = document.getElementById('goalNameInput');
    const targetInput = document.getElementById('goalTargetInput');
    const catInput = document.getElementById('goalCategoryInput');
    const timeInput = document.getElementById('goalTimeInput');
    const colorInput = document.getElementById('goalColorInput');

    if (isEdit && goalObj) {
      title.textContent = 'Edit Habit';
      idInput.value = goalObj.id;
      nameInput.value = goalObj.name;
      targetInput.value = goalObj.target || 5;
      catInput.value = goalObj.category || 'Habit';
      timeInput.value = goalObj.timeOfDay || 'Anytime';
      colorInput.value = goalObj.color || BROWN_PALETTE.espresso;
    } else {
      title.textContent = 'Add New Habit';
      idInput.value = '';
      nameInput.value = '';
      targetInput.value = 5;
      catInput.value = 'Habit';
      timeInput.value = 'Anytime';
      colorInput.value = BROWN_PALETTE.espresso;
    }
    showModal('goalModal', 'goalModalCard');
  }

  window.openEditGoal = function (goalId) {
    const goal = trackerData.goals.find(g => g.id === goalId);
    if (goal) openGoalModal(true, goal);
  };

  window.deleteGoal = function (goalId) {
    const goal = trackerData.goals.find(g => g.id === goalId);
    if (!goal) return;
    if (confirm(`Delete "${goal.name}"?`)) {
      trackerData.goals = trackerData.goals.filter(g => g.id !== goalId);
      saveData();
      renderAll();
    }
  };

  // --- EVENT LISTENERS ---
  function initEventListeners() {
    // Week navigation
    document.getElementById('prevWeekBtn').addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() - 7);
      renderAll();
    });

    document.getElementById('nextWeekBtn').addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() + 7);
      renderAll();
    });

    document.getElementById('todayBtn').addEventListener('click', () => {
      currentDate = new Date();
      renderAll();
    });

    // Mini Calendar Toggle & Month Navigation
    const toggleMiniCalBtn = document.getElementById('toggleMiniCalBtn');
    if (toggleMiniCalBtn) toggleMiniCalBtn.addEventListener('click', () => toggleMiniCalendar());

    const prevMonthBtn = document.getElementById('miniCalPrevMonth');
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
      miniCalViewDate.setMonth(miniCalViewDate.getMonth() - 1);
      renderMiniCalendar();
    });

    const nextMonthBtn = document.getElementById('miniCalNextMonth');
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
      miniCalViewDate.setMonth(miniCalViewDate.getMonth() + 1);
      renderMiniCalendar();
    });

    const jumpTodayBtn = document.getElementById('miniCalJumpToday');
    if (jumpTodayBtn) jumpTodayBtn.addEventListener('click', () => {
      miniCalViewDate = new Date();
      currentDate = new Date();
      renderAll();
      toggleMiniCalendar(false);
      playTickSound(true);
    });

    // Toggle Collapsible Daily Activity Bar Chart
    const toggleChartBtn = document.getElementById('toggleChartBtn');
    if (toggleChartBtn) {
      toggleChartBtn.addEventListener('click', () => {
        const chartBox = document.getElementById('chartContainer');
        if (chartBox) {
          const isHidden = chartBox.classList.toggle('hidden');
          if (!isHidden) {
            renderDailyBarChart();
          }
        }
      });
    }

    // Notification Permission triggers
    document.getElementById('notifyPermissionBtn').addEventListener('click', () => requestNotificationPermission(false));
    const modalNotifyBtn = document.getElementById('modalNotifyBtn');
    if (modalNotifyBtn) modalNotifyBtn.addEventListener('click', () => requestNotificationPermission(false));

    const modalTestBtn = document.getElementById('modalTestNotifyBtn');
    if (modalTestBtn) {
      modalTestBtn.addEventListener('click', () => {
        if (!('Notification' in window)) {
          alert('Notifications are not supported in this browser.');
          return;
        }
        if (Notification.permission === 'granted') {
          sendSystemNotification(
            '🔔 Test Alert: Progress App',
            '1-Hour reminders are enabled and working properly on your phone!'
          ).then(sent => {
            alert(sent ? '✅ Test notification sent! Check your phone status bar or notification shade.' : '⚠️ Notification blocked by device settings.');
          });
        } else {
          requestNotificationPermission(true);
        }
      });
    }

    // Dismiss in-app upcoming reminder banner (permanently dismisses this specific event from popping up again)
    window.dismissUpcomingReminderBanner = function (e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (currentActiveBannerEventId) {
        dismissedReminderIds.add(currentActiveBannerEventId);
      }
      try {
        const today = new Date();
        const events = trackerData.dayEvents[getDayDateKey(today)] || [];
        const now = new Date();
        events.forEach(ev => {
          if (!ev.time) return;
          const [h, m] = ev.time.split(':').map(Number);
          const evTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m, 0);
          const diffMins = Math.floor((evTime - now) / 60000);
          if (diffMins >= 0 && diffMins <= 60) {
            dismissedReminderIds.add(ev.id);
          }
        });
        localStorage.setItem('progress_dismissed_reminders', JSON.stringify([...dismissedReminderIds]));
      } catch (err) {}

      const banner = document.getElementById('upcomingReminderBanner');
      if (banner) banner.classList.add('hidden');
      currentActiveBannerEventId = null;
      window.currentActiveBannerEventId = null;
    };

    const dismissBtn = document.getElementById('dismissReminderBannerBtn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', window.dismissUpcomingReminderBanner);
    }

    // Open Today Button in 7-day row
    const openTodayAction = () => {
      const idx = getTodayIndexInCurrentWeek();
      window.openDayView(idx);
    };
    document.getElementById('openTodayViewBtn').addEventListener('click', openTodayAction);
    document.getElementById('floatingDayViewBtn').addEventListener('click', openTodayAction);

    // Day View Modal Navigation
    document.getElementById('dayPrevBtn').addEventListener('click', () => {
      activeDayIndex = (activeDayIndex + 6) % 7;
      renderDayViewModalContent();
    });

    document.getElementById('dayNextBtn').addEventListener('click', () => {
      activeDayIndex = (activeDayIndex + 1) % 7;
      renderDayViewModalContent();
    });

    document.getElementById('closeDayViewModal').addEventListener('click', () => hideModal('dayViewModal', 'dayViewCard'));
    document.getElementById('dayModalDoneBtn').addEventListener('click', () => hideModal('dayViewModal', 'dayViewCard'));

    // Add Event Form with Time & 1-Hour Alert Checkbox
    document.getElementById('addEventForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newEventInput');
      const timeInput = document.getElementById('newEventTimeInput');
      const alertCheck = document.getElementById('newEventAlertCheckbox');

      window.addDayEvent(input.value, timeInput.value, alertCheck.checked);
      input.value = '';

      // Ask for notification permission if not yet decided
      if ('Notification' in window && Notification.permission === 'default') {
        requestNotificationPermission();
      }
    });

    // Sound Toggles
    const toggleSound = () => {
      trackerData.soundEnabled = !trackerData.soundEnabled;
      saveData();
      updateSoundUI();
      if (trackerData.soundEnabled) playTickSound(true);
    };
    document.getElementById('toggleSoundBtn').addEventListener('click', toggleSound);
    const modalSoundBtn = document.getElementById('modalSoundToggleBtn');
    if (modalSoundBtn) modalSoundBtn.addEventListener('click', toggleSound);

    // Quote Refresh
    document.getElementById('nextQuoteBtn').addEventListener('click', () => {
      updateQuote(currentQuoteIndex + 1);
    });

    // Filter Tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('bg-coffee-800', 'text-cream-50', 'active', 'font-bold');
          t.classList.add('bg-white', 'text-coffee-600', 'border', 'border-cream-200', 'font-semibold');
        });
        tab.classList.remove('bg-white', 'text-coffee-600', 'border', 'border-cream-200', 'font-semibold');
        tab.classList.add('bg-coffee-800', 'text-cream-50', 'active', 'font-bold');

        activeFilter = tab.dataset.filter;
        renderGoalsCards();
      });
    });

    // Quick Template Chips
    document.querySelectorAll('.template-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('goalNameInput').value = chip.dataset.name;
        document.getElementById('goalCategoryInput').value = chip.dataset.cat;
        document.getElementById('goalTimeInput').value = chip.dataset.time || 'Anytime';
        document.getElementById('goalTargetInput').value = chip.dataset.target || 5;
      });
    });

    // Weekly Note Auto-Save
    let noteTimeout = null;
    document.getElementById('weeklyNoteInput').addEventListener('input', (e) => {
      clearTimeout(noteTimeout);
      const badge = document.getElementById('savedNoteBadge');
      badge.textContent = 'Saving...';
      badge.className = 'text-[10px] text-caramel-600 font-bold';

      noteTimeout = setTimeout(() => {
        const weekKey = getWeekKey(currentDate);
        trackerData.notes[weekKey] = e.target.value;
        saveData();
        badge.textContent = 'Auto-saved';
        badge.className = 'text-[10px] text-coffee-500 font-medium';
      }, 400);
    });

    // Add Goal Modal
    const handleAdd = () => openGoalModal(false);
    document.getElementById('openAddGoalBtn').addEventListener('click', handleAdd);
    const emptyBtn = document.getElementById('emptyAddGoalBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', handleAdd);

    document.getElementById('closeGoalModal').addEventListener('click', () => hideModal('goalModal', 'goalModalCard'));
    document.getElementById('cancelGoalModal').addEventListener('click', () => hideModal('goalModal', 'goalModalCard'));

    document.getElementById('goalForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('goalIdInput').value;
      const name = document.getElementById('goalNameInput').value.trim();
      const target = Math.min(7, Math.max(1, parseInt(document.getElementById('goalTargetInput').value, 10) || 5));
      const category = document.getElementById('goalCategoryInput').value;
      const timeOfDay = document.getElementById('goalTimeInput').value;
      const color = document.getElementById('goalColorInput').value;

      if (id) {
        const goal = trackerData.goals.find(g => g.id === id);
        if (goal) {
          goal.name = name;
          goal.target = target;
          goal.category = category;
          goal.timeOfDay = timeOfDay;
          goal.color = color;
        }
      } else {
        trackerData.goals.push({
          id: 'goal_' + Date.now(),
          name,
          target,
          category,
          timeOfDay,
          color
        });
      }

      saveData();
      hideModal('goalModal', 'goalModalCard');
      renderAll();
    });

    // Settings
    document.getElementById('openSettingsBtn').addEventListener('click', () => showModal('settingsModal', 'settingsCard'));
    document.getElementById('closeSettingsModal').addEventListener('click', () => hideModal('settingsModal', 'settingsCard'));

    // Celebration
    document.getElementById('celebrateBtn').addEventListener('click', triggerCelebration);

    // Reset Sample
    document.getElementById('resetSampleDataBtn').addEventListener('click', () => {
      if (confirm('Load sample tasks? This will replace current entries.')) {
        trackerData = generateDefaultData();
        saveData();
        renderAll();
        hideModal('settingsModal', 'settingsCard');
      }
    });

    // Clear All
    document.getElementById('clearAllDataBtn').addEventListener('click', () => {
      if (confirm('Clear all tasks and history?')) {
        trackerData = { soundEnabled: true, notificationsEnabled: false, goals: [], logs: {}, notes: {}, dayEvents: {} };
        saveData();
        renderAll();
        hideModal('settingsModal', 'settingsCard');
      }
    });

    // Force Reload & Clear Cache
    const forceBtn = document.getElementById('forceUpdateAppBtn');
    if (forceBtn) {
      forceBtn.addEventListener('click', () => {
        if ('caches' in window) {
          caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(regs => {
                regs.forEach(r => r.unregister());
                window.location.reload(true);
              });
            } else {
              window.location.reload(true);
            }
          });
        } else {
          window.location.reload(true);
        }
      });
    }

    // Export Data JSON
    document.getElementById('exportDataBtn').addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trackerData, null, 2));
      const dlAnchor = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', `weekly-progress-v6-${dateStr}.json`);
      dlAnchor.click();
    });

    // Import Data JSON
    document.getElementById('importFileInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported && Array.isArray(imported.goals)) {
            trackerData = imported;
            if (!trackerData.dayEvents) trackerData.dayEvents = {};
            saveData();
            renderAll();
            hideModal('settingsModal', 'settingsCard');
            alert('Backup loaded successfully!');
          }
        } catch (err) {
          alert('Could not read backup file.');
        }
      };
      reader.readAsText(file);
    });

    // Backdrop click
    ['goalModal', 'settingsModal', 'dayViewModal'].forEach(id => {
      const modal = document.getElementById(id);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('opacity-0');
          setTimeout(() => modal.classList.add('hidden'), 200);
        }
      });
    });

    // Polling interval for reminders (every 20 seconds)
    setInterval(checkUpcomingEventReminders, 20000);
  }

  // --- START APP ---
  loadData();
  updateQuote();
  initEventListeners();
  applyWorkerNotifiedFlags().then(() => {
    syncRemindersToWorker();
    renderAll();
  });
  renderAll();

  // Re-check reminders the moment the app returns to the foreground
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      applyWorkerNotifiedFlags().then(checkUpcomingEventReminders);
    }
  });

})();
