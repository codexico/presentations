# JS tooling


## Problemas:

- Muitos scripts e css na página
- Variávies em CSS
- Unir vários js em um só
- Suporte a features em navegadores
- Desenvolvimento - Reload do navegador a cada mudança
- Minificação automática
- Otimização - tree shaking
- Single page app


## 2008

- html4, tudo em 1 css, 1 js
- ferramentas de minify online


## 2009

- Guerra das libs: jQuery, prototype, MooTools...
- 960 grid
- sass (ruby)

```sh
gem install sass
sass input.scss output.css
sass --watch app/sass:public/stylesheets
gem install compass
compass sprite "images/my-icons/*.png"
```


## 2010

- plugins jQuery
- Exemplo: [2010.html]

## 2011

- github
- twitter bootstrap
- node, npm (CommonJS - _exports_)


## 2012

- html5
- polyfills
- browserify (CommonJS)
- require.js (AMD - _define_)
- livereload
- Exemplo: [2012.html]


# 2013

- css3 (+ polyfills)
- bower - gerenciador de pacotes
- grunt - ferramenta de automatização
- Exemplos:
    - [2013.html]
    - [bower.json, Gruntfile, 2013_bower.html]
    - [2013_form.html]

```sh
npm install -g bower
bower install
npm install -g grunt-cli
grunt watch
```


## 2014

- gulp
- webpack


## 2015

- babel (es6)
- Exemplos: [/2015]
