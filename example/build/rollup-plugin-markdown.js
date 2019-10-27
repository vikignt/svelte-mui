import marked from 'marked';
import { createFilter /*, makeLegalIdentifier*/ } from 'rollup-pluginutils';

const ext = /\.md$/;

export default function md(options = {}) {
	const filter = createFilter(options.include || ['**/*.md'], options.exclude);
	if (options.marked) {
		marked.setOptions(options.marked);
	}
	return {
		name: 'md',

		transform(md, id) {
			if (!ext.test(id)) return null;
			if (!filter(id)) return null;

			const data = marked(md);
			return {
				code: `export default ${JSON.stringify(data.toString())};`,
				map: { mappings: '' },
			};
		},
	};
}
