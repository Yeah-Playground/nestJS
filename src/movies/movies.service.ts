import { UpdateMovieDTO } from './dto/update-movie.dto'
import { CreateMovieDTO } from './dto/create-movie.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
  private movies: Movie[] = []

  getAll(): Movie[] {
    return this.movies
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id)

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`)
    }
    return movie
  }

  deleteOne(id: number): boolean {
    this.getOne(id) // check if movie exists
    this.movies = this.movies.filter((movie) => movie.id !== id)
    return true
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    })

    return this.movies.filter((movie) => movie.id === this.movies.length)
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id) // check if movie exists
    this.deleteOne(id)
    this.movies.push({
      ...movie,
      ...updateData,
    })
  }
}
