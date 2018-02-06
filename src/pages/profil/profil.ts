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
    this.http.patch(url,
      {"fields":{"Boisson":this.fields.Boisson-1}})
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


      this.http.patch(url,
        {"fields":{"Boisson":this.fields.Boisson+1}})
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
              subTitle: 'Une Boison a bien été ajouté!!',
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
              this.fields.Valide = "True";

              let alert = this.alertCtrl.create({
                title: ' Modification Visiteur ',
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
          this.http.patch(url,
            {"fields":{"Valide":"False"}})
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
                  title: 'Modification Visiteur',
                  subTitle: 'Visiteur Retirer  !!',
                  buttons: ['Fermer']
                });
                alert.present();
              }
            );
        }

        saveVestiaire() {
          console.log(this.Vestiaire);
          let url = `https://api.airtable.com/v0/appRzgYd2sozz8l2P/personne/${this.id}?api_key=keyAER9NsfEje3klJ`;
          this.funLoading();
          this.http.patch(url,
            {"fields":{"Vestiaire" : this.Vestiaire}})
            .subscribe(
              val => {
                console.log("PUT call successful value returned in body",
                val);
              },
              response => {
                console.log("PUT call in error", response);
              },
              () => {
                this.fields.Vestiaire = this.Vestiaire;

                let alert = this.alertCtrl.create({
                  title: 'Modification Vestiaire',
                  subTitle: 'le Visiteur a charger son Vestiaire',
                  buttons: ['Fermer']
                });
                alert.present();
              }
            );

          // fin saveVestiaire
        }
        errorBoison(){
          let alert = this.alertCtrl.create({
            title: 'Quota Boisson Visiteur',
            subTitle: 'quota de Boisson insuffiante ',
            buttons: ['Fermer']
          });
          alert.present();
        }

        refresh(){
        }

      }
      // {id:100,Nom:"test",Prenom:"test",BTS:"test",BTS:"Valide",Boisson:5}
