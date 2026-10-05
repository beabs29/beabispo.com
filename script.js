// Textos de la tarjeta en cada idioma.
var TEXTS = {
  es: {
    title: 'Beatriz Bispo de Souza · Del caos al llamado',
    tagline: 'La Palabra de Dios vivida en lo <em>real</em>.',
    eyebrow: 'Conoce mi libro',
    bookTitle: 'Del caos al llamado',
    subtitle: 'Cómo Dios usa tus heridas para revelar tu propósito',
    cover: 'portada-es.webp',
    coverAlt: 'Portada del libro «Del caos al llamado»',
    buy: 'Disponible en Amazon',
    buyUrl: 'https://www.amazon.es/dp/B0HJP51HQK',
    about: 'Sobre mí',
    bio: 'Comparto la Palabra tal y como la vivo: con preguntas, con calma y con esperanza. Te acompaño a encontrar a Dios en medio de lo que hoy no entiendes.',
    social: 'Redes sociales'
  },
  pt: {
    title: 'Beatriz Bispo de Souza · Do caos ao chamado',
    tagline: 'A Palavra de Deus vivida na <em>realidade</em>.',
    eyebrow: 'Conheça meu livro',
    bookTitle: 'Do caos ao chamado',
    subtitle: 'Como Deus usa suas feridas para revelar seu propósito',
    cover: 'portada-pt.webp',
    coverAlt: 'Capa do livro «Do caos ao chamado»',
    buy: 'Disponível na Amazon',
    buyUrl: 'https://www.amazon.com/dp/B0HLWLJC8X',
    about: 'Sobre mim',
    bio: 'Compartilho a Palavra do jeito que a vivo: com perguntas, com calma e com esperança. Eu te acompanho a encontrar Deus em meio ao que hoje você não entende.',
    social: 'Redes sociais'
  },
  en: {
    title: 'Beatriz Bispo de Souza · From Chaos to Calling',
    tagline: 'God’s Word, lived in <em>real</em> life.',
    eyebrow: 'Discover my book',
    bookTitle: 'From chaos to calling',
    subtitle: 'How God uses your wounds to reveal your purpose',
    cover: 'portada-en.webp',
    coverAlt: 'Cover of the book “From Chaos to Calling”',
    buy: 'Available on Amazon',
    buyUrl: 'https://www.amazon.com/dp/B0HLTPZKN9',
    about: 'About me',
    bio: 'I share the Word as I live it: with questions, with calm and with hope. I walk alongside you as you find God in the middle of what you don’t understand today.',
    social: 'Social media'
  }
};

// Selector de idioma: cambia portada, textos y enlace de Amazon.
(function () {
  var buttons = document.querySelectorAll('[data-lang]');
  var cover = document.querySelector('[data-i18n-cover]');
  var buyLink = document.querySelector('[data-i18n-buy]');
  var social = document.querySelector('.social');

  function setText(key, value, html) {
    var el = document.querySelector('[data-i18n="' + key + '"]');
    if (!el) return;
    if (html) el.innerHTML = value; else el.textContent = value;
  }

  function setLang(lang) {
    var t = TEXTS[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    document.title = t.title;
    setText('tagline', t.tagline, true);
    setText('eyebrow', t.eyebrow);
    setText('title', t.bookTitle);
    setText('subtitle', t.subtitle);
    setText('buy', t.buy);
    setText('about', t.about);
    setText('bio', t.bio);
    cover.src = t.cover;
    cover.alt = t.coverAlt;
    buyLink.href = t.buyUrl;
    if (social) social.setAttribute('aria-label', t.social);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-lang') === lang));
    }
  }

  // Idioma inicial: ?lang=pt en el enlace, o el idioma del móvil/navegador.
  function initialLang() {
    var match = /[?&]lang=(es|pt|en)\b/.exec(location.search);
    if (match) return match[1];
    var langs = navigator.languages || [navigator.language || 'es'];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).slice(0, 2).toLowerCase();
      if (TEXTS[code]) return code;
    }
    return 'es';
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      setLang(this.getAttribute('data-lang'));
    });
  }

  var start = initialLang();
  if (start !== 'es') setLang(start);

  // Precarga las otras portadas para que el cambio sea instantáneo.
  window.addEventListener('load', function () {
    for (var lang in TEXTS) {
      if (lang !== start) new Image().src = TEXTS[lang].cover;
    }
  });
})();

// Botón «Sobre mí»: muestra u oculta la breve biografía.
(function () {
  var button = document.querySelector('[aria-controls="bio"]');
  var bio = document.getElementById('bio');
  if (!button || !bio) return;
  button.addEventListener('click', function () {
    var open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    bio.hidden = open;
  });
})();
