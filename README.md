

## Cadastro Farmácia Viva Bem 💊🧴

  ## Sobre o projeto 🩺

O Farmácia Viva Bem é meu primeiro projeto desenvolvido totalmente do zero, sem o uso de protótipos no Figma, com o objetivo de aprimorar meus conhecimentos em HTML, CSS e JavaScript.
O sistema simula o cadastro de clientes de uma farmácia, permitindo adicionar, editar, remover e pesquisar clientes de forma prática e intuitiva.
Esse projeto representa uma etapa importante no meu aprendizado em desenvolvimento web, focando em estruturação de layout, validação de formulários e manipulação do DOM.


## Referência 🔗

 - [Grupo Alura](https://www.alura.com.br/sobre?srsltid=AfmBOorMCSxr4i_clra7jN_L4UNwurbl_dhSIWkrAZE83t4jWuLmu6xD)
 - [Documentação MDN JS](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 - [Claude.AI](https://claude.ai/)
 - [flatpickr](https://flatpickr.js.org/)


## Documentação 📚

[Deploy do Projeto](https://cadastro-drogaria-viva-bem.vercel.app/)

O projeto Farmácia Viva Bem foi desenvolvido com o intuito de consolidar meus aprendizados em HTML, CSS e JavaScript, criando do zero um sistema funcional de cadastro de clientes para uma farmácia.
Durante o desenvolvimento, foram aplicados diversos conceitos e práticas importantes que contribuíram para o aprimoramento técnico e lógico do projeto.

🧠 Principais aprendizados e funcionalidades implementadas

Validações com JavaScript:
Implementamos verificações para garantir que todos os campos fossem preenchidos corretamente e que apenas clientes com 18 anos ou mais pudessem ser cadastrados, seguindo as regras da farmácia.

Máscaras e validações de documentos (CPF e RG):
Criamos máscaras dinâmicas para formatação automática dos campos de CPF e RG, garantindo que os dados fossem inseridos corretamente.

 - CPF: foi aplicada uma validação matemática baseada no algoritmo de dígitos verificadores, que calcula os dois últimos dígitos a partir dos nove primeiros números, assegurando que o CPF informado seja válido.

 - RG: implementamos uma verificação que aceita de 7 a 9 dígitos (de acordo com o padrão de cada estado brasileiro) e impede o uso de números repetidos, evitando registros inválidos como “11111111”.

Integração com API ViaCEP:
Utilizamos a API pública do ViaCEP para preencher automaticamente os campos de endereço, rua e bairro, simplificando o processo de cadastro — o usuário precisa apenas informar o número do endereço para finalizar.

Personalização do calendário (Flatpickr):
Substituímos o calendário padrão do HTML por um modelo customizado com o Flatpickr, adaptando as cores para o tema verde da farmácia e alterando a linguagem para português, tornando a interface mais amigável.

Criação dinâmica de cards:
Todos os clientes cadastrados são exibidos em cards gerados dinamicamente com JavaScript, contendo as informações fornecidas e permitindo edição ou exclusão a qualquer momento.

Avatar personalizado do cliente:
O sistema permite que o cliente envie uma foto de perfil. Caso o usuário não adicione uma imagem, o sistema gera automaticamente um avatar com as iniciais do nome, facilitando a identificação visual nos cadastros.

Responsividade completa:
O site foi projetado para ser totalmente responsivo, adaptando-se a diferentes dispositivos.
Para celulares, foi desenvolvido um layout slim e intuitivo, enquanto em tablets e desktops o design prioriza o aproveitamento do espaço e a organização das informações.

