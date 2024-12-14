import type { ModuleInstance } from './main.ts'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		ping: {
			name: 'Change scene',
			options: [
				{
					id: 'scene',
					type: 'textinput',
					label: 'Scene name',
					tooltip: 'Set the name of the scene as set in your Nanoleaf.',
					default: 'Bi disco',
					useVariables: true,
				}
			],
			callback: async (_) => {
				const ip = self.config.host
				const port = self.config.port
				const auth_token = self.config.auth_token

				const api_url = `http://${ip}:${port}/api/v1/${auth_token}/effects`

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
				} catch (error: any) {
					console.error(`Oh no, ${error.message}`)
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
				} catch (error: any) {
					console.error(`Oh no, ${error.message}`)
				}
			},
		},
	})
}
