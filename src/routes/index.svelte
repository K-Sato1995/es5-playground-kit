<script>
	import CodeFlask from 'codeflask';
	import { onMount } from 'svelte';
	import lint from '$lib/eslint/index.js';

	let editor;
	let flask;
    let errorMessages
	let code = `const msg = "Hello World"\n\nconst greeting = () => {\n  console.log(msg)\n}\n\ngreeting()\n\n`;

	onMount(() => {
		const codeFlask = createEditor();

		if (codeFlask) {
			flask = codeFlask;
			flask.updateCode(code);
			subscribeToCodeUpdate();
		} else {
			throw new Error('Failed to load the editor');
		}
	});

	const clickAbout = () => {
		code = `/* 
    About this site 


    Credits:
     - CodeFlask: https://kazzkiq.github.io/CodeFlask/
     - EsLint: https://eslint.org/
*/
  `;
		flask.updateCode(code);
	};

	const subscribeToCodeUpdate = () => {
		// Didn't read the library code.
		flask.onUpdate((code) => {
			errorMessages = lint(code);
			console.log(errorMessages);
		});
	};

	function createEditor() {
		if (editor) editor.innerHTML = '';

		const flask = new CodeFlask(editor, {
			language: 'js',
			lineNumbers: true
		});

		return flask;
	}
</script>

<div class="main-container">
	<div class="header">
		ES5(ECMAScript5)までしか使えなくてつらいJavaScript Playground <button
			id="about"
			on:click={() => {
				clickAbout();
			}}>About</button
		>
	</div>

	<div bind:this={editor} id="editor" />

	<div id="lint-errors">
        <code>{JSON.stringify(errorMessages)}</code>
		<span class="erros-tag">Errors</span>
	</div>
	<div id="result">result</div>
	<div class="footer">Footer</div>
</div>

<style>
	:global(:root) {
		font-family: Helvetica, Arial, sans-serif;
		--main-color: #597eff;
		--border-color: #e5e7eb;
		--footer-height: 50px;
		--header-height: 50px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	.main-container {
		min-height: calc(100vh - (var(--footer-height) + var(--header-height)));
		display: grid;
		grid-template:
			'header header header header' 50px
			'editor editor result result' 50%
			'errors errors result result' 50%
			'footer footer footer footer' 50px
			/ 1fr 1fr 1fr;
	}

	.header {
		grid-area: header;
		color: var(--main-color);
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: solid 1px var(--border-color);
	}

	#editor {
		border: solid 1px;
		grid-area: editor;
	}

	#lint-errors {
		grid-area: errors;
		position: relative;
		border: solid 1px;
		background: #fff;
		color: #e06c75;
	}

	#lint-errors > code {
		overflow-wrap: break-word;
		word-break: break-all;
	}

	.erros-tag {
		position: absolute;
		left: 0;
		top: 0;
		border: solid 1px;
	}

	#result {
		grid-area: result;
		border: solid 1px;
	}

	.footer {
		grid-area: footer;
		border-top: solid 1px var(--border-color);
	}

	/* Tokens */
	/* .namespace {
	opacity: .7;
}

.token.doctype .token.doctype-tag {
	color: #569CD6;
}

.token.doctype .token.name {
	color: #9cdcfe;
}

.token.comment,
.token.prolog {
	color: #6a9955;
}

.token.punctuation,
.language-html .language-css .token.punctuation,
.language-html .language-javascript .token.punctuation {
	color: #d4d4d4;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.inserted,
.token.unit {
	color: #b5cea8;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.deleted {
	color: #ce9178;
}

.language-css .token.string.url {
	text-decoration: underline;
}

.token.operator,
.token.entity {
	color: #d4d4d4;
}

.token.operator.arrow {
	color: #569CD6;
}

.token.atrule {
	color: #ce9178;
}

.token.atrule .token.rule {
	color: #c586c0;
}

.token.atrule .token.url {
	color: #9cdcfe;
}

.token.atrule .token.url .token.function {
	color: #dcdcaa;
}

.token.atrule .token.url .token.punctuation {
	color: #d4d4d4;
}

.token.keyword {
	color: #569CD6;
}

.token.keyword.module,
.token.keyword.control-flow {
	color: #c586c0;
}

.token.function,
.token.function .token.maybe-class-name {
	color: #dcdcaa;
}

.token.regex {
	color: #d16969;
}

.token.important {
	color: #569cd6;
}

.token.italic {
	font-style: italic;
}

.token.constant {
	color: #9cdcfe;
}

.token.class-name,
.token.maybe-class-name {
	color: #4ec9b0;
}

.token.console {
	color: #9cdcfe;
}

.token.parameter {
	color: #9cdcfe;
}

.token.interpolation {
	color: #9cdcfe;
}

.token.punctuation.interpolation-punctuation {
	color: #569cd6;
}

.token.boolean {
	color: #569cd6;
}

.token.property,
.token.variable,
.token.imports .token.maybe-class-name,
.token.exports .token.maybe-class-name {
	color: #9cdcfe;
}

.token.selector {
	color: #d7ba7d;
}

.token.escape {
	color: #d7ba7d;
}

.token.tag {
	color: #569cd6;
}

.token.tag .token.punctuation {
	color: #808080;
}

.token.cdata {
	color: #808080;
}

.token.attr-name {
	color: #9cdcfe;
}

.token.attr-value,
.token.attr-value .token.punctuation {
	color: #ce9178;
}

.token.attr-value .token.punctuation.attr-equals {
	color: #d4d4d4;
}

.token.entity {
	color: #569cd6;
}

.token.namespace {
	color: #4ec9b0;
}

code *::selection {
	text-shadow: none;
	background: #264F78;
} */
</style>
