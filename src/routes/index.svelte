<script>
	import CodeFlask from 'codeflask';
	import { onMount } from 'svelte';

	let editor;
	let flask;
	let defaultCode = `const msg = "Hello World"\n\nconst greeting = () => {\n  console.log(msg)\n}\n\ngreeting()\n\n`;

	onMount(() => {
		const codeFlask = createEditor();

		if (codeFlask) {
			flask = codeFlask;
			flask.updateCode(defaultCode);
		} else {
			throw new Error('Failed to load the editor');
		}
	});

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
