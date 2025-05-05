const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let modalQt = 1;
let modalKey = 0;
let cart = [];
/*Abertura da Listagem das Pizzas*/
pizzaJson.forEach((pizza, pizzaIndex) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
  /*Abertura da Adição da Variável Para a Listagem das Pizzas*/
  pizzaItem.setAttribute("data-key", pizzaIndex);
  /*Fechamento da Adição da Variável Para a Listagem das Pizzas*/
  pizzaItem.querySelector(".pizza-item--img img").src = pizza.img;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = pizza.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = pizza.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${pizza.price.toFixed(2)}`;
  /*Fechamento da Listagem das Pizzas*/
  /*Abertura do Modal e Aicionando um Evento de Clique */
  pizzaItem.querySelector("a").onclick = (e) => {
    e.preventDefault();
    /*Abertura do Recebimento a Variável da Listagem das Pizzas */
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    /*Fechamento do Recebimento da Variável da Listagem das Pizzas */
    modalKey = key;

    document.querySelector(".pizzaBig img").src = pizzaJson[key].img;
    document.querySelector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    document.querySelector(".pizzaInfo--desc").innerHTML =
      pizzaJson[key].description;
    document.querySelector(
      ".pizzaInfo--actualPrice"
    ).innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    /*Abertura da Remoção da classe de Seleção dos Tamanhos das Pizzas*/
    document
      .querySelector(".pizzaInfo--size.selected")
      .classList.remove("selected");
    /*Fechamento da Remoção da classe de Seleção dos Tamanhos das Pizzas*/
    /*Abetura da Adição de Tamanhos das Pizzas no modal*/
    document
      .querySelectorAll(".pizzaInfo--size")
      .forEach((sizePizza, sizeIndex) => {
        if (sizeIndex === 2) {
          sizePizza.classList.add("selected");
        }
        sizePizza.querySelector("span").innerHTML =
          pizzaJson[key].sizes[sizeIndex];
      });
    /*Fechamento da Adição de Tamanhos das Pizzas no modal*/
    modalQt = 1;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;

    let modal = document.querySelector(".pizzaWindowArea");
    modal.style.opacity = 0;
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.opacity = 1;
    }, 100);
  };
  /*Fechamento do Modal*/
  document.querySelector(".pizza-area").appendChild(pizzaItem);
});
/*Fechamento da Listagem das Pizzas*/
/*Função de Fechamento do modal*/
function closeModal() {
  document.querySelector(".pizzaWindowArea").opacity = 0;
  setTimeout(() => {
    document.querySelector(".pizzaWindowArea").style.display = "none";
  }, 100);
}
/*Final da Função de Fechamento do modal*/
/*Adicionando a Função de Fechamento do Modal*/
document
  .querySelectorAll(".pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton")
  .forEach((item) => {
    item.addEventListener("click", closeModal);
  });
/*Fechamento da Adição de Fechamento do Modal*/
/*Abertura de Adição de um Evento de Clique no Botão de Menos(Quantidade)*/
document.querySelector(".pizzaInfo--qtmenos").onclick = () => {
  if (modalQt > 1) {
    modalQt--;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  }
};
/*Fechamento da Adição de um Evento de Clique no Botão de Menos(Quantidade)*/
/*Abertura de Adição de um Evento de Clique no Botão de Mais(Quantidade)*/
document.querySelector(".pizzaInfo--qtmais").onclick = () => {
  modalQt++;
  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
};
/*Fechamento da Adição de um Evento de Clique no Botão de Mais(Quantidade)*/
/*Abertura da Seleção dos Tamanhos das Pizzas */
document.querySelectorAll(".pizzaInfo--size").forEach((sizeItem) => {
  sizeItem.onclick = (e) => {
    document
      .querySelector(".pizzaInfo--size.selected")
      .classList.remove("selected");
    sizeItem.classList.add("selected");
  };
});
/*Fechamento da Seleção dos Tamanhos das Pizzas */
/*Abertura da Função de Clique no botão de Adicionar no Carrinho*/
document.querySelector(".pizzaInfo--addButton").onclick = () => {
  let size = parseInt(
    document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key")
  );
  /*Abertura de Criação de uma Variável de Identificação no Carrinho*/
  let indentifier = pizzaJson[modalKey].id + "+" + size;
  let keyCart = cart.findIndex((item) => {
    return item.indentifier === indentifier;
  });
  /*Fechamento de Criação de uma Variável de Identificação no Carrinho*/
  /*Abertura da Condição da Variável do Identificador*/
  if (keyCart > -1) {
    cart[keyCart].qt += modalQt;
  } else {
    cart.push({
      indentifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt,
    });
  }
  /*Fechamento da Condição da Variável do Identificador*/
  updateCart();
  closeModal();
};
/*Fechamento da Função de Clique no botão de Adicionar no Carrinho*/
/*Abertura da Função de Atualizar o Carrinho*/
function updateCart() {
  let subTotal = 0;
  let total = 0;
  let entrega = 5;
  document.querySelector(".menu-openner span").innerHTML = cart.length;
  if (cart.length > 0) {
    document.querySelector(".cart").innerHTML = "";
    document.querySelector("aside").classList.add("show");
    document.querySelector("aside").style.opacity = 1;
    /*Abertura do Loop para dentro do Array cart */
    for (let i in cart) {
      /*Abertura da Função Find Para Achar e igualar o id do pizzaJson ao id do cart*/
      let pizzaCart = pizzaJson.find((item) => {
        return item.id === cart[i].id;
      });
      /*Fechamento da Função Find Para Achar e igualar o id do pizzaJson ao id do cart*/
      subTotal += pizzaCart.price * cart[i].qt;
      console.log(subTotal);
      /*Abertura da Listagem das Pizzas no Carrinho*/
      let cartItem = document
        .querySelector(".models .cart--item")
        .cloneNode(true);

      let pizzaCartSize;
      switch (cart[i].size) {
        case 0:
          pizzaCartSize = "Pequena";
          break;
        case 1:
          pizzaCartSize = "Média";
          break;
        case 2:
          pizzaCartSize = "Grande";
          break;
      }

      let pizzaName = `${pizzaCart.name} (${pizzaCartSize})`;
      cartItem.querySelector("img").src = pizzaCart.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
      cartItem.querySelector(".cart--item-qtmenos").onclick = () => {
        if (cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
        }
        updateCart();
      };
      cartItem.querySelector(".cart--item-qtmais").onclick = () => {
        cart[i].qt++;
        updateCart();
      };

      document.querySelector(".cart").append(cartItem);
      /*Fechamento da Listagem das Pizzas no Carrinho*/
    }

    total = subTotal + entrega;
    document.querySelector(
      ".subtotal span:last-child"
    ).innerHTML = `R$ ${subTotal.toFixed(2)}`;
    document.querySelector(
      ".desconto span:last-child"
    ).innerHTML = `R$ ${entrega.toFixed(2)}`;
    document.querySelector(
      ".total span:last-child"
    ).innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    document.querySelector("aside").classList.remove("show");
    document.querySelector("aside").style.left = "100vw";
  }
}
/*Fechamento da Função de Atualizar o Carrinho*/

document.querySelector(".menu-openner").onclick = () => {
  if (cart.length > 0) {
    document.querySelector("aside").style.left = "0vw";
  }
};
document.querySelector(".menu-closer").onclick = () => {
  document.querySelector("aside").style.left = "100vw";
};
