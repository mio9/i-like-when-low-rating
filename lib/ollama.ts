import wretch, { type Wretch } from "wretch"

export interface OllamaResponse {
    model:                string;
    created_at:           Date;
    response:             string;
    done:                 boolean;
    context:              number[];
    total_duration:       number;
    load_duration:        number;
    prompt_eval_count:    number;
    prompt_eval_duration: number;
    eval_count:           number;
    eval_duration:        number;
}


export interface OllamaConfig {
    url?: string
    model: string
    system?: string
    options?: any
}

export class Ollama {  
    url: string
    model: string
    system?: string
    private w: Wretch
    options?: any

    constructor(config: OllamaConfig) {
        this.url = config.url || "http://localhost:11434"
        this.model = config.model
        this.system = config.system
        this.options = config.options

        this.w = wretch(this.url)
    }

    async generate(prompt: string): Promise<OllamaResponse>{
        const result = this.w.url(`/api/generate`).post({
            model: this.model,
            prompt,
            stream: false,
            system: this.system
        }).json<OllamaResponse>()
        
        return result
    }
 }