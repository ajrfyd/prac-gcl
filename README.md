## Practice of graph-ql (Nomad)

### Graph-ql

Better than REST API

1. OverFetching 
- api 요청에 불필요한 정보까지 전부 포함되어 있다. 

2. Underfetching 
- 필요한 정보가 여러개 있으며, 다른 정보는 다른 엔드포인트에 있을때, 요청을 두번 해야 한다. 
- 하지만 graph-ql은 한번의 요청으로 처리가 가능하다. 

---

### 기본 Setting 방법

```js
  import { ApolloServer, gql } from 'apollo-server';
  import fetch from 'node-fetch';
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({adress, family, url, port, server}) => {
    console.log(adress, family, url, port)
  })
```

### typeDefs
- 기본적으로 type Query { } 는 존재해야함. 
- Query 않의 key 값이 요청 키가 된다. 
- resolver 해결사? 요청을 처리하는 해결사 그런 느낌인듯 
- resolver 안의 Query는 get 요청 처리에 대한 함수들
- mutation은 post, put, delete와 같은 처리 함수들을 정의 
- resolve 안의 User와 Tweet:
  - type User: user 정보 요청 중 info라는 정의 되지 않은 것을 요청하면 reoslver에서 찾는다. resolver > User > info함수에 정의된 함수에는 첫번째 Argument로 user에서 리턴된 obj의 정보들이 들어온다. 따라서 user 에 없는 info를  요청하더라도 정의된 info함수에서 리턴하는 값을 얻을 수 있다. 
  - type Tweet: 마찬가지 이다. tweet에 author가 없다는 것을 알고 graph-ql은 resolver 어딘가에 resolver가 있어야 한다는 것을 앎. argument로 tweets의 데이터가 들어오고 userId로 users에 있는 id와 일치하는 데이터 찾아 반환함.