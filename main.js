(() => {
  const body = document.body;
  const stamp = document.getElementById('stamp');
  const live = document.getElementById('live');
  const buttons = document.querySelectorAll('#actions button');
  const again = document.getElementById('again2');
  const serial = 'No. ' + String(Math.floor(100000 + Math.random() * 899999));

  const copy = {
    allowed: { word: 'Allowed', note: '1 receipt read, once.' },
    declined: { word: 'Declined', note: 'Nothing left.' },
  };

  const set = (sel, text) => document.querySelectorAll(sel).forEach((n) => (n.textContent = text));
  set('.serial', serial);

  function answer(kind) {
    const c = copy[kind];
    body.dataset.answer = kind;
    set('.stub-answer', c.word);
    set('.cf-word', c.word);
    set('.stub-note', c.note);
    set('.stub-time', new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));

    stamp.textContent = c.word;
    stamp.className = 'stamp ' + kind;
    void stamp.offsetWidth;
    stamp.classList.add('on');

    buttons.forEach((b) => {
      b.disabled = true;
      b.classList.toggle('chosen', b.dataset.answer === kind);
    });
    live.textContent = `${c.word}. ${c.note} Your copy is ${serial}.`;
  }

  function reset() {
    body.dataset.answer = 'none';
    set('.stub-answer', 'Unanswered');
    set('.stub-note', '');
    set('.stub-time', '');
    stamp.className = 'stamp';
    buttons.forEach((b) => {
      b.disabled = false;
      b.classList.remove('chosen');
    });
    live.textContent = 'Request reopened.';
    buttons[0].focus({ preventScroll: true });
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      answer(b.dataset.answer);
      again.focus({ preventScroll: true });
    })
  );
  again.addEventListener('click', reset);

  // #declined or #allowed opens the page already answered, for review screenshots.
  const preset = location.hash.slice(1);
  if (copy[preset]) answer(preset);
})();
