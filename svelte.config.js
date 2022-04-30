import adapter from '@sveltejs/adapter-auto';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				esbuildOptions: {
					// Node.js global to browser globalThis
					define: {
						global: 'globalThis'
					},
					// Enable esbuild polyfill plugins
					plugins: [NodeModulesPolyfillPlugin()]
				}
			},
			build: {
				rollupOptions: {
					plugins: [nodePolyfills()]
				}
			}
		}
	}
};

export default config;
