define(['underscore', 'twigjs'], function (_, Twig) {
	var CustomWidget = function () {
		const self = this;
		window.AMOWIDGET = self;

		const PUSHSMS_PORTAL = 'https://staging.api.pushsms.ru';
		const PORTAL_URL = window.location.origin;
		// const PUSHSMS_PORTAL = 'https://api.pushsms.ru/';
		const STAGING_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6OSwiZGF0ZXRpbWUiOjE1NTU0MTY5Mzl9.J3VgVhzex1ohyP3k2dJrqOerw8a8uUvNf4qiyVcMqy8';

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
			onSave: async function () {
				return true;
				console.log('onSave');

				const { oauth_client_uuid, pushsmsKey } = self.params;

				const clientSecret = document.querySelector('.params-block__value.js-secret.h-text-overflow').innerText;


				const requestAuth = await fetch(`${PUSHSMS_PORTAL}/api/amocrm/auth?client_id=${oauth_client_uuid}`, {
					headers: {
						'Authorization': `Bearer ${STAGING_TOKEN}`
					}
				});

				try {
					if (requestAuth.ok) {

						const { code } = await requestAuth.json();

						const requestAccessToken = await fetch(`${PORTAL_URL}/oauth2/access_token`, {
							method: 'POST',
							headers: {
								'Content-Type': `application/json`
							},
							body: JSON.stringify({
								client_id: oauth_client_uuid,
								client_secret: clientSecret,
								grant_type: 'authorization_code',
								code,
								redirect_uri: `${PUSHSMS_PORTAL}/api/amocrm/webhook`
							})
						});

						if (requestAccessToken.ok) {
							const { access_token, refresh_token } = await requestAccessToken.json();

							const requestSaveTokens = await fetch(`${PUSHSMS_PORTAL}/api/amocrm/auth`, {
								method: 'POST',
								headers: {
									'Authorization': `Bearer ${STAGING_TOKEN}`,
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								body: `client_id=${oauth_client_uuid}&client_secret=${clientSecret}&access_token=${access_token}&refresh_token=${refresh_token}`
							});


							if (!requestSaveTokens.ok) {
								throw new Error(`Error requestSaveTokens ${requestSaveTokens.status}`);
							}

						} else {
							throw new Error(`Error requestAccessToken ${requestAccessToken.status}`);
						}

						return true;
					}
				} catch (e) {
					return false;
				}


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
		};
		return this;
	};

	return CustomWidget;
});