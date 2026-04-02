let btnEnviar = document.getElementById("btnEnviar");
let nome = document.getElementById("nome");
let telefone = document.getElementById("telefone");
let btnDark = document.getElementById("btnDark");
let cpf = document.getElementById("cpf");
let idade = document.getElementById("idade");
let email = document.getElementById("email");
let listaExibicao = document.getElementById("listaConfirmado"); // Essa é a sua UL

btnEnviar.addEventListener("click", criarCadastro);

function criarCadastro(event) {
  // Adicione 'event' aqui dentro dos parênteses
  event.preventDefault();

  // Validação
  if (
    nome.value == "" ||
    idade.value == "" ||
    cpf.value == "" ||
    email.value == "" ||
    telefone.value == ""
  ) {
    alert("Para realizar o cadastro é necessário preencher todos os campos.");
    return;
  }

  // Criar o item da lista
  let li = document.createElement("li");
  li.innerHTML = `
        <strong>Nome:</strong> ${nome.value} | <strong>Idade:</strong> ${idade.value} | <strong>CPF:</strong> ${cpf.value} <br> 
        <strong>Email:</strong> ${email.value} | <strong>Telefone:</strong> ${telefone.value} 
        <button onclick="removerConfirmado(this)" class="btnRemove">Remover</button>
    `;
  listaExibicao.appendChild(li);

  nome.value = "";
  idade.value = "";
  cpf.value = "";
  email.value = "";
  telefone.value = "";
}


function removerConfirmado(botao) {
  botao.parentElement.remove();
}

btnDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    nome.value = "";
    idade.value = "";
    cpf.value = "";
    email.value = "";
    telefone.value = "";
  }
});
