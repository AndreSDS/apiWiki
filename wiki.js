//espera a página carregar para depois carregar o javascript
document.addEventListener('DOMContentLoaded',function() {

    //aguarda o botão submit ser acionado
    document.getElementById('submit').addEventListener('click',function () {
      //lembrar de habilitar o botão somente se houver algo digitado no campo input
        //desativa botão para evitar múltiplas requisições
        //var button = document.getElementById('submit');
        document.getElementById('results').innerHTML = '';

        var campoVal = document.getElementById('campo').value;
        if (campoVal == '') {
          alert("Digita alguma coisa aí!");
        }else{
        //solução do erro cors - http://lupecamacho.com/wikipedia-viewer-wikipedia-api-cross-origin-request-issues/
        const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+campoVal+"&origin=*";
        //faz a requisição GET
        fetch(url)
            .then(function (response) {
              return response.json();
          })
        .then(function(data) {
          //mostra o log com o resultado da requisição
          console.log(data);
          //captura as informações
          for (var i = 0; i < data[1].length; i++) {

            var title = document.createElement('h3');
              title.innerHTML = data[1][i];

            var content = document.createElement('p');
              content.innerHTML = data[2][i];

            var div = document.createElement('div');
              div.appendChild(title);
              div.appendChild(content);

          document.getElementById('results').appendChild(div);
         }
        })
        .catch(function (err) {
              console.log("Falha na qequisição "+err);
        });//catch caso haja erro
      }//condicional que verifica se algo foi digitado
    });//fim do evento click com submit
})//fim do DOMContentLoaded
