
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
    });
    return produtos;
}

function concertaPrecoJSON(produtos){
    var aux = '';
    produtos.forEach(function(produto){
        if(typeof produto.price == typeof aux){
            produto.price = Number(produto.price);
        }
    });
    return produtos;
}

function concertaQuantidadeJSON (produtos){
    produtos.forEach(function(produto){
        if(produto.quantity == undefined){
            produto.quantity = 0;
        }
    });
    return produtos;
}

function exportaJSON(){
    console.log('JSON exportado:');
    const fs = require('fs');
    var produtos1 = concertaNomeJSON();
    var produtos2 = concertaQuantidadeJSON(produtos1);
    var produtosFinal = concertaPrecoJSON(produtos2);

    try{
        const saida = JSON.stringify(produtosFinal);
        fs.writeFileSync('./saida.json', saida);
    }catch(e){
        console.log(e);
    }
    console.log(produtosFinal);
}

function  imprimeNomeOrdemAlfabetica(){
    console.log('\nImprimindo nome dos produtos na ordem requisitada:');
    var produtosFinal = concertaQuantidadeJSON(concertaPrecoJSON(concertaNomeJSON()));    
    var nomeProdutos = [];
    var aux = '';
    produtosFinal.forEach(function(produto){
        aux = produto.category + ': id (' + produto.id + ') - ' + produto.name;
        nomeProdutos.push(aux);
    });
    nomeProdutos.sort(function(a, b) {
        if(a < b){
            return -1;
        }
        else{
            return true;
        }
    });
    console.log(nomeProdutos);
}

function validaEstoque(){
    console.log('\nValidando estoque...');
    var produtosFinal = concertaQuantidadeJSON(concertaPrecoJSON(concertaNomeJSON()));    
    let w = 0, x = 0, y = 0, z = 0;
    produtosFinal.forEach(function(produto){
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
    });
    console.log('Valor do estoque das panelas:', w);
    console.log('Valor do estoque dos eletrodomésticos:', x);
    console.log('Valor do estoque dos eletrônicos:', y);
    console.log('Valor do estoque dos acessórios:', z);
}

exportaJSON();
validaEstoque();
imprimeNomeOrdemAlfabetica();
