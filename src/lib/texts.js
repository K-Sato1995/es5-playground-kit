const about = `/* 
About this site

JavaScriptは今まで様々な成長を遂げながら、世界中で使用されてきました。
特にES6では多くの機能が追加され大きな進化を遂げました。
 
しかし、本PlayGroundでは、課題である「つらい」になぞらえて、
今と比較してやや書くのがつらかったES5(2009年リリース)以前の記法のみが使用可能です。

ES5で追加された機能: https://www.w3schools.com/js/js_es5.asp

例えばconstやletを使用して、変数を定義してみましょう。
本Playgroundでは下記にエラーが表示されてしまいます。

Credits:
 - CodeFlask: https://kazzkiq.github.io/CodeFlask/
 - EsLint: https://eslint.org/
*/
`

const defaultCode = `/* 
本PlayGroundでは、課題である「つらい」になぞらえて、
今と比較してやや書くのがつらかったES5(2009年リリース)以前の記法のみが使用可能です。
(更に詳細を知りたい場合はAboutをクリックしてください)
*/
const msg = "Hello World"

const greeting = () => {
console.log(msg)
}

greeting()
`
export { about,defaultCode }