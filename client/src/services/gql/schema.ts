export abstract class GraphqlSchema {
	protected _name: string = '';
	protected _params: any = {};
	protected _variables: Array<string> = [];

	constructor() {
		const instanceName = this.constructor.name;
		this._name = instanceName.charAt(0).toLocaleLowerCase() + instanceName.slice(1);
	}

	get name() {
		return this._name;
	}

	abstract getSchema(): string;

	protected getInputSchema(): string {
		let s = JSON.stringify(this._params).replace(/"(\w+)"\s*:/g, '$1:');
		s = s.substring(0, 0) + s.substring(0 + 1);
		s = s.substring(0, s.length - 1);
		return s;
	}

	protected static get instanceName() {
		return this.name.charAt(0).toLocaleLowerCase() + this.name.slice(1);
	}
}
