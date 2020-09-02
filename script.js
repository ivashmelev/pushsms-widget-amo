define(['twigjs'], function (Twig) {
	var CustomWidget = function () {
		var self = this;

		this.getTemplate = _.bind(function (template, params, callback) {
			params = (typeof params == 'object') ? params : {};
			template = template || '';

			return this.render({
				href: '/templates/' + template + '.twig',
				base_path: this.params.path,
				v: this.get_version(),
				load: callback
			}, params);
		}, this);

		this.callbacks = {
			render: function () {
				console.log('render');
				return true;
			},
			init: function () {
				console.log('init', CustomWidgets);
				return true;
			},
			bind_actions: function () {
				console.log('bind_actions');
				return true;
			},
			settings: function () {
				return true;
			},
			onSave: function () {
				alert('click');
				return true;
			},
			destroy: function () {

			},
			// contacts: {
			// 	//select contacts in list and clicked on widget name
			// 	selected: function () {
			// 		console.log('contacts');
			// 	}
			// },
		};
		return this;
	};

	return CustomWidget;
});