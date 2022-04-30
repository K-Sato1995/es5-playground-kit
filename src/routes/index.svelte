<script>
	import CodeFlask from 'codeflask';
	import { onMount } from 'svelte';
	import { about, defaultCode, terms } from '$lib/texts.js';
	import lint from '$lib/eslint/index.js';
	import '$lib/assets/highlight.css';

	let editor;
	let flask;
	let errorMessages;
	let code = defaultCode;

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

	const updateCode = (updatedCode) => {
		code = updatedCode;
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
			lineNumbers: true,
			defaultTheme: false
		});

		return flask;
	}
</script>

<div class="main-container">
	<div class="header">
		ES5までしか使えなくてつらいJS Playground
		<button>Run</button>
		<button
			id=""
			on:click={() => {
				updateCode('');
			}}>Clear</button
		>
		<button
			id="about"
			on:click={() => {
				updateCode(about);
			}}>About</button
		>
		<button
			id=""
			on:click={() => {
				updateCode(terms);
			}}>利用規約</button
		>
	</div>

	<div bind:this={editor} id="editor" />

	<div id="lint-errors">
		<code>{JSON.stringify(errorMessages)}</code>
		<span class="tag">Errors</span>
	</div>
	<div id="result">
        <span class="tag">Console</span>
    </div>
	<div class="footer">Footer</div>
</div>

<style>
	:global(:root) {
		font-family: Helvetica, Arial, sans-serif;
		--text-color: #fff;
		--border-color: #454545;
		--footer-height: 50px;
		--header-height: 50px;
		--header-color: #2e3138;
		--background-color: #15181f;
        --error-color: #e06c75;
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
		/* display: flex;
		justify-content: center; */
		display: flex;
		align-items: center;
		border-bottom: solid 1px var(--border-color);
		background-color: var(--header-color);
		color: var(--text-color);
	}

	#editor {
		grid-area: editor;
	}

	#lint-errors {
        padding-top: 80px;
		grid-area: errors;
		position: relative;
		border-top: solid 1px var(--border-color);
		color: var(--error-color);
		background-color: var(--background-color);
	}

	#lint-errors > code {
		overflow-wrap: break-word;
		word-break: break-all;
	}

	.tag {
		position: absolute;
		left: 0;
		top: 0;
        color: var(--text-color);
        height: 40px;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        border:solid 1px var(--header-color);
        background-color: var(--header-color);
	}

	#result {
		grid-area: result;
        position: relative;
		border-left: solid 1px var(--border-color);
		background-color: var(--background-color);
		color: var(--text-color);
	}

	.footer {
		grid-area: footer;
		border-top: solid 1px var(--border-color);

		background-color: var(--header-color);
	}

	/* Tokens */
</style>
