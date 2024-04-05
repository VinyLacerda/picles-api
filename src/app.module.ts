import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelterModule } from './shelter/shelter.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ShelterModule, MongooseModule.forRoot('mongodb+srv://vinylacerda:19809762@cluster-0.usoqgqv.mongodb.net/picles?retryWrites=true&w=majority&appName=Cluster-0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
