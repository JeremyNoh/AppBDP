import { Component } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import { ProfilPage } from '../profil/profil';

import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Http } from '@angular/http';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/RX';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchQuery: string = '';
  public results: any = [];
  public tableau: any = [];
  public items: any = [];
  params: string = '';
  public tableauValide: any = [];
  VisiteurPresent : number = 0;
  VisiteurInscrit : string = '';



  // Inject HttpClient into your component or service.
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    // this.initializeItems();

    // get api
    this.http.get('https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/?api_key=keyAER9NsfEje3klJ').subscribe(data => {
        this.results = [];
        this.tableau = [];
        this.results =(<any>data).records;
        this.VisiteurPresent = 0;
        for (var i = 0; i < this.results.length; i++) {
          this.tableau.push(this.results[i].fields.Nom + " "+this.results[i].fields.Prenom);

          // compte le nombre de Visiteur Valide = True
          if (this.results[i].fields.Valide =="True"){
            this.VisiteurPresent = this.VisiteurPresent+1;
          }

        }

        // compte le nombre d'inscrit
        this.VisiteurInscrit = this.results.length;


    })
    // fin get api

  }


  initializeItems() {
  //  this.items = [
  //    "Jeremy Nohile",
  //    "Ambre Peix",
  //    "jonathan nohile ",
  //    "juliette nivert",
  //    "nicolas boujeat ",
  //    "joel",
  //    "christelle",
  //    "akash"
  //  ];
  this.items = this.tableau;

 }
  // debut test
  getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    refresh(){
      location.reload();
    }



    goToOtherPage(item) {

      // console.log(this.results[this.tableau.indexOf(item)]);
      this.params = this.results[this.tableau.indexOf(item)];
      // this.navCtrl.push(ProfilPage,this.params);
      this.navCtrl.insert(1, ProfilPage,this.params);
    }


    doRefresh(refresher) {
    console.log(refresher);
    // get api
    this.http.get('https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/?api_key=keyAER9NsfEje3klJ').subscribe(data => {
        this.results = [];
        this.tableau = [];
        this.results =(<any>data).records;
        this.VisiteurPresent = 0;
        for (var i = 0; i < this.results.length; i++) {
          this.tableau.push(this.results[i].fields.Nom + " "+this.results[i].fields.Prenom);

          // compte le nombre de Visiteur Valide = True
          if (this.results[i].fields.Valide =="True"){
            this.VisiteurPresent = this.VisiteurPresent+1;
          }

        }

        // compte le nombre d'inscrit
        this.VisiteurInscrit = this.results.length;
        refresher.complete();
    })
    // fin get api
  }


  SavePrence(item){
    let id = this.results[this.tableau.indexOf(item)].id ;

    console.log(id);
    let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${id}?api_key=keyAER9NsfEje3klJ`;
    this.funLoading();
    this.http.patch(url,
      {"fields":{"Valide":"True"}})
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
          val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {

          let alert = this.alertCtrl.create({
            title: 'Visiteur Enregistrer',
            subTitle: 'Visiteur Enregistrer !!',
            buttons: ['Fermer']
          });
          alert.present();
          this.results[this.tableau.indexOf(item)].fields.Valide = "True";
        }
      );


    }


    funLoading (){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    }

  // fin test
  }
// npm install @ionic-native/core --save
