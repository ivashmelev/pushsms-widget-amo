define(['underscore', 'twigjs'], function (_, Twig) {
	var CustomWidget = function () {
		const self = this;
		window.AMOWIDGET = self;

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
				return true;
			}, this),
			bind_actions: function () {

				return true;
			},
			settings: function () {

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
				return true;
			},
			destroy: function () {

			},
			contacts: {
				selected: () => {
					const contacts = self.list_selected().selected;
					const phonesContactsAMO = [];

					contacts.forEach(({ phones }) => phones[0] && phonesContactsAMO.push(phones[0]));

					window.initialPhones(phonesContactsAMO);


					return true;
				}
			},
			companies: {
				selected: () => {
					const contacts = self.list_selected().selected;
					const phonesContactsAMO = [];

					contacts.forEach(({ phones }) => phones[0] && phonesContactsAMO.push(phones[0]));

					window.initialPhones(phonesContactsAMO);
					return true;
				}
			},
			loadPreloadedData: () => {
				return new Promise(_.bind(function (resolve, reject) {

				}), this);
			},
			loadElements: (type, id) => {
			},
			linkCard: (links) => {
			},
			searchDataInCard: (query, type, id) => {
			}
		};
		return this;
	};

	return CustomWidget;
});