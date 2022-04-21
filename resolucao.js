
function lerJSON(filePath){
    const fs = require('fs');
    try{
        const data = fs.readFileSync(filePath);
        var produtos = JSON.parse(data);
    }catch(e){
        console.log(e);
    }
    return produtos;
}

function concertaNomeJSON(){                                                                               
    var produtos = lerJSON('./broken-database.json');
    produtos.forEach(function(produto){
    var newString = produto.name.replace(/æ/g, "a");
    newString = newString.replace(/¢/g, "c");
    newString = newString.replace(/ø/g, "o");
    newString = newString.replace(/ß/g, "b");
    produto.name = newString;
    })
    return produtos;
}

function concertaPrecoJSON(produtos){
    var aux = '';
    produtos.forEach(function(produto){
        if(typeof produto.price == typeof aux){
            produto.price = Number(produto.price);
        }
    })
    return produtos;
}

function concertaQuantidadeJSON (produtos){
    produtos.forEach(function(produto){
        if(produtos.quantity == undefined){
            produto.quantity = 0;
        }
    })
    return produtos;
}

function exportaJSON(){
    const fs = require('fs');
    var produtos1 = concertaNomeJSON();
    var produtos2 = concertaPrecoJSON(produtos1);
    var produtosFinal = concertaQuantidadeJSON(produtos2);

    try{
        const saida = JSON.stringify(produtosFinal);
        fs.writeFileSync('./saida.json', saida);
    }catch(e){
        console.log(e);
    }
    console.log(produtosFinal);
}

function validaEstoque(){
    var produtos = concertaPrecoJSON();
    var produtosFinal = concertaQuantidadeJSON(produtos);
    console.log(produtosFinal);
    
    let w = 0, x = 0, y = 0, z = 0;
    produtos.forEach(function(produto){
        if(produto.category == 'Panelas'){
            w += produto.price * produto.quantity;
        }
        if(produto.category == 'Eletrodomésticos'){
            x += produto.price * produto.quantity;
        }
        if(produto.category == 'Eletrônicos'){
            y += produto.price * produto.quantity;
        }
        if(produto.category == 'Acessórios'){
            z += produto.price * produto.quantity;
        }
    })
    console.log('Valor do estoque das panelas:', w);
    console.log('Valor do estoque dos eletrodomésticos:', x);
    console.log('Valor do estoque dos eletrônicos:', y);
    console.log('Valor do estoque dos acessórios:', z);
}

exportaJSON();


