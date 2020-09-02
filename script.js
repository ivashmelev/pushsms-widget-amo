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


				// self.getTemplate('select', template => {

				// 	self.render_template({
				// 		caption: {
				// 			class_name: 'push_widget'
				// 		},
				// 		body: '',
				// 		render: template.render({
				// 			items: [{
				// 				id: 0, option: 'option1',
				// 				id: 1, option: 'option2'
				// 			}]
				// 		})
				// 	});
				// });
				const items = [
					{ id: 'id0', option: 'option1' },
					{ id: 'id1', option: 'option2' },
					{ id: 'id2', option: 'option3' }]

				var data = self.render(
					{ ref: '/tmpl/controls/select.twig' }, // объект data в данном случае содержит только ссылку на шаблон
					{
						items,      //данные
						class_name: 'subs_w',  //указание класса
						id: self.get_settings().widget_code + '_list'   //указание id
					}
				);

				document.querySelector('.card-widgets__elements').insertAdjacentHTML('afterbegin', data);

				// self.render_template({
				// 	caption: {
				// 		class_name: 'push_widget'
				// 	},
				// 	body: '',
				// 	render: data
				// });

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