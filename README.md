## Practice of graph-ql (Nomad)

### Graph-ql

Better than REST API

1. OverFetching 
- api 요청에 불필요한 정보까지 전부 포함되어 있다. 

2. Underfetching 
- 필요한 정보가 여러개 있으며, 다른 정보는 다른 엔드포인트에 있을때, 요청을 두번 해야 한다. 
- 하지만 graph-ql은 한번의 요청으로 처리가 가능하다. 