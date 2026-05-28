document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const cpf   = document.getElementById('cpf').value.trim();
  const senha = document.getElementById('senha').value;

  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const paciente  = pacientes.find(p => p.cpf === cpf && p.senha === senha);

  if (paciente) {
    localStorage.setItem('pacienteLogado', JSON.stringify(paciente));
    window.location.href = 'dashboard.html';
  } else {
    alert('CPF ou senha incorretos. Verifique seus dados.');
  }
});