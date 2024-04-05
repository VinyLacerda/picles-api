import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import ShelterTokens from './shelter.tokens';
import { Shelter, ShelterSchema } from './schemas/shelter.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ShelterController],

  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }]),
  ],

  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    }
  ]
})
export class ShelterModule { }
