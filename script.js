define(['underscore', 'twigjs'], function (_, Twig) {
	var CustomWidget = function () {
		var self = this;

		this.getTemplate = _.bind(function (template, callback) {
			params = (typeof params == 'object') ? params : {};
			template = template || '';

			return this.render({
				href: '/templates/' + template + '.twig',
				base_path: this.params.path,
				load: callback
			});
		}, this);

		this.callbacks = {
			render: function () {
				console.log('render');


				self.getTemplate('title', template => {

					self.render_template({
						caption: {
							class_name: 'push_widget'
						},
						body: '',
						render: template.render({ title: '123' })
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

				return true;
			},
			onSave: function () {
				alert('click');
				return true;
			},
			destroy: function () {

			},
		};
		return this;
	};

	return CustomWidget;
});