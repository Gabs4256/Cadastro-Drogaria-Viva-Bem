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
document.getElementById('document').addEventListener('input', function() {
  mascaraCPF(this);
});

// ===== MÁSCARA DE CEP =====
document.getElementById('cep').addEventListener('input', function() {
  let valor = this.value.replace(/\D/g, '');
  
  if (valor.length <= 8) {
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  this.value = valor;
});

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
document.getElementById('cep').addEventListener('blur', function() {
  const cep = this.value.replace(/\D/g, ''); 
  
  if (cep.length === 8) {
    // Faz a requisição para o ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          // Preenche os campos automaticamente
          document.getElementById('rua').value = data.logradouro || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('cidade').value = data.localidade || '';
          
          // Foca no campo número
          document.getElementById('numero').focus();
        } else {
          alert('CEP não encontrado!');
        }
      })
      .catch(error => {
        alert('Erro ao buscar CEP. Verifique sua conexão.');
        console.error('Erro:', error);
      });
  }
});

// ===== MOSTRAR NOME DO ARQUIVO SELECIONADO =====
document.getElementById('foto').addEventListener('change', function(e) {
  const fileName = e.target.files[0]?.name || '';
  
  // Cria um elemento para mostrar o nome do arquivo se não existir
  let fileNameDisplay = document.getElementById('fileNameDisplay');
  if (!fileNameDisplay) {
    fileNameDisplay = document.createElement('span');
    fileNameDisplay.id = 'fileNameDisplay';
    fileNameDisplay.style.color = '#666';
    fileNameDisplay.style.fontSize = '14px';
    fileNameDisplay.style.fontStyle = 'italic';
    fileNameDisplay.style.marginTop = '8px';
    this.parentElement.appendChild(fileNameDisplay);
  }
  
  fileNameDisplay.textContent = fileName ? `Arquivo selecionado: ${fileName}` : '';
});

// ===== VALIDAÇÃO DO FORMULÁRIO =====
document.querySelector('form').addEventListener('submit', function(e) {
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
    if (!elemento.value.trim()) {
      camposVazios.push(campo.label);
    }
  });
  
  // Se houver campos vazios, mostra alerta
  if (camposVazios.length > 0) {
    alert('Por favor, preencha os seguintes campos:\n\n• ' + camposVazios.join('\n• '));
    return;
  }
  
  // Validação de idade (18+)
  const dataNascimento = document.getElementById('age').value;
  if (!validarIdade(dataNascimento)) {
    alert('Não são permitidos cadastros de menores de 18 anos.');
    return;
  }
  
  // Validação de CPF (formato básico - 11 dígitos)
  const cpf = document.getElementById('document').value;
  if (cpf.replace(/\D/g, '').length !== 11) {
    alert('CPF inválido! Digite os 11 dígitos.');
    return;
  }
  
  // Se passou por todas as validações
  alert('✅ Formulário válido! Cadastro realizado com sucesso!');
  
  // Aqui você pode enviar os dados para o servidor
  // Descomente a linha abaixo para realmente enviar o formulário:
  // this.submit();
});

// ===== LIMPAR ARQUIVO AO RESETAR FORMULÁRIO =====
document.querySelector('button[type="reset"]').addEventListener('click', function() {
  setTimeout(() => {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (fileNameDisplay) {
      fileNameDisplay.textContent = '';
    }
  }, 0);
});