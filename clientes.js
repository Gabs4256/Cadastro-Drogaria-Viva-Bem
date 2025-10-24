// clientes.js - Script para a página de usuários

document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cardsContainer");
  const searchInput = document.getElementById("searchinput");
  const totalUsuariosSpan = document.getElementById("totalUsuarios");
  const mensagemVazia = document.getElementById("mensagemVazia");
  const mensagemBuscaVazia = document.getElementById("mensagemBuscaVazia");

  // Função para calcular idade a partir da data de nascimento
  function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    // Ajustar se ainda não fez aniversário este ano
    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  // Função para criar um card de usuário
  function criarCard(usuario) {
    const card = document.createElement("div");
    card.className = "user-card";

    const hoje = new Date();
    const nascimento = new Date(usuario.dataNascimento);
    const idade =
      hoje.getFullYear() -
      nascimento.getFullYear() -
      (hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() < nascimento.getDate())
        ? 1
        : 0);

    card.innerHTML = `
            <div class="user-photo">
            <img src="${usuario.foto}" alt="Foto de ${usuario.nome}">
        </div>
        <div class="user-info">
            <h3 class="user-name">${usuario.nome}</h3>
            <p class="itens-card">${idade} anos</p>
            <p class="itens-card">${usuario.cpf}</p>
            <p class="itens-card">${usuario.email}</p>
            <p class="itens-card">${usuario.rua}, ${usuario.bairro}, ${usuario.cidade}, ${usuario.numero}</p>
            
            <div class="card-actions">
                <button class="btn-edit">✏️ Editar</button>
                <button class="btn-delete">🗑️ Excluir</button>
            </div>
        </div>


    `;
    card
      .querySelector(".btn-edit")
      .addEventListener("click", () => editarUsuario(usuario.id));
    card
      .querySelector(".btn-delete")
      .addEventListener("click", () => excluirUsuario(usuario.id));

    return card;
  }

  // Função para carregar e exibir todos os usuários
  function carregarUsuarios(filtro = "") {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    cardsContainer.innerHTML = "";
    mensagemVazia.style.display = "none";
    mensagemBuscaVazia.style.display = "none";

    if (usuarios.length === 0) {
      mensagemVazia.style.display = "block";
      totalUsuariosSpan.textContent = "0";
      return;
    }

    // Filtrar usuários
    const usuariosFiltrados = usuarios.filter((usuario) => {
      const termo = filtro.toLowerCase();
      return (
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.cpf.includes(termo)
      );
    });

    // Atualizar contador
    totalUsuariosSpan.textContent = usuariosFiltrados.length;

    if (usuariosFiltrados.length === 0) {
      mensagemBuscaVazia.style.display = "block";
      return;
    }

    // Criar cards
    usuariosFiltrados.forEach((usuario) => {
      const card = criarCard(usuario);
      cardsContainer.appendChild(card);
    });
  }

  // Função para excluir usuário
  window.excluirUsuario = function (id) {
    if (
      confirm(
        "Tem certeza que deseja excluir este usuário?\n\nEsta ação não pode ser desfeita."
      )
    ) {
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios = usuarios.filter((usuario) => usuario.id !== id);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      carregarUsuarios(searchInput.value);
      alert("✅ Usuário excluído com sucesso!");
    }
  };

  // Função para editar usuário (redireciona para página de cadastro com dados preenchidos)
  window.editarUsuario = function (id) {
    // Salvar ID do usuário a ser editado
    localStorage.setItem("editandoUsuarioId", id);
    window.location.href = "./index.html";
  };

  // Event listener para busca
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      carregarUsuarios(e.target.value);
    });
  }

  // Carregar usuários ao iniciar
  carregarUsuarios();
});
