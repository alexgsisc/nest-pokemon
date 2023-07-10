import { IsInt, IsString, Min, IsPositive, MinLength } from "class-validator";

export class CreatePokemonDto {

    //isInt, isPositive, min: 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    //isString, min: 1
    @IsString()
    @MinLength(1)
    name: string;
}
