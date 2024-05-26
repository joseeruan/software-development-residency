import { Injectable } from '@nestjs/common';
import { NfeResponseDto } from '../dtos/nfe.dto';

@Injectable()
export class TransformData {
  transformer(response) {
    let obj: NfeResponseDto = {};
    const { resultados }: any = response;
    const campos: string = resultados[0].camposExtraidos;
    const keys: string[] = Object.keys(campos);

    for (let index = 0; index < keys.length; index++) {
      const campo: number | string = campos[keys[index]];

      const key: string = keys[index].replace(/->/g, '_').toLowerCase();

      obj = {
        [key]: campo[0].text,
        ...obj,
      };
    }
    return obj;
  }
}
