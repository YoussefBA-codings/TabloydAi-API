import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { AiService } from '@/services/ai.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';

@Controller('/api')
export class AiController {
  constructor(private readonly appService: AiService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.pdf' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
        ]
      })
    )
    file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response
  ) {
    const resultFile = await this.appService.convert(file);
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.header('Content-Disposition', 'attachment; filename=result.xlsx');
    return new StreamableFile(Buffer.from(resultFile));
  }
}
