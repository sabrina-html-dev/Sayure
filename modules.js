var synth = window.speechSynthesis;
var voices = synth.getVoices();
/**
 * @param {URL} par 
*/
function lockANDplay(par){
    document.getElementById('audio').src=par;
    document.getElementById('audio').play();
}
function dialog(par){
    var utterThis = new SpeechSynthesisUtterance(par);
    //var pitch = document.querySelector('#pitch');
    //var rate = document.querySelector("#rate");
    //pitch.value = 2.3;
    //rate.value = 2.3;
    utterThis.pitch = 1.6;
    utterThis.rate = 1;
    utterThis.voice = synth.getVoices()[1];
    synth.speak(utterThis);
    console.log("the "+synth.getVoices()[1].name+" está falando "+par);
}
function silenciar(){
    synth.cancel();
}
function pop(par){
    var descritor = document.createElement("div");
    var tab = document.createElement('table');
    var tby = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var obj = document.createElement("object");
    var img = document.createElement('img');
    img.src=par+"#img";
    obj.type="text/html";
    obj.data=par+"#autor";
    td.appendChild(obj);
    tr.appendChild(td);
    td.rowSpan=3;
    td.appendChild(img);
    tr.appendChild(td);
    tby.appendChild(tr);
    obj.data=par+"#titulo";
    td.appendChild(obj);
    tr.appendChild(td);
    tby.appendChild(tr);
    obj.data=par+"#ano";
    td.appendChild(obj);
    tr.appendChild(td);
    tby.appendChild(tr);
    tab.appendChild(tby);
    descritor.appendChild(tab);
    document.body.appendChild(descritor);
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IA de Recomendação de Conteúdo</title>
</head>
<body>
    <h2>Biblioteca de Recomendação de Conteúdo</h2>

    <!-- Área de Conteúdo -->
    <div id="conteudo">
        <h3>Recomendações para Você:</h3>
        <ul id="recomendacoes"></ul>
    </div>

    <!-- Interação Simulada -->
    <button onclick="interagirComConteudo('ficcao')">Ler Ficção</button>
    <button onclick="interagirComConteudo('ciencia')">Ler Ciência</button>
    <button onclick="interagirComConteudo('historia')">Ler História</button>

    <script>
        // Dados de Conteúdo Disponível
        const conteudo = [
            { id: 1, titulo: "Mistério nas Estrelas", genero: "ficcao" },
            { id: 2, titulo: "Introdução à Biologia", genero: "ciencia" },
            { id: 3, titulo: "A Segunda Guerra Mundial", genero: "historia" },
            { id: 4, titulo: "Viagem ao Futuro", genero: "ficcao" },
            { id: 5, titulo: "Fundamentos da Física", genero: "ciencia" },
            { id: 6, titulo: "Revoluções Históricas", genero: "historia" }
        ];

        // Dados de Interação do Usuário
        let historicoInteracao = {
            ficcao: 0,
            ciencia: 0,
            historia: 0
        };

        // Função para registrar interação do usuário
        function interagirComConteudo(genero) {
            historicoInteracao[genero]++;
            gerarRecomendacoes();
        }

        // Função de recomendação baseada nas interações do usuário
        function gerarRecomendacoes() {
            // Gênero mais popular do usuário
            let generoPreferido = Object.keys(historicoInteracao).reduce((a, b) => 
                historicoInteracao[a] > historicoInteracao[b] ? a : b
            );

            // Filtra e exibe recomendações
            let recomendacoes = conteudo.filter(item => item.genero === generoPreferido);
            exibirRecomendacoes(recomendacoes, generoPreferido);
        }

        // Exibir as recomendações na interface
        function exibirRecomendacoes(recomendacoes, generoPreferido) {
            let lista = document.getElementById("recomendacoes");
            lista.innerHTML = `<h4>Baseado no seu interesse em ${generoPreferido}:</h4>`;
            recomendacoes.forEach(item => {
                let listItem = document.createElement("li");
                listItem.textContent = item.titulo;
                lista.appendChild(listItem);
            });
        }
    </script>
</body>
</html>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recomendação de Conteúdo</title>
</head>
<body>
    <h2>Recomendações de Livros</h2>
    <p id="recomendacoes"></p>

    <script>
        // Perfil do Usuário
        const usuario = {
            preferencias: {
                generos: ["Ficção Científica", "Mistério"],
                autorFavorito: "Arthur C. Clarke",
                classificacaoMinima: 4
            },
            historicoLeitura: [
                { titulo: "2001: Uma Odisseia no Espaço", genero: "Ficção Científica", autor: "Arthur C. Clarke", classificacao: 5 },
                { titulo: "Sherlock Holmes", genero: "Mistério", autor: "Arthur Conan Doyle", classificacao: 4 }
            ]
        };

        // Banco de Dados de Livros
        const biblioteca = [
            { titulo: "O Fim da Infância", genero: "Ficção Científica", autor: "Arthur C. Clarke", classificacao: 5 },
            { titulo: "O Código Da Vinci", genero: "Mistério", autor: "Dan Brown", classificacao: 4 },
            { titulo: "Duna", genero: "Ficção Científica", autor: "Frank Herbert", classificacao: 5 },
            { titulo: "O Senhor dos Anéis", genero: "Fantasia", autor: "J.R.R. Tolkien", classificacao: 5 },
            { titulo: "O Nome da Rosa", genero: "Mistério", autor: "Umberto Eco", classificacao: 4 }
        ];

        // Função de recomendação
        function recomendarLivros(usuario, biblioteca) {
            const recomendacoes = biblioteca.map(livro => {
                // Calcula a pontuação de recomendação para cada livro
                let pontuacao = 0;
                
                // Preferências de gênero
                if (usuario.preferencias.generos.includes(livro.genero)) {
                    pontuacao += 2;
                }
                
                // Preferência por autor favorito
                if (livro.autor === usuario.preferencias.autorFavorito) {
                    pontuacao += 3;
                }
                
                // Classificação mínima
                if (livro.classificacao >= usuario.preferencias.classificacaoMinima) {
                    pontuacao += 1;
                }
                
                // Checa se o livro já foi lido
                const jaLido = usuario.historicoLeitura.some(hist => hist.titulo === livro.titulo);
                if (jaLido) {
                    pontuacao -= 3;
                }
                
                return { ...livro, pontuacao };
            });
            
            // Filtra e ordena as recomendações
            return recomendacoes
                .filter(livro => livro.pontuacao > 0)
                .sort((a, b) => b.pontuacao - a.pontuacao)
                .slice(0, 5);  // Limita a 5 recomendações
        }

        // Mostra recomendações
        function mostrarRecomendacoes() {
            const recomendacoes = recomendarLivros(usuario, biblioteca);
            const recomendacoesEl = document.getElementById("recomendacoes");

            if (recomendacoes.length > 0) {
                recomendacoesEl.innerHTML = "<strong>Baseado em suas preferências:</strong><br><br>" +
                    recomendacoes.map(livro => `${livro.titulo} - ${livro.autor} (Pontuação: ${livro.pontuacao})`).join("<br>");
            } else {
                recomendacoesEl.innerHTML = "Não encontramos recomendações baseadas nas suas preferências.";
            }
        }

        mostrarRecomendacoes();
    </script>
</body>
</html>

*/