import { Component } from '@angular/core';

import { LoadingController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boutique',
  templateUrl: 'boutique.page.html',
  styleUrls: ['boutique.page.scss'],
})
export class BoutiquePage {

  boutiques : any;
  api : RestService;

  constructor(public restapi: RestService, 
    public loadingController: LoadingController, 
    public navController : NavController, 
    public router : Router) {

    this.api = restapi;
  }

  async getBoutiques() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.getBoutiques()
      .subscribe(res => {
        console.log(res);
        this.boutiques = res.filter((aBoutique) => {
          return true
        });
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }

  async deleteBoutique(id:any){
    await this.api.deleteBoutique(id)
    .subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  delete(id:any) {
    this.deleteBoutique(id);
  }

  ngOnInit() {
    this.getBoutiques();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

}
