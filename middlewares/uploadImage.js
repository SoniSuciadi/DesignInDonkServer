const { config } = require("dotenv");
var admin = require("firebase-admin");

const BUCKET = "designindonk-6a56a.appspot.com";
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "designindonk-6a56a",
    private_key_id: "af6de2169679d2e8638b1937246ccd1e0b18c981",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAspoWj/jkznrd\nUoFGSpXCdGDehROtpjJzp/fSrvXRS+50imfSCtOXPMA5g/sNyBcyk4FtPKaH+qJH\nA5rswZmg++W/xmflyONZsQQ4sf8B984Y/05QZKXvEx0zWIy/Yq9cf7p4r5uyVV/P\n7Xqppnu8AVKFcaxLvp1XUCHzpc87BLCBBsuz+8iKO2HXoGnNJfEv3A7bILcfsBrV\ncwAdGjPTxonwCIco6LojBuvZqbhVlxw7LVENHX6+8rJYsPjsiElLvQt64BsLn1Rx\ny0vCypj1g8vx+Utv/AoVvXZR/dGLVRMnPc3Z/nkrXUMbeufqncgQ6TTGiIdlCGKt\nSsyR7dGdAgMBAAECggEAA7qRBmsTybhVzU7pkdF4qLzKxmjfKBw6sV094Or3dmzY\njj3CuOBHwY9F4vcIVncZknt4j4Nob4zXM2DrpbWGAlpNfagFCP/EUnnSl0GZKdHA\nlbWUWjQ7DRoawGHFcMtOkbomWBaB1fIWpWCMNUMzoBWLIhTrMhixVRKyYtNsY/vF\nyrmHXONYDCAnyKGzlzaKGraM7zbMt19timUjOP3QTVtrpuT1b9NTugIZThsXuN/F\nli0y2wG6Yb26mONKvD6HPvx+3GzZPOI4MwO6WLEjrXzKz1WjJuaKnBwxbzGZWckW\nSrOUpSd50Cq26vvvkfnHInAZNcBxiiv+sDig7Ap7UQKBgQDwGZbB7ir5CT9mAdOX\nhF02sRmQqAk33gSIAVRPn1wotz/T0WCrb7IzlAG+8CrarJWFBXecrtnFGuVkNoW7\nRAENk1lemSr9GGLUJuLx8gb5RRBzRUPpQt4QmlSki5s7e0shKDVxpZCjdjZJXe0q\nrsXAS1kGcJqjxLYSE++Vg6zIuQKBgQDNdWcSM1qHreRq1ldkLvx6DIF+9CEqxjvK\nceBBXxXDJTH1nELs9ZXDJtvdPAu8ZIHrD96cEbTtZF/eEvvpeQlWiClvIGlzmHBU\nkzC/eKcEzHLh86Q6RDEVG22fIR4Cji8j7vn1LAb099Rtxf6JrMBbKozaoAROBSWP\n+Z28Fb4WBQKBgGm3WqHY9CLi539KnpfAOCq0n8UJt8VZhDU+IJlOWY2z4e6p6h6R\n96yuJnaj2Lqf8tW3KotakZgv14DgYNGrh6sqjdcRKdR2wE0ZMiPFpTxsJGocvWIf\nhxdYXJx2u8rc5p+azK1VcPIIQq7bJGn+uiOJCZHEUtJ48pHTJVJ3v8RBAoGBAJ1C\n1rDcs9eUZ3jLNTsOp9v3hIsa6+QktZFAVqlS0YJ8DuBzSdq8I3SrYrDVDBqYR8UX\ncYm+F+F46dQ+bamIJnigYi6X/X8oWBq0SyTTgeuvXePLLJIYrgT86Ixbue+0yypS\n+eoKWAzbQTMA0NKqctWVHRkeUA0z7UtlgbF8ZvHNAoGBAIgYyIEyv7hHlkVOfaPz\nbh/SDyFBNMyd2wooAQENZQeyiQb4Q2T2HeuHC0M3J0KLE/AYOB5C6YfRIaHJbTqx\n09h9t5STVa2TVfQFaR2vnJ1Mor14xGq3wIphCCEjqQG5xMaJIsuA5rTzqWmT11OH\nv+D9X15GI5J82oL145+C4J0R\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-fy2q3@designindonk-6a56a.iam.gserviceaccount.com",
    client_id: "115843843795512232220",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fy2q3%40designindonk-6a56a.iam.gserviceaccount.com",
  }),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();
const uploadImage = (req, res, next) => {
  console.log("sdasdasdasdadsd");
  if (!req.file) {
    return next();
  }
  console.log(req.file, "------------");
  const image = req.file;
  const imageName = Date.now() + "--" + image.originalname.split(" ").join("");
  const file = bucket.file(imageName);

  const stream = file.createWriteStream({
    metadata: {
      cotenType: image.mimetype,
    },
  });
  stream.on("error", (e) => {
    console.log(e);
  });
  stream.on("finish", async () => {
    await file.makePublic();
    req.file.imgUrl = `https://storage.googleapis.com/${BUCKET}/${imageName}`;
    next();
  });
  stream.end(image.buffer);
};
module.exports = uploadImage;
