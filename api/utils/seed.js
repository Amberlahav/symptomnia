'use strict';

const { model: Symptom } = require('../resources/symptoms/symptomModel');
const { model: Entry } = require('../resources/entries/entryModel');

exports.truncate = async () => {
  await Symptom.deleteMany();
  await Entry.deleteMany();
//   await User.deleteMany();
};

exports.seed = async () => {
  try {
    const symptomData = [
        {
            "entries": [
              {
                "date": "2019-11-28T03:26:32.752Z",
                "_id": "5ddf3e6d1a04703f4228e04d",
                "severity": "mild",
                "symptom": "5ddde8228b629a1a7ca825ac",
                "__v": 0
              },
              {
                "date": "2019-11-28T03:34:28.867Z",
                "_id": "5ddf404dd592583fc74847fa",
                "severity": "moderate",
                "symptom": "5ddde8228b629a1a7ca825ac",
                "__v": 0
              },
              {
                "date": "2019-11-28T03:34:28.867Z",
                "_id": "5ddf405ad592583fc74847fc",
                "severity": "severe",
                "symptom": "5ddde8228b629a1a7ca825ac",
                "__v": 0
              }
            ],
            "_id": "5ddde8228b629a1a7ca825ac",
            "name": "Stomach ache",
            "description": "Used to happen a lot when I was younger, then it stopped for a few years, now it has started up again. Trying to figure out what my new triggers are.",
            "__v": 0
          },
        //   {
        //     "entries": [],
        //     "_id": "5ddf24bd579f27360ea9c4ee",
        //     "name": "Dizzy",
        //     "description": "blahblah",
        //     "__v": 0
        //   },
          {
            "entries": [
              {
                "date": "2019-11-28T15:43:06.782Z",
                "_id": "5de0009022b0b164c35bc01b",
                "severity": "mild",
                "symptom": "5de0006b22b0b164c35bc01a",
                "__v": 0
              },
              {
                "date": "2019-11-28T22:45:19.462Z",
                "_id": "5de04e0a6fcbaf742419daa9",
                "severity": "3",
                "symptom": "5de0006b22b0b164c35bc01a",
                "__v": 0
              }
            ],
            "_id": "5de0006b22b0b164c35bc01a",
            "name": "Moody",
            "description": "blahblah",
            "__v": 0
          }
    ];

    const symptomPromises = symptomData.map(async (data) => {
      try {
        const symptom = new Symptom(data);
        return await symptom.save();
      } catch (e) {
        throw e;
      }
    });
    // const symptoms = await Promise.all(symptomPromises);
    await Promise.all(symptomPromises);

    const entryData = [
            {
            "date": "2019-11-28T15:43:06.782Z",
            "_id": "5de0009022b0b164c35bc01b",
            "severity": "mild",
            "symptom": "5de0006b22b0b164c35bc01a",
            "__v": 0
          },
          {
            "date": "2019-11-28T03:26:32.752Z",
            "_id": "5ddf3e6d1a04703f4228e04d",
            "severity": "mild",
            "symptom": "5ddde8228b629a1a7ca825ac",
            "__v": 0
          },
          {
            "date": "2019-11-28T03:34:28.867Z",
            "_id": "5ddf404dd592583fc74847fa",
            "severity": "moderate",
            "symptom": "5ddde8228b629a1a7ca825ac",
            "__v": 0
          },
          {
            "date": "2019-11-28T03:34:28.867Z",
            "_id": "5ddf405ad592583fc74847fc",
            "severity": "severe",
            "symptom": "5ddde8228b629a1a7ca825ac",
            "__v": 0
          }
    ];
    const entryPromises = entryData.map(async (data) => {
      try {
        const entry = new Entry(data);
        return await entry.save();
      } catch (e) {
        throw e;
      }
    });
    // const entries = await Promise.all(entryPromises);
    await Promise.all(entryPromises);

    
    // const userData = [
    //   {
    //     email: 'test@test.com',
    //     password: 'testing',
    //   },
    // ];
    // const userPromises = userData.map(async (data) => {
    //   try {
    //     const user = new User(data);
    //     return await user.save();
    //   } catch (e) {
    //     throw e;
    //   }
    // });
    // await Promise.all(userPromises);

    console.log('Seeding completed.');
  } catch (e) {
    console.error('Seeding failed...');
    throw e; // This `throw` will be caught in the server.js file
  }
};