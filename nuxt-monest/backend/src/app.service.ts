import { Injectable } from '@nestjs/common';
import { con } from './main';

type currency = {
  id: number,
  genre: string,
  type: string,
  valeurFaciale: string,
  localite: string,
  attribution: string
}

type currencyDB = {
  ID_Monnaie: number,
  Genre: string,
  Type: string,
  Valeur_Faciale: string,
  Localité: string,
  Attribution: string
}

@Injectable()
export class AppService {
  async getAllCurrencies() {
    const [rows]: any = await con.query("select ID_Monnaie,Genre,Type,Valeur_Faciale,t_localite.Nom as Localité,t_personnage.Personnage as Attribution from t_monnaie join t_localite on t_monnaie.Localité = t_localite.ID join t_personnage on t_monnaie.Attribution = t_personnage.ID order by ID_Monnaie asc")
    const result: currency[] = []

    for (let i = 0; i < rows.length; i++) {

      result.push({
        id: rows[i].ID_Monnaie,
        genre: rows[i].Genre,
        type: rows[i].Type,
        valeurFaciale: rows[i].Valeur_Faciale,
        localite: rows[i].Localité,
        attribution: rows[i].Attribution
      })

    }
    return result
  }
}
