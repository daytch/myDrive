import getEnvVariables from "../enviroment/get-env-variables";
getEnvVariables();
import getKey from "../key/get-key";
import servers from "./server";

const { server, serverHttps } = servers;

const serverStart = async () => {
  await getKey();

  console.log("ENV", process.env.NODE_ENV);

  const httpPort = process.env.HTTP_PORT || process.env.PORT || 7001;
  const httpsPort = process.env.HTTPS_PORT || 7001; // ubah sedikit biar beda port
  const host = process.env.URL || "0.0.0.0"; // ✅ ini penting

  if (process.env.NODE_ENV === "production" && process.env.SSL === "true") {
    // 🔒 Mode Production + SSL Aktif
    server.listen(httpPort, host, () => {
      console.log(`➡️  HTTP Server Running on http://${host}:${httpPort}`);
    });

    serverHttps.listen(httpsPort, host, () => {
      console.log(`🔐 HTTPS Server Running on https://${host}:${httpsPort}`);
    });
  } else if (process.env.NODE_ENV === "production") {
    // 🌍 Production tanpa SSL
    server.listen(httpPort, host, () => {
      console.log(`🌍 HTTP Server (No SSL) Running on http://${host}:${httpPort}`);
    });
  } else {
    // 💻 Development mode
    server.listen(httpPort, host, () => {
      console.log(`\n🚀 Development Backend Server Running on http://${host}:${httpPort}`);
    });
  }
};

serverStart();
