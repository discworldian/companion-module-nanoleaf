import type { ModuleInstance } from './main.ts'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		on_off: {
			name: 'Turn Nanoleaf on/off',
			options: [],
			callback: async (_) => {

				console.log("Hello world")
				const ip = self.config.host
				const port = self.config.port
				const auth_token = self.config.auth_token

				const api_url = `http://${ip}:${port}/api/v1/${auth_token}/state`

				try {
					const getStateResponse = await fetch(
						new Request(api_url, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}),
					)
					if (!getStateResponse.ok) {
						throw new Error(`Response status: ${getStateResponse.status}`)
					}
					console.log(getStateResponse)
					const responseBody = await getStateResponse.json()

					const deviceIsOn = responseBody["on"]["value"]
					console.log("PLZ ", deviceIsOn)
					if (!deviceIsOn) {
						console.log('Current state of device: off. Toggling device on.')
					} else {
						console.log('Current state of device: on. Toggling device off.')
					}

					const setStateOn = await fetch(
						new Request(api_url, {
							method: 'PUT',
							body: JSON.stringify({ on: { value: false } }),
							headers: {
								'Content-Type': 'application/json',
							},
						}),
					)

					if (!setStateOn.ok) {
						throw new Error(`Response status: ${setStateOn.status}`)
					}
				} catch (error: any) {
					console.error(`Oh no, ${error.message}`)
				}
			},
		},
		change_scene: {
			name: 'Change scene',
			options: [
				{
					id: 'scene',
					type: 'textinput',
					label: 'Scene name',
					tooltip: 'Set the name of the scene as set in your Nanoleaf.',
					default: 'Bi disco',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const ip = self.config.host
				const port = self.config.port
				const auth_token = self.config.auth_token
				const scene = event.options.scene

				const api_url = `http://${ip}:${port}/api/v1/${auth_token}/effects`

				try {
					const response = await fetch(
						new Request(api_url, {
							method: 'PUT',
							body: JSON.stringify({ select: `${scene}` }),
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
