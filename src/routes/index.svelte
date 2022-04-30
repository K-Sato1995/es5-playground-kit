<script>
	import CodeFlask from 'codeflask';
	import { onMount } from 'svelte';
	import { about, defaultCode, terms } from '$lib/texts.js';
	import lint from '$lib/eslint/index.js';
	import '$lib/assets/highlight.css';

	let editor;
	let flask;

	let lintErrors = [];
	let executionErrors;

	let code = defaultCode;
	let consoleResult = [];

	console.log = (data) => {
		const arr = [...consoleResult, data];
		consoleResult = arr;
	};

	onMount(() => {
		const codeFlask = createEditor();

		if (codeFlask) {
			flask = codeFlask;
			flask.updateCode(code);
			subscribeToCodeUpdate();
			consoleResult = [];
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
			code = newCode;
			executionErrors = '';
			lintErrors = lint(newCode);
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
		if (lintErrors.length !== 0) {
			alert('未解決のエラーが存在します');
		}
		const func = new Function(code);

		try {
			func();
		} catch (error) {
			executionErrors = error.message;
		}
	};
</script>

<div class="main-container">
	<div class="header">
		<div class="title">ES5までしか使えなくてつらいJS Playground</div>
		<div class="btns">
			<button
				class="run-btn"
				on:click={() => {
					run();
				}}>Run</button
			>
			<button
				class="clear-btn"
				on:click={() => {
					updateCode('');
					consoleResult = [];
				}}>Clear</button
			>
		</div>
	</div>

	{#if !editor}
		<div class="loading">Editorを読み込んでいます....</div>
	{/if}

	<div bind:this={editor} id="editor" />

	<div id="lint-errors">
		{#if executionErrors}
			<code>ExecutionError: {executionErrors}</code>
		{:else if lintErrors.length !== 0}
			<code>LintError: {JSON.stringify(lintErrors)}</code>
		{:else}
			<p class="ready">Lintエラーは見受けられません。実行してみましょう。</p>
		{/if}
		<span class="tag">Errors</span>
	</div>
	<div id="result">
		<span class="tag">Console</span>
		{#each consoleResult as result}
			<div class="console-message">{result}</div>
		{/each}
	</div>
	<div class="footer">
		<div class="footer-btns">
			<button
				class="link-btn"
				on:click={() => {
					updateCode(about);
				}}>About</button
			>
			<button
				class="link-btn"
				on:click={() => {
					updateCode(terms);
				}}>利用規約</button
			>
		</div>
		<div class="copy-right">Copyright© K-Sato All Rights Reserved.</div>
	</div>
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
		display: flex;
		align-items: center;
		border-bottom: solid 1px var(--border-color);
		background-color: var(--header-color);
		color: var(--text-color);
		letter-spacing: 0.7px;
		justify-content: space-between;
		padding: 0 20px;
	}

	#editor {
		grid-area: editor;
	}

	.loading {
		grid-area: editor;
		display: flex;
		color: #fff;
		height: 100%;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color);
		font-size: 1.4rem;
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
		letter-spacing: 0.7px;
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		letter-spacing: 0.7px;
		padding: 0 20px;
	}

	.copy-right {
		color: var(--text-color);
	}
	.link-btn {
		color: var(--text-color);
		border: none;
		outline: none;
		background: none;
		cursor: pointer;
	}

	.run-btn {
		color: var(--text-color);
		background-color: #1b8cfd;
		padding: 0.5rem 1rem;
		border: none;
		outline: none;
		cursor: pointer;
		font-size: bold;
		margin-left: 10px;
	}

	.clear-btn {
		color: var(--text-color);
		background-color: var(--border-color);
		padding: 0.5rem 1rem;
		border: none;
		outline: none;
		cursor: pointer;
		font-size: bold;
		margin-left: 10px;
	}
</style>
