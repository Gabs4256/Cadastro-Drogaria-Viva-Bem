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

// ===== MÁSCARA DE CPF =====
function mascaraCPF(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
  
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  input.value = valor;
}

// Aplicar máscara ao digitar no CPF
const documentInput = document.getElementById('document');
if (documentInput) {
  documentInput.addEventListener('input', function() {
    mascaraCPF(this);
  });
}

// ===== MÁSCARA DE RG =====
const rgInput = document.getElementById('document_other');
if (rgInput) {
  rgInput.addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length <= 9) {
      valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
    }
    this.value = valor;
  });
}

// ===== MÁSCARA DE CEP =====
const cepInput = document.getElementById('cep');
if (cepInput) {
  cepInput.addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    
    if (valor.length <= 8) {
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    this.value = valor;
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
      alert('❌ Não são permitidos cadastros de menores de 18 anos.');
      return;
    }
    
    // Validação de CPF (formato básico - 11 dígitos)
    const cpf = document.getElementById('document').value;
    if (cpf.replace(/\D/g, '').length !== 11) {
      alert('❌ CPF inválido! Digite os 11 dígitos.');
      return;
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
      if (documentCPF) documentCPF.value = usuario.cpf;
      if (documentRG && usuario.rg) documentRG.value = usuario.rg;
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
});