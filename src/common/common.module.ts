import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter],
    imports: [HttpModule]
})
export class CommonModule { }
