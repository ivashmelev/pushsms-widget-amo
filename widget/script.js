define(['underscore', 'twigjs'], function (_, Twig) {
	var CustomWidget = function () {
		const self = this;
		window.AMOWIDGET = self;

		console.log(this);


		this.getTemplate = _.bind(function (template, callback) {
			params = (typeof params == 'object') ? params : {};
			template = template || '';

			return this.render({
				href: '/build/' + template + '/index.html',
				base_path: this.params.path,
				load: callback
			});
		}, this);

		this.callbacks = {
			render: function () {
				console.log('render');

				self.getTemplate('card', template => {

					self.render_template({
						caption: {
							class_name: 'push_widget'
						},
						body: '',
						render: template.render()
					});
				});

				return true;
			},
			init: _.bind(function () {
				console.log('init');
				return true;
			}, this),
			bind_actions: function () {
				console.log('bind_actions');
				return true;
			},
			settings: function () {
				console.log('settings');

				self.getTemplate('settings', template => {

					self.render_template({
						caption: {
							class_name: 'push_widget'
						},
						body: '',
						render: template.render()
					});
				});

				return true;
			},
			onSave: function () {
				alert('click');
				return true;
			},
			destroy: function () {

			},
			loadPreloadedData: () => {
				return new Promise();
			},
			loadElements: function (type, id) {
				console.log('load elements');

				return new Promise(resolve => console.log(type, id));
			},
			linkCard: () => {
				return new Promise();
			},
			searchDataInCard: () => {
				return new Promise();
			}
		};
		return this;
	};

	return CustomWidget;
});