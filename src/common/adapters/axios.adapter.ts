import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpAdapter } from "../interfaces/http-adapters.interface";
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    constructor(private readonly httpService: HttpService) { }

    async get<T>(url: string): Promise<T> {

        const { data } = await firstValueFrom(
            this.httpService.get<T>(url)
                .pipe(
                    catchError((error: AxiosError) => {
                        console.error(error.response.data);
                        throw new Error("Method not implemented. log");
                    }),
                ),
        );

        return data
    }

}