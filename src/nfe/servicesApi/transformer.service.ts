import { Injectable } from '@nestjs/common';
import { DataResponse } from '../interfaces/data.interface';

@Injectable()
export class TransformData {
  transformer(response) {
    let obj: DataResponse = {};
    const { resultados }: any = response;
    const campos: string = resultados[0].camposExtraidos;
    const keys: string[] = Object.keys(campos);

    for (let index = 0; index < keys.length; index++) {
      const campo: DataResponse = campos[keys[index]];

      const key: string = keys[index].replace(/->/g, '_').toLowerCase();

      obj = {
        [key]: campo[0].text,
        ...obj,
      };
    }
    return obj;
  }
}
