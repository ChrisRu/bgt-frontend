import HTTP from '../../util/services/http';

export default {
  type: 'user',
  name: 'Gebruiker',
  submit: data =>
    new Promise((resolve, reject) => {
      if (!data.username) {
        reject(new Error('Geen gebruikersnaam ingevoerd'));
      }

      if (!data.password) {
        reject(new Error('Wachtwoorden niet ingevuld'));
      }

      if (data.confirmationPassword !== data.password) {
        reject(new Error('Wachtwoorden zijn niet hetzelfde'));
      }

      resolve(HTTP.user.create(data));
    }),
  form: [
    {
      name: 'Gebruikersnaam',
      apiName: 'username'
    },
    {
      name: 'Administrator',
      apiName: 'isAdmin',
      type: 'checkbox'
    },
    {
      name: 'Wachtwoord',
      apiName: 'password',
      type: 'password',
      hiddenInTable: true
    },
    {
      name: 'Herhaal Wachtwoord',
      apiName: 'confirmationPassword',
      type: 'password',
      hiddenInTable: true
    }
  ]
};
