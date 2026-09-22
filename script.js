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
