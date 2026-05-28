// =========================
// MÁSCARA CPF
// =========================

document.getElementById('cpf').addEventListener('input', function () {

  let v = this.value.replace(/\D/g, '');

  if (v.length > 9) {
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  } 
  else if (v.length > 6) {
    v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } 
  else if (v.length > 3) {
    v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  }

  this.value = v;

});


// =========================
// CADASTRO
// =========================

document.getElementById('cadastroForm').addEventListener('submit', function (e) {

  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  const cpf = document.getElementById('cpf').value.trim();

  const nascimento = document.getElementById('nascimento').value;

  const senha = document.getElementById('novaSenha').value;

  const confirmar = document.getElementById('confirmarSenha').value;


  // VALIDAÇÕES

  if (
    nome === '' ||
    cpf === '' ||
    nascimento === ''
  ) {

    mostrarAlerta('Preencha todos os campos.', 'erro');

    return;

  }

  if (cpf.length < 14) {

    mostrarAlerta('CPF inválido.', 'erro');

    return;

  }

  if (senha.length < 8) {

    mostrarAlerta('A senha deve ter no mínimo 8 caracteres.', 'erro');

    return;

  }

  if (senha !== confirmar) {

    mostrarAlerta('As senhas não coincidem.', 'erro');

    return;

  }


  // VERIFICAR TERMOS

  const termos = document.getElementById('termos');

  if (!termos.checked) {

    mostrarAlerta('Aceite os termos para continuar.', 'erro');

    return;

  }


  // VERIFICA CPF EXISTENTE

  const pacientes =
    JSON.parse(localStorage.getItem('pacientes')) || [];

  const jaExiste =
    pacientes.find(p => p.cpf === cpf);

  if (jaExiste) {

    mostrarAlerta('Este CPF já está cadastrado.', 'erro');

    return;

  }


  // CRIAR USUÁRIO

  const novoPaciente = {

    nome,
    cpf,
    nascimento,
    senha,

    criadoEm:
      new Date().toLocaleString('pt-BR')

  };


  // SALVAR

  pacientes.push(novoPaciente);

  localStorage.setItem(
    'pacientes',
    JSON.stringify(pacientes)
  );


  // SUCESSO

  mostrarAlerta(
    'Cadastro realizado com sucesso!',
    'sucesso'
  );


  // MOSTRAR TELA SUCESSO

  setTimeout(() => {

    document.getElementById('cadastroForm').style.display = 'none';

    document.getElementById('successScreen').classList.add('active');

  }, 1200);

});


// =========================
// ALERTA
// =========================

function mostrarAlerta(msg, tipo) {

  const alerta =
    document.getElementById('alerta');

  alerta.textContent = msg;

  alerta.className =
    'health-alerta ' + tipo;

  alerta.style.display = 'block';

}


// =========================
// MOSTRAR / OCULTAR SENHA
// =========================

function toggleSenha(id, botao) {

  const input = document.getElementById(id);

  const icone = botao.querySelector('i');

  if (input.type === 'password') {

    input.type = 'text';

    icone.classList.remove('bi-eye');

    icone.classList.add('bi-eye-slash');

  } else {

    input.type = 'password';

    icone.classList.remove('bi-eye-slash');

    icone.classList.add('bi-eye');

  }

}