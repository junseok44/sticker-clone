문제.

1. store class를 만들어서 그거를 app에다 넣어주고 객체 인스턴스를 만들어줬는데
   이렇게 하면 문제는 뭐냐하면은. todo에 뭐가 추가되어도 렌더링이 안된다. 다만 react가
   관리하는 state는 렌더링이 되는데. 그러니까 mobx의 경우 observable하게 해줘서. 그 값을 tracking하고. mobx-react가 그걸 확인하고 리 렌더링하는것

궁금한점.

1. 왜 app에서 observer를 해주면. 안에 있는 memo는 재깍 렌더링이 안되는거지?
2. 클래스에서도 불변성을 지켜야 하나? mobx에서 사용하는것에 대해서는..
