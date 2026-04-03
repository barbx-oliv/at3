// Declaração das variaveis e pelo getElemntById ele procura o id no HTML
let btnEnviar = document.getElementById("btnEnviar");
let nome = document.getElementById("nome");
let telefone = document.getElementById("telefone");
let btnDark = document.getElementById("btnDark");
let cpf = document.getElementById("cpf");
let idade = document.getElementById("idade");
let email = document.getElementById("email");
let listaExibicao = document.getElementById("listaConfirmado");


window.onload = () => { // Ele avisa o navegador que quando carregar a página, para executar o comando 
    const salvos = JSON.parse(localStorage.getItem("convidados")) || []; 
    // Utilizei na atividade seletiva! Ele vai buscar os dados que estão salvos com o nome "convidades"
    // Como os dados estão como string, o parse vai transformar de volta em uma lista de objetos!
    // E se não tiver nada salvo, ele cria uma lista vazia para nao ocorrer nenhum erro ou algo do tipo
    salvos.forEach(c => renderizarConvidado(c));
    // Para cada "convidado" na lista, ele chama a função para desenha-lo na tela
};

btnEnviar.addEventListener("click", criarCadastro);

function criarCadastro(event) {
    event.preventDefault(); // Impede o navegador de recarregar a página quando envia o cadastro

    // Verificação se algum dos campos está vazio 
    if (nome.value == "" || idade.value == "" || cpf.value == "" || email.value == "" || telefone.value == "") {
        alert("Para realizar o cadastro é necessário preencher todos os campos.");
        return; 
    }

    const novoConvidado = { // Cria um obj com todas as informações do convidade
        id: Date.now(), // Ele vai criar um ID unico para cada novoConvidado baseado nos milissegundos, evitando a exclusão de pessoas com mesmo nome
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value
    };

    // Salva no LocalStorage
    const listaAtual = JSON.parse(localStorage.getItem("convidados")) || [];
    listaAtual.push(novoConvidado); // Adiciona o novo obj na lista
    localStorage.setItem("convidados", JSON.stringify(listaAtual)); 
    // Esta avisando que é para guardar os dados em "convidados" e tranforma a lista (array) em texto (string)

    renderizarConvidado(novoConvidado); // cria para a lista "convidados"

    nome.value = ""; idade.value = ""; cpf.value = ""; email.value = ""; telefone.value = ""; // limpa os campos
}

function renderizarConvidado(convidado) {
    let li = document.createElement("li"); // Cria uma ta <li>
    li.setAttribute("data-id", convidado.id); // Coloca o <li> com a ID criada no Date.Now()
    // Insere o HTML e as variáveis dentro do <li>
    li.innerHTML = `
        <div class="infoConvidado">
            <p><strong>Nome:</strong> ${convidado.nome}</p>
            <p><strong>Idade:</strong> ${convidado.idade} | <strong>CPF:</strong> ${convidado.cpf}</p>
            <p><strong>Email:</strong> ${convidado.email}</p>
            <p><strong>Tel:</strong> ${convidado.telefone}</p>
        </div>
        <button onclick="removerConfirmado(this)" class="btnRemove">Remover</button>
    `;
    listaExibicao.appendChild(li); // Coloca o <li> criado dentro da <ul>
}

function removerConfirmado(botao) {
    const li = botao.parentElement; // Procura pela tag <li> para apagar
    const idParaRemover = li.getAttribute("data-id"); // Procura pelo ID atribuido ao <li> para apagar o correto 

    let listaAtual = JSON.parse(localStorage.getItem("convidados")) || []; // Pega  o texto, transforma em array e coloca na listaAtual
    listaAtual = listaAtual.filter(c => c.id != idParaRemover); // Ele faz um filtro de quais IDs são diferentes daquele que vai ser apagado e mantem eles.
    localStorage.setItem("convidados", JSON.stringify(listaAtual)); // Atualiza a lista sem o ID apagado 

    li.remove(); // Remove o <li> que foi apagado da lista
}

// Se a classe "dark-mode" não estiver no body, o comando adiciona ela
// Agora se já estiver, ele remove ela
// Toggle significa alterar ou inverter 
btnDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); 
});
