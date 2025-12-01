const API_URL = "http://localhost:3000/usuarios";

// botão de criar postagem

const bt = document.getElementById("bt");
const modal = document.getElementById("modal-overlay");

bt.addEventListener("click", ()=> {
    modal.classList.add("active");
})

modal.addEventListener("click", (e)=> {
    if(e.target === modal){
        modal.classList.remove("active");
    }
})

async function CarregarPosts() {
    const resposta = await fetch(API_URL);
    const posts = await resposta.json();

    const container = document.querySelector(".imagens");
    container.innerHTML = ""; // limpa as publicações existentes

    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("imagem");
        div.dataset.id = post.id;

        div.innerHTML = `
            <img src="${post.url}" alt="" class="a">

            <h4><b>${post.titulo}</b></h4>

            <p class="esp">${post.mensagem}</p>
            <p class="esp">🗓️ ${post.data} • 👤 ${post.autor}</p>

            <div class="edit">
                <button class="opc">Editar 🖉</button>
                <button class="opc2">Excluir 🖉</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// Envio do formulário
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const titulo = document.getElementById("tile").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const url = document.getElementById("url").value.trim();
    const assunto = document.getElementById("assunto").value.trim();


    const novoPost = {
      titulo,
      mensagem: assunto,
      url,
      autor: nome,
      categoria,
      data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoPost)
    });

    modal.classList.remove("active");
    form.reset();
    CarregarPosts();
  });
}

// Carrega os posts ao abrir a página
CarregarPosts();

// botão de carregar mais posts
const botaoMais = document.getElementById("maisPosts");
let maximo = 3;

function MaximoPosts() {
    // seleciona TODOS os posts reais que existem no HTML
    const posts = document.querySelectorAll(".imagens .imagem");

    posts.forEach((post, index) => {
        if (index < maximo) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });

    // se ainda tem posts escondidos → mostra o botão
    if (maximo < posts.length) {
        botaoMais.style.display = "block";
    } else {
        botaoMais.style.display = "none";
    }
}

botaoMais.addEventListener("click", () => {
    maximo += 3;  // mostra mais 3
    MaximoPosts();
});

// chama a função logo no início
MaximoPosts();


// botão de editar postagem

const nomedt = document.getElementById("nomedt");
const title = document.getElementById("title");
const categoriaedt = document.getElementById("categoriaedt");
const urledt = document.getElementById("urledt");
const edtassunto = document.getElementById("edtassunto");

let currentPost = null;

edtmodaloverlay.addEventListener("click", (e)=> {
    if(e.target === edtmodaloverlay){
        edtmodaloverlay.classList.remove("active");
        currentPost = null;
    }
})

 //botao de excluir
const btnExcluir = document.createElement("botton");
btnExcluir.textcontent = "Excluir";
btnExcluir.classList.add("opc");

btnExcluir.onclink = () => {
    if(confirm("tem certeza que deseja excluir?")){
        excluirPost(post.id);
    }
};
div.appendChild(btnExcluir);

let post = []; // exemplo

async function excluirPost(id) {
    await fetch('$API_URL}/${id}',{
        method:"delete"
    });
    CarregarPosts(); //atualizar a lista na tela
    
}
