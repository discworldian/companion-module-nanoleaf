import type { ModuleInstance } from './main.ts'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		ping: {
			name: 'Forest',
			options: [
				{
					id: 'ip',
					type: 'textinput',
					label: 'Test',
				},
				{
					id: 'port',
					type: 'number',
					label: 'Test port',
					default: 16021,
					min: 1,
					max: 65535,
				},
				{ id: 'auth_token', type: 'textinput', label: 'API auth token' },
			],
			callback: async (event) => {
				let ip = event.options.ip
				let port = event.options.port
				let auth_token = event.options.auth_token

				const api_url = `https://${ip}:${port}/api/v1/${auth_token}/effects`

				try {
					const response = await fetch(
						new Request(api_url, {
							method: 'PUT',
							body: JSON.stringify({ select: 'Blaze' }),
							headers: {
								'Content-Type': 'application/json',
							},
						}),
					)
					if (!response.ok) {
						throw new Error(`Response status: ${response.status}`)
					}

					const json = await response.json()
					console.log(json)
				} catch (error) {
					console.error(error.message)
				}

				await new Promise(f => setTimeout(f, 1000 * 10));



				try {
					const response = await fetch(
						new Request(api_url, {
							method: 'PUT',
							body: JSON.stringify({ select: 'Forest' }),
							headers: {
								'Content-Type': 'application/json',
							},
						}),
					)
					if (!response.ok) {
						throw new Error(`Response status: ${response.status}`)
					}

					const json = await response.json()
					console.log(json)
				} catch (error) {
					console.error(error.message)
				}
			},
		},
	})
}
