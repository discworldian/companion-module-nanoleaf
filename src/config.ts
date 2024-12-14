import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	auth_token: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: Regex.IP,
			default: "192.168.0.1"
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target port',
			width: 4,
			min: 1,
			max: 65535,
			default: 16021,
		},
		{
			type: 'textinput',
			id: 'auth_token',
			label: 'API auth token for Nanoleaf',
			width: 4,
		}
	]
}
