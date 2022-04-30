<script>
	import CodeFlask from 'codeflask';
	import { onMount } from 'svelte';
	import lint from '$lib/eslint/index.js';

	let editor;
	let flask;
	let defaultCode = `const msg = "Hello World"\n\nconst greeting = () => {\n  console.log(msg)\n}\n\ngreeting()\n\n`;

	onMount(() => {
		const codeFlask = createEditor();

		if (codeFlask) {
			flask = codeFlask;
			flask.updateCode(defaultCode);
			subscribeToCodeUpdate();
		} else {
			throw new Error('Failed to load the editor');
		}
	});

	const subscribeToCodeUpdate = () => {
		// Didn't read the library code.
		flask.onUpdate((code) => {
			const messages = lint(code);
			console.log(messages);
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

<div bind:this={editor} />
