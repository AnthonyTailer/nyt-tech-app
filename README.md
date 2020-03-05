## NYT Tech news

#### Executando o aplicativo

O aplicativo foi desenvolvido com o framework [Expo](https://expo.io/), pois o mesmo facilita e agiliza o desenvolvimento de aplicativos React Native, possuindo diversas ferramentas úteis para o desenvolvimento.

Para executar esse projeto é necessário possuir o [Expo Client](https://expo.io/tools#client) instalado em um dispositivo Android ou IOS. Posteriormente através [deste link](https://expo.io/@anthony.tailer/nyt-tech-news) é possível acessar a página do projeto e scanear o QR code nela disponível através do aplicativo Expo Client, ou rodar no próprio navegador.

#### Ferramentas utilizadas

- [React Navigation](https://reactnavigation.org/) utilizado para realizar a navegação em Tabs desse projeto.
- [React Native Elements](https://react-native-elements.github.io/react-native-elements/) utilizado como UI Toolkit principal, mantendo o mesmo look and feel tanto para dispositivos Android quanto para dispositivos IOS.
- [Jest](https://jestjs.io/) como framework para desenvolvimento de testes

#### Organização

A aplicação foi feita pensada em uma navegação simples entre as duas categorias de notícias sugeridas ('Technology', 'Science').
A navegação esta presente no arquivo `App.js`, onde cada uma das Tabs recebe uma das categorias citadas acima como parâmetro.
O componente que realiza a requição para a API do New York Times está localizado em `src/components/NewsList`, onde a lista das notícias é renderizada a partir de uma `FlatList`. Cada item dessa lista é construído a partir do component presente em `NewsListItem`. O Modal de detalhes também fica presente neste componente

#### Testes

Os testes ficam por conta de funcionalidades específicas.
Para teste da fetch API utilizada para as requisões, foi realizada um mock para simular uma requição verdadeira. Os testes estão localizados em `src/components/NewsList/__tests__`.
Para realizar as requições para a API do NYT foi construído um `React Hook` utilizando o `useReducer`. Os testes referentes ao Hook se encontram em `src/hooks/request/__tests__`, simulando ações necessárias para o funcionamento do reducer e suas actions.
Para executar os testes é necessário fazer o download deste projeto e em sua pasta raiz executar `npm test`ou `yarn test` dependendo do gerenciador de pacotes instalado.

_OBS_: A cobertura de testes poderia ser bem aprimorada, testes de integração poderiam garantir que a comunicação entre os components fosse percorrida, testando suas props e renderizações, por exemplo. Acabei por não conseguir completar a tempo como gostaria.
