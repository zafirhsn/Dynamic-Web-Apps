// allowing you admin access via the server side 
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-86f0e.firebaseio.com"
});

var db = admin.database();

var ref = db.ref();

var userRef = ref.child('users');

ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

userRef.update({
    zafir: {
        birthdate: "July 27",
        fullName: "Zafir Hasan"
    },
    razin: {
        birthdate: "November 10",
        fullName: "Ahmed Razin 2slkdjflksdj"
    },
    suhbat: {
        birthdate: "aslkjdalsk",
        fullName: "aksaslkjd"
    }

});