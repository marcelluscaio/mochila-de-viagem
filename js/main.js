const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento)
});

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);    
    novoItem.innerHTML += item.nome; //(Testar)
    novoItem.appendChild(criaBotaoDeleta(item.id));
    lista.appendChild(novoItem);
}

function criaBotaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });
    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    console.log(evento.target);
    console.log(evento.target.elements);
    const existe = itens.find( elemento => elemento.nome === nome.value );
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    if (existe) {
        itemAtual.id = existe.id;        
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; 
    } else {
        itemAtual.id = itens.length>0 ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    };
    localStorage.setItem("itens", JSON.stringify(itens));
    nome.value = "";
    quantidade.value = "";
});

function atualizaElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
};