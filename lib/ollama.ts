export default function ollama(config: OllamaConfig ): OllamaInstance {
    return new OllamaInstance(config)

}

export interface OllamaConfig {
    url: string
    model: string
}

export class OllamaInstance {  
    _url: string
    _model: string

    constructor(config: OllamaConfig) {
        this._url = config.url
        this._model = config.model
    }
 }