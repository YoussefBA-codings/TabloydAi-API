import { Injectable } from '@nestjs/common';
import fs from 'fs';
import axios from 'axios';
import { Blob } from 'buffer';
@Injectable()
export class AiService {
	constructor() {}

  async convert(file) {
    let config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: `${process.env.AI_SERVER}/extract?rtype=xlsx`,
      headers: { 
        'Content-Type': 'application/pdf'
      },
      data: new Blob([file.buffer])
    };
    
    const result = await axios(config);
    return result.data
  }
}
