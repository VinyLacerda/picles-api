import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import ShelterTokens from './shelter.tokens';

@Module({
  controllers: [ShelterController],
  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    }
  ]
})
export class ShelterModule { }
