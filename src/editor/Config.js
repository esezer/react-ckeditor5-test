//** Check link below for full list of properties */
//** https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html */

const EditorConfiguration = {
	//removePlugins: ['Title'],
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'superscript',
			'subscript',
			'|',
			'bulletedList',
			'numberedList',
			'alignment',
			'|',
			'outdent',
			'indent',
			'|',
			'undo',
			'redo',
			'-',
			'fontBackgroundColor',
			'fontColor',
			'fontSize',
			'fontFamily',
			'|',
			'removeFormat',
			'selectAll',
			'|',
			'blockQuote',
			'imageInsert',
			'link',
			'mediaEmbed',
			'horizontalLine',
			'insertTable',
			'|',
			'specialCharacters',
			'MathType',
			'ChemType',
			'mshape'
		],
		shouldNotGroupWhenFull: true,
		viewportTopOffset: 30
	},
	image: {
		resizeUnit: '%',
		resizeOptions: [
			{
				name: 'resizeImage:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'resizeImage:75',
				value: '75',
				icon: 'large'
			},
			{
				name: 'resizeImage:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'resizeImage:25',
				value: '25',
				icon: 'small'
			}
		],
		styles: ['alignLeft', 'alignCenter', 'alignRight'],
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'resizeImage',
			'|',
			'toggleImageCaption'
		]
		// toolbar: [
		// 	'imageStyle:block',
		// 	'imageStyle:side',
		// 	'|',
		// 	'toggleImageCaption',
		// 	'imageTextAlternative',
		// 	'|',
		// 	'resizeImage',
		// ]
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
	},
	mediaEmbed: {
		previewsInData: true,
		providers: [
			{
				name: 'dailymotion',
				url: /^dailymotion\.com\/video\/(\w+)/,
				html: match => {
					const id = match[1];

					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; ">' +
						`<iframe src="https://www.dailymotion.com/embed/video/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" width="480" height="270" allowfullscreen allow="autoplay">' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'spotify',
				url: [
					/^open\.spotify\.com\/(artist\/\w+)/,
					/^open\.spotify\.com\/(album\/\w+)/,
					/^open\.spotify\.com\/(track\/\w+)/
				],
				html: match => {
					const id = match[1];

					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 126%;">' +
						`<iframe src="https://open.spotify.com/embed/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'youtube',
				url: [
					/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
					/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
					/^youtube\.com\/embed\/([\w-]+)/,
					/^youtu\.be\/([\w-]+)/
				],
				html: match => {
					const id = match[1];

					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
						`<iframe src="https://www.youtube.com/embed/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'vimeo',
				url: [
					/^vimeo\.com\/(\d+)/,
					/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
					/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
					/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
					/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
					/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
					/^player\.vimeo\.com\/video\/(\d+)/
				],
				html: match => {
					const id = match[1];

					return (
						'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
						`<iframe src="https://player.vimeo.com/video/${id}" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
						'</iframe>' +
						'</div>'
					);
				}
			},

			{
				name: 'instagram',
				url: /^instagram\.com\/p\/(\w+)/
			},
			{
				name: 'twitter',
				url: /^twitter\.com/
			},
			{
				name: 'googleMaps',
				url: [/^google\.com\/maps/, /^goo\.gl\/maps/, /^maps\.google\.com/, /^maps\.app\.goo\.gl/]
			},
			{
				name: 'flickr',
				url: /^flickr\.com/
			},
			{
				name: 'facebook',
				url: /^facebook\.com/
			}
		]
	},
	language: 'tr',
	licenseKey: 'LGHUXP296.YQA941LTE291',
	placeholder: 'Type something...'
};

export default EditorConfiguration;
