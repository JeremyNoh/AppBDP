import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';


// import { HomePage } from '../home/home';
import { AlertController,LoadingController } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Http} from '@angular/http';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  // params: string = this.navParams.get('params');
  fields = this.navParams.get('fields');
  id = this.navParams.get('id');
  isValid = this.fields.Valide;
  // Vestiaire = undefined ;
  Vestiaire = this.fields.Vestiaire;



  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log(this.fields);
    console.log(this.fields.Vestiaire);

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


  DownDrink() {
    // console.log(this.fields);
    // console.log("apres le test");
    //   // https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne?api_key=keyAER9NsfEje3klJ
    let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${this.id}?api_key=keyAER9NsfEje3klJ`;
    this.funLoading();
    this.http.put(url,
      {"fields":{"id":this.fields.id,"Prenom":this.fields.Prenom,"BTS":this.fields.BTS,"Valide":this.fields.Valide,"Boisson":this.fields.Boisson-1,"Nom":this.fields.Nom}})
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
          val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          this.fields.Boisson = this.fields.Boisson-1;
          let alert = this.alertCtrl.create({
            title: 'Modification des Boissons',
            subTitle: 'Une Boison a bien été retiré!!',
            buttons: ['Fermer']
          });
          alert.present();
        }
      );

    }

    UpDrink() {
      let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${this.id}?api_key=keyAER9NsfEje3klJ`;
      // test
      this.funLoading();
      // fin test


      this.http.put(url,
        {"fields":{"id":this.fields.id,"Prenom":this.fields.Prenom,"BTS":this.fields.BTS,"Valide":this.fields.Valide,"Boisson":this.fields.Boisson+1,"Nom":this.fields.Nom}})
        .subscribe(
          val => {
            // test
            // let loading = this.loadingCtrl.create({
            //   content: 'Please wait...'
            // });
            //
            // loading.present();
            //
            // setTimeout(() => {
            //   loading.dismiss();
            // }, 3000);
            // fin test
            console.log("PUT call successful value returned in body",
            val);
          },
          response => {
            console.log("PUT call in error", response);
          },
          () => {

            console.log("Boisson augmenté");
            this.fields.Boisson = this.fields.Boisson+1;
            let alert = this.alertCtrl.create({
              title: 'Modification des Boissons',
              subTitle: 'Une Boison a bien été retiré!!',
              buttons: ['Fermer']
            });
            alert.present();
            // fin
          }
        );
        // fin test
      }

      SavePrence(){
        let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${this.id}?api_key=keyAER9NsfEje3klJ`;
        this.funLoading();
        this.http.put(url,
          {"fields":{"id":this.fields.id,"Prenom":this.fields.Prenom,"BTS":this.fields.BTS,"Valide":"True","Boisson":this.fields.Boisson,"Nom":this.fields.Nom}})
          .subscribe(
            val => {
              console.log("PUT call successful value returned in body",
              val);
            },
            response => {
              console.log("PUT call in error", response);
            },
            () => {
              this.fields.Valide = "True";

              let alert = this.alertCtrl.create({
                title: 'Visiteur Enregistrer',
                subTitle: 'Visiteur Enregistrer !!',
                buttons: ['Fermer']
              });
              alert.present();
            }
          );

        }

        UnSavePrence(){
          let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${this.id}?api_key=keyAER9NsfEje3klJ`;
          this.funLoading();
          this.http.put(url,
            {"fields":{"id":this.fields.id,"Prenom":this.fields.Prenom,"BTS":this.fields.BTS,"Valide":"False","Boisson":this.fields.Boisson,"Nom":this.fields.Nom}})
            .subscribe(
              val => {
                console.log("PUT call successful value returned in body",
                val);
              },
              response => {
                console.log("PUT call in error", response);
              },
              () => {
                this.fields.Valide = "False";

                let alert = this.alertCtrl.create({
                  title: 'Visiteur Annuler',
                  subTitle: 'Visiteur Retirer  !!',
                  buttons: ['Fermer']
                });
                alert.present();
              }
            );
        }

        saveVestiaire() {
          console.log(this.Vestiaire);
        }

        refresh(){
        }

      }
      // {id:100,Nom:"test",Prenom:"test",BTS:"test",BTS:"Valide",Boisson:5}
