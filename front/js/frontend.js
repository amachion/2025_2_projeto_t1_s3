const protocolo = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  //posicionar sobre o elemento tabela pela sua classe filmes
  let tabela = document.querySelector(".filmes");
  //posicionar sobre o corpo da tabela pela sua tag
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  //para cada filme na lista de filmes, criar uma linha nova
  for (let filme of filmes) {
    let linha = corpoTabela.insertRow(0);
    let celulaTitulo = linha.insertCell(0);
    let celulaSinopse = linha.insertCell(1);
    celulaTitulo.innerHTML = filme.titulo;
    celulaSinopse.innerHTML = filme.sinopse;
  }
}

async function cadastrarFilme() {
  const filmesEndpoint = "/filmes";
  //montar a URL
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  //pegar os dados que o usuário digitou
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;

  if (titulo && sinopse) {
    //limpa as caixinhas de input
    tituloInput.value = "";
    sinopseInput.value = "";
    //requisição post para o back, que devolve a lista de filmes atualizada
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;
    //limpa o corpo da tabela
    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";
    //remontando a tabela
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0);
      let celulaTitulo = linha.insertCell(0);
      let celulaSinopse = linha.insertCell(1);
      celulaTitulo.innerHTML = filme.titulo;
      celulaSinopse.innerHTML = filme.sinopse;
    }
  }
  else {
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
    }, 2000)
  }
}
async function cadastrarUsuario() {
  //obter os dados digitados pelo usuário
  //1. posicionar nos inputs
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  //2. pega os valores das caixinhas
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    try {
      //0. limpar as caixinhas
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""
      //1. montar a URL
      const cadastroEndpoint = '/signup'
      const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
      //2. envia a requisição
      await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro})
      //3. emite mensagem de sucesso no alert
      let alert = document.querySelector('.alert-modal-cadastro')
      alert.innerHTML = "Usuário cadastrado com sucesso!!!"
      alert.classList.add('show', 'alert-success')
      alert.classList.remove('d-none', 'alert-danger')
      setTimeout(() => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
        //4. esconder o modal
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"))
        modalCadastro.hide()
      }, 2000)
    }
    catch (erro) {

    }
  }
  else {
    //exibe alerta para o usuário digitar tudo
    let alert = document.querySelector('.alert-modal-cadastro')
    alert.innerHTML = "Preencha todos os campos!!!"
    alert.classList.add('show', 'alert-danger')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.add('d-none')
      alert.classList.remove('show')
    }, 2000)
  }
  
}