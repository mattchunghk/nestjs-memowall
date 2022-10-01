import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { formParse } from 'utils/upload';
import { MemosService } from './memos.service';

@Controller('memo')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}
  @Get()
  async loadMemos(@Res() res) {
    try {
      const memos = await this.memosService.getMemos();
      res.status(200).json(memos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  @Post('memo-formidable')
  async uploadMemos(@Res() res, @Req() req) {
    try {
      const obj: any = await formParse(req);

      await this.memosService.uploadMemos(obj['text'], obj['filename']);
      res.end('success');
    } catch (error) {
      res.status(400).send(error);
    }
  }
  @Put('update')
  async updateMemos(@Res() res, @Req() req, @Query() query) {
    try {
      await this.memosService.updateMemos(query.id, query.update);
      res.end('success');
    } catch (error) {
      res.status(400).send(error);
    }
  }

  @Delete('delete/id/:id')
  async deleteMemos(@Res() res, @Req() req, @Param('id') id) {
    try {
      await this.memosService.deleteMemos(id);
      res.end('success');
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
