
/* MODAL */
let overlayModal = document.querySelector(".overlay-modal");
let logar = document.querySelector("#botao-blue");
let input_nome = document.querySelector("#nome-usuario")

logar.addEventListener("click", function () {
  overlayModal.classList.add("active");
  login()
})

/*  LOGIN */
function login(){
  let navegador = document.querySelector("nav")
  let usuario = document.querySelector(".usuario")

  usuario.textContent = input_nome.value
  navegador.appendChild(usuario)
}

/* FORMULÁRIO DE MENSAGEM */
let form_mensagem = document.querySelector(".adicionar-mensagem")
let input_mensagem = document.querySelector(".adicionar-mensagem #mensagem")

let botao_mensagem = document.querySelector(".adicionar-mensagem #botao-mensagem")


/* GRUPOS */
let id_grupo

/* CRIAÇÃO DE UM GRUPO*/
function postGroupAndUpdate(id, nome) {
  axios({
    method: "POST",
    url: "https://server-json-lms.herokuapp.com/grupos",
    data: {
      id: id,
      nome: nome
    }
  }).then((response) => {
    atualizarList()
  }).catch((error) => {
    console.log(error)
  })
}

/*CRIAÇÃO DE UMA LISTA DE GRUPOS*/
let containerChat = document.querySelector(".container-chat")
let mensagens = document.querySelector(".mensagens")

function criarLista(id, nome) {
  let containerGroup = document.createElement("div")
  containerGroup.classList.add("list-group")

  let listGroup = document.createElement("div")
  listGroup.classList.add("grupos")

  let itemList = document.createElement("div")
  let imgGroup = document.createElement("img")
  let span = document.createElement("span")

  itemList.appendChild(imgGroup)
  imgGroup.src = '../imagens/icon-group.png'

  itemList.appendChild(imgGroup)
  itemList.appendChild(span)
  span.textContent = nome
  listGroup.appendChild(itemList)

  let linha = document.createElement("hr")
  listGroup.appendChild(linha)

  containerGroup.appendChild(listGroup)
  containerChat.appendChild(containerGroup)

  listGroup.onclick = () => listarMensagem(id)

  return containerGroup
}

/* LISTAGEM E RENDERIZAÇÃO DE GRUPO */
function getGroupAndRender(grupo) {
  axios({
    method: "GET",
    url: "https://server-json-lms.herokuapp.com/grupos",
  }).then((response) => {
    let lista = criarLista(grupo.id, grupo.nome)
    containerChat.appendChild(lista)
  }).catch((error) => {
    console.log(error)
  })
}

/* FUNÇÃO DE ATUALIZAR UM GRUPO */
function atualizarList() {
  containerChat.innerHTML = ""
  axios({
    method: "GET",
    url: "https://server-json-lms.herokuapp.com/grupos",
  }).then((response) => {
    let grupos = response.data
    for (let grupo of grupos) {
      getGroupAndRender(grupo)
    }
  }).catch((error) => {
    console.log(error)
  })
}

atualizarList()

/* FUNÇÃO DE CRIAÇÃO DE UM GRUPO A PARTIR DA AÇÃO DO FORMULÁRIO DE CRIAR NOVO GRUPO */
let form_novo_todo = document.getElementById("form-novo-grupo")
let input_form_titulo = document.querySelector("#form-novo-grupo #grupo")

form_novo_todo.addEventListener("submit", (event) => {
  event.preventDefault()
  axios({
    method: "POST",
    url: "https://server-json-lms.herokuapp.com/grupos",
    data: {
      nome: input_form_titulo.value,
    }
  }).then((response) => {
    atualizarList(response)
  }).catch((error) => {
    console.log(error)
  })
})

/**
 *  Mensagens
 */

/* FUNÇÃO DE CRIAR E LISTAR UMA MENSAGEM */
function criarMensagem(mensagens) {
  let container_mensagens = document.querySelector(".mensagens")
  container_mensagens.innerHTML = ""

  for (let mensagem of mensagens) {
    let mensagem_div = document.createElement("div")
    mensagem_div.classList.add("mensagem")

    let lista_mensagens = document.createElement("ul")
    let item_mensagem = document.createElement("li")

    let nome_usuario = document.createElement("span")
    nome_usuario.textContent = mensagem.nome
    item_mensagem.appendChild(nome_usuario)

    let corpo = document.createElement("p")
    corpo.textContent = mensagem.corpo
    item_mensagem.appendChild(corpo)


    lista_mensagens.appendChild(item_mensagem)
    mensagem_div.appendChild(lista_mensagens)

    container_mensagens.appendChild(mensagem_div)
  }
}

/* FUNÇÃO DE LISTAR MENSAGENS A PARTIR DE UM GRUPO */
function listarMensagem(id) {
  id_grupo = id

  axios({
    method: "GET",
    url: "https://server-json-lms.herokuapp.com/grupos/" + id + "/mensagens",

  }).then((response) => {
    criarMensagem(response.data)
  }).catch((error) => {
    console.log(error);
  })
}

/* FUNÇÃO DE AÇÃO PARA CRIAR UMA MENSAGEM A PARTIR DO FORMULÁRIO DE CRIAÇÃO DE UMA MENSAGEM */
form_mensagem.addEventListener("submit", (event) => {
  event.preventDefault()
  axios({
    method: "POST",
    url: "https://server-json-lms.herokuapp.com/mensagens",
    data: {
      nome: input_nome.value,
      corpo: input_mensagem.value,
      grupoId: id_grupo
    }
  }).then((response) => {
    listarMensagem(id_grupo)
  }).catch((error) => {
    console.log(error);
  })
})