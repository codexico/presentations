# Javascript for python developers

_the old, the es6+ and the react_


es6+ pq os navegadores já implementam features de es7 e es8, o javascript não
evolui por versões, evolui de acordo com o que os navegadores decidem implementar

# tipos

## variables

### _old_

```js
var x = 3;
```

### _es6_

```js
let x = 3; // IE10+
x = x + 1; // 4

const y = 3;
const y = 5; // error
```

## _string_
```js
var foo = "foo";
var bar = "ba" + "r"; // bar

// template strings
const version = 'ES6';
const foo = `works since ${version}`;
const six = `${3 * 2}`; // "6"
```

## _boolean_
```js
true, false // minúsculas
```
> `!!` -> cast para boolean



## _array_
```js
var foo = [
  "foo", 98, true, null, undefined, function(){}, {}, []
];

foo.length; // 8
foo[0]; // "foo"
foo.push("last")
```

## _object_
```js
var asdf = "asdf";
var obj = {
  chave: "valor",
};
obj.fooasdf; // "bar" // dot notation
obj["fooasdf"]; // "bar" // bracket notation
```

## _JSON_
um subset de object (quase)

```js
JSON.stringify(object);
JSON.parse(string);
```

## _undefined_
```js
var x; // undefined
!!x; // false
```

**Erro muito comum:**
```js
var foo = {};
foo.bar; // undefined
foo.bar.baz; // Uncaught TypeError:
             // Cannot read property 'baz' of undefined
```

## _function_
```js
function foo(bar) {
    return bar;
}
foo('bla'); // "bla"
```

### funções anônimas

```js
const bar = function (baz) {
  return baz;
}
bar('foo'); // foo
```

### callbacks
```js
function foo(cb) {
  return cb();
}
foo(function() { return 100;}); // 100

// Ex:
$.get( "ajax/test.html", function (data) {
  $(".result").html(data);
});
```

### IIFE - Immediately Invoked Function Expressions
```js
(function () {
  console.log('já foi');
})();
```


### arrow functions
```js
const multiply = (x, y) => {
  return y * x;
}

const triple = x => 3 * x;
```

### default values
```js
// ES6
const multiply = (a, b = 1) => a * b;

multiply(5, 7); // 35
multiply(5); // 5
```

## window, this
```js
this === window; // true

a = 37;
window.a; // 37
this.a; // 37

function foo() {
  return this;
}
foo(); // window

function strictFunction() {
  'use strict'; // ES5
  return this;
}
strictFunction(); // undefined
```

```js
var person = {
  firstName: "Penelope",
  lastName: "Barrymore",
  fullName: function () {
    ​
    console.log(this.firstName + " " + this.lastName);
    // or​​
    console.log(person.firstName + " " + person.lastName);
  }
}
```

## Destructuring and spread operator
```js
// ES6
const [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

// stage 3 proposal; chrome 60, firefox 55
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10
b; // 20
rest; // { c: 30, d: 40 }
```

## Iterators

```js
for (var i = 0; i <= 5; i++) {
  console.log(i);
}

var foo = [1,2,3,4,245,3421,34];
for (var i =0; i < foo.length, i++) {
  console.log(foo[i]);
}

// [].map // IE9+
const letras = ['a', 'b', 'c'];
const repete = letras.map(letra => letra + letra);
repete; // ["aa", "bb", "cc"] não altera o array original
letras; // ['a', 'b', 'c']
```



## Como incluir js na página
```js
<script type="text/javascript">
// code
</script>

// html5
<script src="https://example.com/file.js" async></script>
```

```js
// inserir pelo js

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

(function (i, s, o, g, r, a, m) {

  a = document.createElement('script'),
  m = document.getElementsByTagName('script')[0];
  a.async = 1;
  a.src = '//www.google-analytics.com/analytics.js';
  m.parentNode.insertBefore(a, m);

})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
```

> Scripts não async interrompem o carregamento da página.

### _import_ and _export_ Using webpack or node

```js
import React from 'react';
import { foo, bar, baz } from '../../foobar';
import GMap from './GMap';
```

```js
// node_modules/react/index.js
export default React;

// foobar.js
export { foo, bar, baz };

// GMap.js
export default GMap;
```

## jQuery
```js
$('.product-list').addClass('newclass').show('slow').children('li')
  .each(function (index) {
    $(this).toggleClass('foo');
  }
);
```

## Eventos

### DOM Ready

```js
// jQuery
$(document).ready(function () {
  // ready
  init();
});

$(function () {
  // executa quando o DOM terminou de carregar
  // utilizado para iniciar os scripts que dependem do HTML da página
  init();
});
```
```js
function ready(fn) {
  if (document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
    ){ // IE9+
    fn();
  } else { // IE11+
    document.addEventListener('DOMContentLoaded', fn);
  }
}
```

### Click
```js
$('.selector').on('click', function () {
  // ...
});
```

```js
// IE9+
el.addEventListener(eventName, eventHandler);
```

### AJAX
```js
// jQuery
$.ajax({
  method: "POST",
  url: "/cart",
  data: { cart_id: "adadsf-adsf-fads", cep: "02051000" }
})
.done(function( msg ) {
  alert( "Data Saved: " + msg );
});
```

```js
// IE7+
var newName = 'John Smith';
var xhr = new XMLHttpRequest();

xhr.open('POST', 'myservice/username?id=some-unique-id');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    if (xhr.status === 200 && xhr.responseText !== newName) {
        alert('Something went wrong.  Name is now ' + xhr.responseText);
    }
    else if (xhr.status !== 200) {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send(encodeURI('name=' + newName));
```

```js
// Edge+
fetch('/users.html')
  .then(function(response) {
    return response.text();
  }).then(function(body) {
    document.body.innerHTML = body;
  });
```

## DOM

Inserir um parágrafo em cada elemento com classe 'content'

```js
// jQuery
$( ".content" ).append( "<p>Test</p>" );
```

```js
var p = document.createElement("p");
var newContent = document.createTextNode("Test");
p.appendChild(newContent);
var currentEl = document.querySelectorAll(".content");
Array.prototype.forEach.call(currentEl, function(el, i){
  el.appendChild(p);
});
```

```js
currentEl.map(...) // ES6
```

## Templates (handlebars, mustache) (jinja)
```js
var p = "<p>{{value}}</p>".replace('{{value}}', 'Teste');
```

```js
<script id="entry-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>
</script>
// o template pode ser carregado por ajax também
// /templates/entry.html

var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
var context = {title: "My New Post", body: "This is my first post!"};
var html    = template(context);
```

## React

```js
const el = (username) => <p>Hello, {username}</p>;
```

```js
const el = React.createElement(
  'p',
   null,
  `Hello, ${username}`
);
```

### Presententional Component

recebe props e renderiza

```js
// string
const BasketItem = (text) => (
    <li>{text}</li>
);
// array
const BasketTable = (products) => (
  <ul>
  {products.map((product) =>
    <BasketItem text={product.name} />
  }
 </ul>
);
```

```js
// function
const BasketTable = (
  products,
  handleClickItem,
) => (
    {products.map((product) => (
      <BasketItem
        onClick={handleClickItem}
      >
        {products.name}                
      </BasketItem>
    )}
  </BasketTable>
);
```

### Container Component

decide o que fazer: ajax, atualizar o componente ou outro componente

```js
const BasketTableContainer = () => (
      <BasketTable
        handleItemClick={(e) => console.log(e)}
      />
);
```

```js
import React, { Component } from 'react';
import GMapContainer from '../../components/GMap/GMapContainer';
import Card from '../../components/Card/Card';
import { isValidCepFormat, getJson } from '../../modules/helpers';


function getAddressByCep(value) {
    let url = `https://viacep.com.br/ws/${value.replace('-','')}/json`;
    return getJson(url);
}

class CepAddressFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      address: "",
      showCard: false
    };
  }

  handleCloseCard = () => {
    this.setState({showCard: false});
  }

  handleCepChange = (value) => {
    this.setState({value});

    getAddressByCep(value).then((address) => {
      this.setState({address: address});
      this.setState({showCard: true});
    });
  }

  handleSubmit = (value) => {
    this.handleCepChange(value);
  }

  render() {
    <div>
      <h1>Consulta de Endereço</h1>
      {this.state.showCard &&
        <Card
          value={this.state.value}
          showCard={this.state.showCard}
          handleCloseCard={this.handleCloseCard}
        >
          <GMapContainer cep={this.state.cep} address={this.state.address} />
        </Card>
      }
    </div>
  }
}

export default CepAddressFinder;
```






## Deu Tempo?




> ***** REDUX



```js
{ // bloco
  const foo = 4; // ou let foo = 4;
  foo; // 4
}
foo; // ReferenceError: foo is not defined


foo; // undefined
{ // bloco
  var  foo = 4;
  foo; // 4
}
foo; // 4
```

## ponto e vírgula

> ";" -> sempre use ponto e vírgula

JS insere ponto e vírgula automaticamente
```js
function foo() {
return       // aqui o js insere o ; automaticamente
    'foo'
}
foo() // undefined (o esperado era "foo")
```


## Igualdade
```js
0 == false; // true => nunca use "=="
0 === false; // false
0 != false; // false
0 !== false; // true
>
<
>=
<=

!false; // true
!!false; //false
!!undefined; // false
!!0; // false
```

## Date
```js
Date() // "Sun Jul 16 2017 00:31:03 GMT-0300 (BRT)"
var d = new Date() // Date 2017-07-16T03:31:11.100Z
Date.now(); // 1500175878208 => milliseconds since midnight 01 January, 1970 UTC
d.getTime(); // 1500175878208

//
// mês é zero based !!!
//
var d1 = new Date(2000,1,30); // 30 de janeiro?
d1.toLocaleDateString(); // "01/03/2000"

var d18 = new Date(2010,9,18,0);
d18.getDate(); // 18
var d17 = new Date(2010,9,17, 0);
d17.getDate(); // 16 => mudança de horário de verão
```




### default values
```js
// ES6
const multiply = (a, b = 1) => a * b;

// old
function multiply(a, b) {
  var multiplicador = b ? b : 1;
  return a * multiplicador;
}
```

É comum também passar algo para a IIFE mudando o nome da variável:

```js
(function ($, MGL) {
  // aqui dentro $ é jQuery
  $(document.body).addClass('iife');

  MGL.page = 'home'; // alterações aqui refletem fora

}(jQuery, MAGALU, undefined)); // IIFE

MAGALU.page; // "home"
```

```js
(function(undefined) {
  console.log(undefined, typeof undefined);
})('foo'); // "foo string"
```
> muito utilizada para isolar o escopo (como as const em blocos), criar variáveis e funções privadas

```js
var plugin = (function () {
  // coisas aqui não são acessíveis de fora
  var private = 'secret';
  var count = 0;
  function add() {
    return ++count;
  }

  // a não ser que exporte com um return;
  return {
    public: private,
    plusOne: add
  };
}()); // IIFE
plugin.private; // undefined
plugin.public; // 'secret'
plugin.count; // undefined
plugin.plusOne(); // 1
plugin.plusOne(); // 2
```






## Bizarrices

### typeof
```js
typeof null;        // "object" (not "null" for legacy reasons)
typeof undefined;   // "undefined"
```

```js
null === undefined // false
null  == undefined // true
null === null //true
null == null //true
```

### Copiar um objeto não faz deep cloning
```js
let obj1 = { a: 0 , b: { c: 0}};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 3}}
```



## Comparações usando == (dois iguais)
tabela de igualdades



## Coisas que não falei


### symbol


## Refs:


http://eloquentjavascript.net/
http://braziljs.github.io/eloquente-javascript/ (pt-BR)
https://github.com/dorey/Javascript-Equality-Table/
https://developer.mozilla.org/en-US/docs/Web/JavaScript
http://timelessrepo.com/json-isnt-a-javascript-subset
http://api.jquery.com/
http://youmightnotneedjquery.com/
http://caniuse.com/
http://redux.js.org/docs/basics/UsageWithReact.html
