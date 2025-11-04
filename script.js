// ===== PREVIEW DA FOTO =====
document.getElementById('foto').addEventListener('change', function(e) {
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      // Esconde o placeholder e mostra a imagem
      const placeholder = document.getElementById('fotoPlaceholder');
      const preview = document.getElementById('fotoPreview');
      
      if (placeholder) {
        placeholder.style.display = 'none';
      }
      
      if (preview) {
        preview.src = event.target.result;
        preview.style.display = 'block';
      }
    };
    
    reader.readAsDataURL(file);
  }
});

// ===== VALIDAÇÃO DE CPF =====
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validação dos dígitos verificadores
  let soma = 0;
  let resto;
  
  // Validação do primeiro dígito
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  // Validação do segundo dígito
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

// ===== MÁSCARA DE CPF (Compatível com Mobile) =====
function mascaraCPF(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
  
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  input.value = valor;
}

// ===== FEEDBACK VISUAL DE VALIDAÇÃO DO CPF =====
function verificarCPF(input) {
  const cpf = input.value.replace(/\D/g, '');
  
  // Remove classes anteriores
  input.classList.remove('campo-valido', 'campo-invalido');
  
  // Remove mensagem anterior se existir
  let mensagemExistente = input.parentElement.querySelector('.mensagem-validacao');
  if (mensagemExistente) {
    mensagemExistente.remove();
  }
  
  if (cpf.length === 11) {
    if (validarCPF(cpf)) {
      input.classList.add('campo-valido');
      const mensagem = document.createElement('small');
      mensagem.className = 'mensagem-validacao valido';
      mensagem.style.color = '#10b981';
      mensagem.style.fontSize = '0.875rem';
      mensagem.style.marginTop = '0.25rem';
      mensagem.style.display = 'block';
      input.parentElement.appendChild(mensagem);
    } else {
      input.classList.add('campo-invalido');
      const mensagem = document.createElement('small');
      mensagem.className = 'mensagem-validacao invalido';
      mensagem.style.color = '#ef4444';
      mensagem.style.fontSize = '0.875rem';
      mensagem.style.marginTop = '0.25rem';
      mensagem.style.display = 'block';
      input.parentElement.appendChild(mensagem);
    }
  }
}

// Aplicar máscara e validação ao CPF
const documentInput = document.getElementById('document');
if (documentInput) {
  // Múltiplos eventos para garantir funcionamento no mobile
  ['input', 'keyup', 'change'].forEach(evento => {
    documentInput.addEventListener(evento, function() {
      mascaraCPF(this);
    });
  });
  
  // Validação ao sair do campo
  documentInput.addEventListener('blur', function() {
    verificarCPF(this);
  });
  
  // Adiciona estilos CSS para feedback visual
  const style = document.createElement('style');
  style.textContent = `
    .campo-valido {
      border-color: #10b981 !important;
      background-color: #f0fdf4 !important;
    }
    .campo-invalido {
      border-color: #ef4444 !important;
      background-color: #fef2f2 !important;
    }
  `;
  document.head.appendChild(style);
}

// ===== VALIDAÇÃO DE RG =====
function validarRG(rg) {
  rg = rg.replace(/\D/g, '');
  
  // Verifica se tem entre 7 e 9 dígitos (padrões aceitos no Brasil)
  if (rg.length < 7 || rg.length > 9) return false;
  
  // Verifica se não são todos os dígitos iguais
  if (/^(\d)\1+$/.test(rg)) return false;
  
  return true;
}

// ===== MÁSCARA DE RG (Compatível com Mobile) =====
function mascaraRG(input) {
  let valor = input.value.replace(/\D/g, '');
  
  if (valor.length <= 9) {
    // Formato: 00.000.000-0
    valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1})$/, '$1-$2');
  }
  
  input.value = valor;
}

// ===== FEEDBACK VISUAL DE VALIDAÇÃO DO RG =====
function verificarRG(input) {
  const rg = input.value.replace(/\D/g, '');
  
  // Remove classes anteriores
  input.classList.remove('campo-valido', 'campo-invalido');
  
  // Remove mensagem anterior se existir
  let mensagemExistente = input.parentElement.querySelector('.mensagem-validacao');
  if (mensagemExistente) {
    mensagemExistente.remove();
  }
  
  if (rg.length >= 7) {
    if (validarRG(rg)) {
      input.classList.add('campo-valido');
      const mensagem = document.createElement('small');
      mensagem.className = 'mensagem-validacao valido';
      mensagem.style.color = '#10b981';
      mensagem.style.fontSize = '0.875rem';
      mensagem.style.marginTop = '0.25rem';
      mensagem.style.display = 'block';
      input.parentElement.appendChild(mensagem);
    } else {
      input.classList.add('campo-invalido');
      const mensagem = document.createElement('small');
      mensagem.className = 'mensagem-validacao invalido';
      mensagem.style.color = '#ef4444';
      mensagem.style.fontSize = '0.875rem';
      mensagem.style.marginTop = '0.25rem';
      mensagem.style.display = 'block';
      input.parentElement.appendChild(mensagem);
    }
  }
}

// Aplicar máscara e validação ao RG
const rgInput = document.getElementById('document_other');
if (rgInput) {
  // Múltiplos eventos para garantir funcionamento no mobile
  ['input', 'keyup', 'change'].forEach(evento => {
    rgInput.addEventListener(evento, function() {
      mascaraRG(this);
    });
  });
  
  // Validação ao sair do campo
  rgInput.addEventListener('blur', function() {
    verificarRG(this);
  });
}

// ===== MÁSCARA DE CEP =====
const cepInput = document.getElementById('cep');
if (cepInput) {
  ['input', 'keyup', 'change'].forEach(evento => {
    cepInput.addEventListener(evento, function() {
      let valor = this.value.replace(/\D/g, '');
      
      if (valor.length <= 8) {
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
      }
      
      this.value = valor;
    });
  });
}

// ===== VALIDAÇÃO DE IDADE (18+) =====
function validarIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade >= 18;
}

// ===== API VIACEP =====
if (cepInput) {
  cepInput.addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, ''); 
    
    if (cep.length === 8) {
      // Mostra mensagem de carregamento
      const ruaInput = document.getElementById('rua');
      const bairroInput = document.getElementById('bairro');
      const cidadeInput = document.getElementById('cidade');
      
      if (ruaInput) ruaInput.value = 'Carregando...';
      
      // Faz a requisição para o ViaCEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API');
          }
          return response.json();
        })
        .then(data => {
          if (!data.erro) {
            // Preenche os campos automaticamente
            if (ruaInput) ruaInput.value = data.logradouro || '';
            if (bairroInput) bairroInput.value = data.bairro || '';
            if (cidadeInput) cidadeInput.value = data.localidade || '';
            
            // Preenche estado se tiver o campo
            const estadoInput = document.getElementById('estado');
            if (estadoInput) {
              estadoInput.value = data.uf || '';
            }
            
            // Foca no campo número
            const numeroInput = document.getElementById('numero');
            if (numeroInput) numeroInput.focus();
          } else {
            alert('❌ CEP não encontrado!');
            if (ruaInput) ruaInput.value = '';
          }
        })
        .catch(error => {
          alert('❌ Erro ao buscar CEP. Verifique sua conexão e tente novamente.');
          console.error('Erro:', error);
          if (ruaInput) ruaInput.value = '';
        });
    }
  });
}

// ===== VALIDAÇÃO E SALVAMENTO DO FORMULÁRIO =====
const formulario = document.querySelector('form');
if (formulario) {
  formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    const camposObrigatorios = [
      { id: 'userName', label: 'Nome Completo' },
      { id: 'age', label: 'Data de Nascimento' },
      { id: 'document', label: 'CPF' },
      { id: 'email', label: 'Email' },
      { id: 'cep', label: 'CEP' },
      { id: 'rua', label: 'Rua' },
      { id: 'bairro', label: 'Bairro' },
      { id: 'numero', label: 'Número' },
      { id: 'cidade', label: 'Cidade' }
    ];
    
    const camposVazios = [];
    
    // Verifica quais campos estão vazios
    camposObrigatorios.forEach(campo => {
      const elemento = document.getElementById(campo.id);
      if (!elemento || !elemento.value.trim()) {
        camposVazios.push(campo.label);
      }
    });
    
    // Se houver campos vazios, mostra alerta
    if (camposVazios.length > 0) {
      alert('⚠️ Por favor, preencha os seguintes campos:\n\n• ' + camposVazios.join('\n• '));
      return;
    }
    
    // Validação de idade (18+)
    const dataNascimento = document.getElementById('age').value;
    if (!validarIdade(dataNascimento)) {
      alert('Não são permitidos cadastros de menores de 18 anos.');
      return;
    }
    
    // Validação de CPF completa
    const cpf = document.getElementById('document').value;
    if (!validarCPF(cpf)) {
      alert('CPF inválido! Verifique os dígitos digitados.');
      return;
    }
    
    // Validação de RG (se preenchido)
    const rgInput = document.getElementById('document_other');
    if (rgInput && rgInput.value.trim()) {
      if (!validarRG(rgInput.value)) {
        alert('RG inválido! Verifique os dígitos digitados.');
        return;
      }
    }
    
    // ===== SALVAR NO LOCALSTORAGE =====
    
    // Capturar foto (se existir preview, usa a foto, senão usa avatar padrão)
    const fotoPreview = document.getElementById('fotoPreview');
    const fotoSrc = fotoPreview && fotoPreview.src && fotoPreview.src.includes('data:') 
      ? fotoPreview.src 
      : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(document.getElementById('userName').value) + '&size=200&background=10b981&color=fff';
    
    // Criar objeto do usuário
    const usuario = {
      id: Date.now(), // ID único baseado em timestamp
      nome: document.getElementById('userName').value,
      dataNascimento: document.getElementById('age').value,
      cpf: document.getElementById('document').value,
      rg: document.getElementById('document_other') ? document.getElementById('document_other').value : '',
      email: document.getElementById('email').value,
      rua: document.getElementById('rua').value,
      numero: document.getElementById('numero').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado') ? document.getElementById('estado').value : '',
      cep: document.getElementById('cep').value,
      foto: fotoSrc,
      dataCadastro: new Date().toISOString()
    };
    
    // Buscar usuários existentes no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar se está editando um usuário existente
    const editandoId = localStorage.getItem('editandoUsuarioId');
    
    if (editandoId) {
      // Modo edição - atualiza o usuário existente
      const index = usuarios.findIndex(u => u.id === parseInt(editandoId));
      if (index !== -1) {
        usuario.id = parseInt(editandoId); // Mantém o ID original
        usuario.dataCadastro = usuarios[index].dataCadastro; // Mantém data de cadastro original
        usuarios[index] = usuario;
        alert('✅ Usuário atualizado com sucesso!');
      }
      localStorage.removeItem('editandoUsuarioId'); // Limpa o modo edição
    } else {
      // Modo novo cadastro - adiciona novo usuário
      usuarios.push(usuario);
      alert('✅ Cadastro realizado com sucesso!');
    }
    
    // Salvar no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Redirecionar para página de usuários
    window.location.href = './clientes.html';
  });
}

// ===== LIMPAR ARQUIVO AO RESETAR FORMULÁRIO =====
const botaoReset = document.querySelector('button[type="reset"]');
if (botaoReset) {
  botaoReset.addEventListener('click', function() {
    setTimeout(() => {
      // Limpa preview da foto
      const fotoPreview = document.getElementById('fotoPreview');
      const fotoPlaceholder = document.getElementById('fotoPlaceholder');
      
      if (fotoPreview) {
        fotoPreview.src = '';
        fotoPreview.style.display = 'none';
      }
      
      if (fotoPlaceholder) {
        fotoPlaceholder.style.display = 'block';
      }
      
      // Limpa o input de arquivo
      const fotoInput = document.getElementById('foto');
      if (fotoInput) {
        fotoInput.value = '';
      }
      
      // Remove mensagens de validação
      document.querySelectorAll('.mensagem-validacao').forEach(msg => msg.remove());
      
      // Remove classes de validação
      if (documentInput) documentInput.classList.remove('campo-valido', 'campo-invalido');
      if (rgInput) rgInput.classList.remove('campo-valido', 'campo-invalido');
    }, 0);
  });
}

// ===== CARREGAR DADOS PARA EDIÇÃO (SE ESTIVER EDITANDO) =====
window.addEventListener('DOMContentLoaded', function() {
  const editandoId = localStorage.getItem('editandoUsuarioId');
  
  if (editandoId) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.id === parseInt(editandoId));
    
    if (usuario) {
      // Preenche o formulário com os dados do usuário
      const userName = document.getElementById('userName');
      const age = document.getElementById('age');
      const documentCPF = document.getElementById('document');
      const documentRG = document.getElementById('document_other');
      const email = document.getElementById('email');
      const rua = document.getElementById('rua');
      const numero = document.getElementById('numero');
      const bairro = document.getElementById('bairro');
      const cidade = document.getElementById('cidade');
      const cep = document.getElementById('cep');
      
      if (userName) userName.value = usuario.nome;
      if (age) age.value = usuario.dataNascimento;
      if (documentCPF) {
        documentCPF.value = usuario.cpf;
        // Aplica máscara aos dados carregados
        mascaraCPF(documentCPF);
        verificarCPF(documentCPF);
      }
      if (documentRG && usuario.rg) {
        documentRG.value = usuario.rg;
        // Aplica máscara aos dados carregados
        mascaraRG(documentRG);
        verificarRG(documentRG);
      }
      if (email) email.value = usuario.email;
      if (rua) rua.value = usuario.rua;
      if (numero) numero.value = usuario.numero;
      if (bairro) bairro.value = usuario.bairro;
      if (cidade) cidade.value = usuario.cidade;
      if (cep) cep.value = usuario.cep;
      
      const estadoInput = document.getElementById('estado');
      if (estadoInput && usuario.estado) {
        estadoInput.value = usuario.estado;
      }
      
      // Carrega a foto
      const fotoPreview = document.getElementById('fotoPreview');
      const fotoPlaceholder = document.getElementById('fotoPlaceholder');
      
      if (fotoPreview && usuario.foto) {
        fotoPreview.src = usuario.foto;
        fotoPreview.style.display = 'block';
        if (fotoPlaceholder) {
          fotoPlaceholder.style.display = 'none';
        }
      }
      
      // Altera o título da página para indicar que está editando
      const titulo = document.querySelector('.Subtitulo-form');
      if (titulo) {
        titulo.textContent = '✏️ Editar Cadastro';
      }
      
      // Altera o texto do botão de submit
      const botaoSubmit = document.querySelector('button[type="submit"]');
      if (botaoSubmit) {
        botaoSubmit.textContent = '💾 Atualizar Cadastro';
      }
    }
  }
  //API com o site flatpickr para mudar o layout da data
    flatpickr("#age", {
    dateFormat: "Y-m-d",      // formato brasileiro
    locale: "pt",             // idioma português
    maxDate: "today",         // impede escolher datas futuras
    altInput: true,           // mostra a data formatada bonitinha
    altFormat: "d/m/Y",       // formato alternativo pro input visível
  });

});