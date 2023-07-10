import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  constructor(private readonly httpService: HttpService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete *from pokemons

    const { data } = await firstValueFrom(
      this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An Error happened'
          }),
        ),
    );

    const pokemonToInsert: {name: string, no: number}[] = [];


    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({name, no}); 
    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed success';
  }

}
