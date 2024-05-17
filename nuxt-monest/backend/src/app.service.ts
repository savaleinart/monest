import { Injectable } from '@nestjs/common';
import { con } from './main';

type currency = {
  id: number,
  legendeA: string,
  legendeR: string,
  descriptionA: string,
  descriptionR: string,
  localite: string,
  attribution: string,
  refOuvrage: string,
  observation: string
}

type currencyDB = {
  ID_Monnaie: number,
  Localité: string,
  Attribution: string,
  Légende_Avers: string,
  Légende_Revers: string,
  Description_Avers: string,
  Description_Revers: string,
  Ouvrage_réf: string,
  Obs: string
}

@Injectable()
export class AppService {
  async getAllCurrencies() {
    const [rows]: any = await con.query("select ID_Monnaie,t_localite.Nom as Localité,t_personnage.Personnage as Attribution, Légende_Avers, Légende_Revers, Description_Avers, Description_Revers, Ouvrage_réf, Obs from t_monnaie join t_localite on t_monnaie.Localité = t_localite.ID join t_personnage on t_monnaie.Attribution = t_personnage.ID order by ID_Monnaie asc")
    const result: currency[] = []

    for (let i = 0; i < rows.length; i++) {

      result.push({
        id: rows[i].ID_Monnaie,
        localite: rows[i].Localité,
        attribution: rows[i].Attribution,
        legendeA: rows[i].Légende_Avers,
        legendeR: rows[i].Légende_Revers,
        descriptionA: rows[i].Description_Avers,
        descriptionR: rows[i].Description_Revers,
        refOuvrage: rows[i].Ouvrage_réf,
        observation: rows[i].Obs
      })

    }
    return result
  }
}
