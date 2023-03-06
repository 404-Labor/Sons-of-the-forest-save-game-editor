import { Actor, Files } from './app.interfaces';

import { Component } from '@angular/core';
import { ThemeService } from 'src/core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  Object = Object;
  fileloading = false;
  files: Files[] = [{
    name: 'GameStateSaveData.json',
    data: {}
  }, {
    name: 'SaveData.json',
    data: {}
  }];

  kelvin!: Actor;
  virginia!: Actor;

  constructor(
    public theme: ThemeService,
  ) {
    this.theme.setDesign();
  }

  onFileSelected() {
    this.fileloading = true;

    const inputNode = document.querySelector('#file') as HTMLInputElement;

    if (typeof (FileReader) !== 'undefined' && inputNode.files) {
      Array.from(inputNode.files).forEach(inputFile => {
        const reader = new FileReader();
        reader.readAsText(inputFile);

        reader.onload = (e) => {
          this.files.forEach(file => {
            if (file.name === inputFile.name) {
              const result = JSON.parse(e.target?.result as string);

              switch (inputFile.name) {
                case 'GameStateSaveData.json':
                  result.Data.GameState = JSON.parse(result.Data.GameState)
                  break;
                case 'SaveData.json':
                  result.Data.HeldOnlyItems = JSON.parse(result.Data.HeldOnlyItems)
                  result.Data.VailWorldSim = JSON.parse(result.Data.VailWorldSim)
                  result.Data.VillagesAndCaves = JSON.parse(result.Data.VillagesAndCaves)
                  break;
              }

              file.data = result;

              this.fileloading = false;
              this.loadKelvin();
              this.loadVirginia();
              this.countAllActors();
            }

            reader.onerror = (e) => {
              this.fileloading = false;
            }
          });
        };
      });
    }
  }

  get gameStateSaveData() {
    return this.files.find(file => file.name === 'GameStateSaveData.json');
  }

  get saveData() {
    return this.files.find(file => file.name === 'SaveData.json');
  }

  countAllActors() {
    const uniques: any[] = [];
    const actors = this.saveData?.data.Data?.VailWorldSim.Actors;
    actors?.forEach((actor: any) => {
      const finder = uniques.find(uni => uni.id === actor.TypeId);
      if (!finder) {
        uniques.push({
          id: actor.TypeId,
          counter: 1
        });
      } else {
        finder.counter++;
      }
    });

    uniques.sort((a, b) => a.id - b.id);
    console.log(uniques);
  }

  loadKelvin() {
    if (this.saveData?.data.Data) {
      const actors = this.saveData?.data.Data?.VailWorldSim.Actors;
      this.kelvin = actors?.filter((actor: any) => actor.TypeId === 9)[0];
    }
  }

  loadVirginia() {
    if (this.saveData?.data.Data) {
      const actors = this.saveData?.data.Data?.VailWorldSim.Actors;
      this.virginia = actors?.filter((actor: any) => actor.TypeId === 10)[0];
    }
  }

  reviveKelvin() {
    const gameStateSaveData = this.gameStateSaveData;

    if (gameStateSaveData) {
      gameStateSaveData.data.Data.GameState.IsRobbyDead = false;
      this.kelvin.State = 2;
      this.kelvin.Stats.Health = 100.0;
    }
  }

  killKelvin() {
    const gameStateSaveData = this.gameStateSaveData;

    if (gameStateSaveData) {
      gameStateSaveData.data.Data.GameState.IsRobbyDead = true;
      this.kelvin.State = 6;
      this.kelvin.Stats.Health = 0.0;
    }
  }

  reviveVirginia() {
    const gameStateSaveData = this.gameStateSaveData;

    if (gameStateSaveData) {
      gameStateSaveData.data.Data.GameState.IsVirginiaDead = false;
    }
  }

  killVirginia() {
    const gameStateSaveData = this.gameStateSaveData;

    if (gameStateSaveData) {
      gameStateSaveData.data.Data.GameState.IsVirginiaDead = true;
    }
  }

  download(filename: string) {
    const file = this.files.find(file => file.name === filename);
    const jsonString = JSON.stringify(file?.data);
    let escapedJsonString = jsonString.replace(/"/g, '\\"');

    console.log(escapedJsonString);
  }
}
