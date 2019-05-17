import { injectable } from "inversify";
import {Response} from "express";

@injectable()
export class RenderProcessor {


    public render(res:Response, template:string, options) : Promise<string>{
        return new Promise<string>((resolve, reject)=>{
            res.render(template, options, (err, compiled)=> {
                if (err) {
                    console.log(err);
                    reject('500 when rendering the template');
                } else {
                    console.log(compiled)
                    resolve(compiled);
                }
            });
        });
    }



}