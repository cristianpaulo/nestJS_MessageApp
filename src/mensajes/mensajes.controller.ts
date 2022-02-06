import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private mensajesService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
    this.mensajesService
      .createMensaje(createMensajeDto)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la creación del mensaje' });
      });
  }

  @Get()
  getAll(@Res() response) {
    this.mensajesService
      .getAll()
      .then((mensajes) => {
        response.status(HttpStatus.OK).json(mensajes);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la obtención de los mensajes' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: CreateMensajeDto,
    @Res() response,
    @Param('id') idMensaje,
  ) {
    this.mensajesService
      .updateMensaje(idMensaje, updateMensajeDto)
      .then((mensaje) => {
        return response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() => {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la actualización del mensaje' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idMensaje) {
    this.mensajesService
      .deleteMensaje(idMensaje)
      .then((respuesta) => {
        return response.status(HttpStatus.OK).json(respuesta);
      })
      .catch(() => {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la eliminación del mensaje' });
      });
  }
}
