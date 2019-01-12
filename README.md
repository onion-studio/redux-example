# Redux 사용 예제

TODO: react-router + redux 연동

이 코드를 읽기 위해서는 공식 문서의 [Basics](https://redux.js.org/basics/basic-tutorial) + [Async Actions](https://redux.js.org/advanced/async-actions)에 대한 이해가 필요함.

## Ducks 패턴

Redux와 관련된 여러 구성요소(reducer, action type, action creator, thunk 등)을 공식 문서에 나온 것처럼 서로 다른 파일에 작성하면, 파일 개수가 많아지고 폴더 구조가 너무 복잡해진다. 이에 **서로 연관된 구성요소를 하나의 파일에 작성**하는 Ducks 패턴이 등장했다.

[관련 블로그](http://guswnsxodlf.github.io/redux-ducks-pattern)

이 프로젝트는 Ducks 패턴으로 작성되어 있음.

## 폴더 구조

기본적으로 components 폴더에 container 컴포넌트를 작성하되, 필요하다면 presentational 컴포넌트를 분리해 **같은 폴더에** 두는 방식!