import { UpdateMovieDTO } from './dto/update-movie.dto'
import { CreateMovieDTO } from './dto/create-movie.dto'
import { Movie } from './entities/movie.entity'
import { MoviesService } from './movies.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll()
  }

  // @Get('/search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a movie made after ${searchingYear}`
  // }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData)
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id)
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(id, updateData)
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id)
  }
}
