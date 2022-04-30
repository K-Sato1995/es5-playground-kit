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
	let consoleResult = [];

	console.log = (data) => {
		const arr = [...consoleResult, data]
		consoleResult = arr
	}

	onMount(() => {
		const codeFlask = createEditor();

		if (codeFlask) {
			flask = codeFlask;
			flask.updateCode(code);
			subscribeToCodeUpdate();
			consoleResult = []
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
		flask.onUpdate((newCode) => {
			code = newCode
			errorMessages = lint(newCode);
		});
	};

	const createEditor = () => {
		if (editor) editor.innerHTML = '';

		const flask = new CodeFlask(editor, {
			language: 'js',
			lineNumbers: true,
			defaultTheme: false
		});

		return flask;
	};

	const run = () => {
		const func = new Function(code);
		func();
	};
</script>

<div class="main-container">
	<div class="header">
		ES5までしか使えなくてつらいJS Playground
		<button
			on:click={() => {
				run();
			}}>Run</button
		>
		<button
			id=""
			on:click={() => {
				updateCode('');
				consoleResult = []
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
		{#if errorMessages && errorMessages.length === 0}
			<p class="ready">Ready to Execute</p>
		{:else}
			<code>{JSON.stringify(errorMessages)}</code>
		{/if}
		<span class="tag">Errors</span>
	</div>
	<div id="result">
		<span class="tag">Console</span>
		{#each consoleResult as result}
			<div class="console-message">{result}</div>
    	{/each}
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
		--success-color: #4dc9b0;
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
			'editor editor result result' 70%
			'errors errors result result' 30%
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
		grid-area: errors;
		position: relative;
		border-top: solid 1px var(--border-color);
		padding: 80px 10px 10px 10px;
		color: var(--error-color);
		background-color: var(--background-color);
	}

	.ready {
		color: var(--success-color);
		padding: 0;
		margin: 0;
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
		border: solid 1px var(--header-color);
		background-color: var(--header-color);
	}

	#result {
		grid-area: result;
		position: relative;
		padding: 50px 10px 10px 10px;
		border-left: solid 1px var(--border-color);
		background-color: var(--background-color);
		color: var(--text-color);
	}

	.console-message {
		padding: 0.5rem 1rem;
		border-bottom: solid 1px var(--border-color);
	}

	.footer {
		grid-area: footer;
		border-top: solid 1px var(--border-color);

		background-color: var(--header-color);
	}

	/* Tokens */
</style>
