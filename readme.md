# Requisitos - Parte 1

- [x] 1 - Usuário se identifica para realizar a postagem. A partir de sua identificação, ele será o usuário majoritário, ou seja, somente ele fará postagem e estas possuem a sua identificação. Caso outro usuário deseja postar, deverá se identificar e se transforma no usuário majoritário;

- [x] 2 - Postagem de uma mensagem: cada mensagem possui um assunto, a mensagem em si, sua data e hora de postagem;

- [x] 3 - Uma postagem pode ser respondida, devendo o usuário "comum" se identificar com seu nome na resposta;

- [x] 4 - Uma postagem pode ser excluída pelo usuário majoritário;

- [x] 5 - Uma postagem pode ser curtida: nesse caso, a postagem mudará de cor e deverá ficar em destaque

- [x] 6 - Pode-se editar uma postagem, pelo usuário majoritário, devendo aparecer uma marcação que esta foi modificada e qual a data que foi feita.

- [x] 7 - Estatísticas que deverão aparecer
    - [x] 7.1 - número de postagens totais por usuário;
    - [x] 7.2 - número de curtidas de cada postagem;
    - [x] 7.3 - quantas edições foram feitas por postagem;
    - [x] 7.4 - quantos usuários majoritários estiveram na rede.

# Requisitos - Parte 2

- [ ] 8 - Sua aplicação deverá persistir os dados numa base de dados Firebase, recuperando-os, salvando-os, e temporariamente gerenciando conjuntamente com o LocalStorage

- [ ] 9 - Use múltiplos componentes para a sua aplicação, e utilize o esquema de Rotas para navegação entre eles, sendo o uso das rotas e componentes a cargo de sua avaliação, de acordo com a proposta para seu projeto.

- [ ] 10 - Utilize VueX para a passagem de informações entre elementos "pai - filhos" ou entre componentes distintos sem ancestralidade.
